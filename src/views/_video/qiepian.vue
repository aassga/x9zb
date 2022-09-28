<template lang="pug">
  .video_box
    el-upload.d-inline-block(
      ref="upload"
      action=""
      :auto-upload="false"
      :show-file-list="false"
      :on-change="preview"
      multiple
    )
      i.icon-cloud-upload
      span 上传视频
      //- p 将文件拖到此处，或点击加入清单
    //- span.ml-3 磁盘状态：{{ disk.upload_used_space }} / {{ disk.upload_total_space }}
    //- span.ml-2 (使用率：{{ disk.upload_usage_rate }})

    .d-flex.mt-2
      //- i.el-icon-upload2(@click="uploads")
      //- i.el-icon-video-pause.ml-2(@click="beforePause($refs.table.selection)")
      //- i.el-icon-refresh-left.ml-2(@click="resets")
      //- i.el-icon-delete.ml-2(@click="removes")

    el-table.mt-2(
      v-loading="loading"
      ref="table"
      :data="lists"
      stripe
      border
    )
      //- el-table-column(type="selection" min-width="50px")
      el-table-column(label="文件名" prop="name" min-width="50px")
      el-table-column(label="容量" min-width="50px")
        template(v-slot="{ row }") {{ row.size | size }}
      //- el-table-column(label="类别" prop="type" min-width="50px")
      el-table-column(label="操作" min-width="60px")
        template(v-slot="{ row }")
          i.el-icon-delete.ml-2(@click="remove(row)")
          //- template(v-if="row.progress !== 100 && !row.isStart")
          //-   span(v-if="row.isCalculateMD5") 切片中
          //-   i.el-icon-upload2(v-else @click="connect(row)")
          //- template(v-if="row.progress !== 100 && row.isStart")
          //-   i.el-icon-video-pause.ml-2(@click="beforePause(row)")
          //-   i.el-icon-refresh-left.ml-2(@click="reset(row)")
          //-   i.el-icon-delete.ml-2(@click="remove(row)")
      el-table-column(label="上传进度")
        template(v-slot="{ row }")
          el-progress(
            :status="row.progress >= 100 ? 'success' : undefined"
            :percentage="row.progress | progress"
            :stroke-width="24"
            text-inside
          )
</template>

<script>
import { mapState } from 'vuex'
import numeral from 'numeral'
import SparkMD5 from 'spark-md5'
import { Toast } from 'mint-ui'
export default {
  filters: {
    size (size) {
      return numeral(size).format('0.00 ib').replace('i', '')
    },
    progress (value) {
      return +numeral(value).format('0')
    }
  },
  props: {
    // service: {
    //   type: String,
    //   required: true
    // }
  },
  data () {
    return {
      loading: false,
      lists: [],
      chunk: 64 * 1024,
      pauseQueues: [],
      interval: 0,
      maxSocket: 10,
      service: 'video',
      maxfiles: 1
    }
  },
  computed: {
    // maxSocket: () => +process.env.MAX_SOCKETS,//默认同时可进行上传多少个
    ...mapState({
      user: ({ user }) => user.user_info.username,
      disk: ({ base }) => base.disk
    })

  },
  created () {
    // this.service固定写video
    this.$store.dispatch('disk')
  },
  methods: {
    preview ({ raw }) {
      const { name, size } = raw
      const type = name.split('.').pop()
      if (this.lists.find((list) => list.name === name)) return this.$message.error(`${name} 档名重复`)
      console.log(raw)
      this.lists.push({ name, size, type, file: raw })
    },
    async connect ({ name }) {
      try {
        let list = this.lists.find((list) => list.name === name)
        if (list.isCalculateMD5) return
        if (list.hasStarted) return this.beforeUpload(list)

        const listIndex = this.lists.findIndex((list) => list.name === name)
        const { size, type } = list
        const fileTotalCount = Math.ceil(size / this.chunk)

        list = Object.assign({}, list, {
          chunks: fileTotalCount,
          hasStarted: false,
          isStart: false,
          isCalculateMD5: true,
          hasMerged: false, // 是否选中
          isClose: false,
          progress: 0
        })
        this.lists.splice(listIndex, 1, list)

        const socketChunks = this.getSocketChunks(size, fileTotalCount)
        const fileId = await this.getFileId(list, fileTotalCount)
        const sockets = []
        let fileIndex = 1

        socketChunks.forEach((chunk, index) => {
          const data = {
            taskId: index + 1,
            fileId,
            fileName: name,
            fileType: type,
            fileSize: size,
            fileIndex,
            fileCount: fileIndex + chunk - 1,
            fileTotalCount
          }
          const ws = new WebSocket(this.disk.upload_url)
          console.log(ws)
          sockets.push({ ws, data, isPause: false, isFinish: false, interval: 0 })
          fileIndex += chunk
        })

        list.sockets = sockets
        list.isCalculateMD5 = false

        await Promise.all(
          list.sockets.map(async (socket) => {
            await this.socketInit(list, socket)
          })
        )
        if (!(await this.checkDuplicate(list, fileId))) this.beforeUpload(list)
      } catch {}
    },
    getSocketChunks (size, fileTotalCount) {
      const sockets = size > this.chunk * this.maxSocket ? this.maxSocket : fileTotalCount
      const rows = sockets < this.maxSocket ? 1 : Math.floor(fileTotalCount / sockets)
      const remainder = fileTotalCount % sockets
      const socketChunks = []

      ;[...Array(sockets).keys()].forEach((index) => {
        const chunks = index + 1 <= remainder ? rows + 1 : rows
        socketChunks.push(chunks)
      })
      return socketChunks
    },
    getFileId (list, chunks) {
      const { file } = list
      return new Promise((resolve, reject) => {
        const spark = new SparkMD5.ArrayBuffer()
        const reader = new FileReader()
        let index = 0
        const loadNext = () => {
          const chunk = 2 * Math.pow(1024, 2)
          const start = index * chunk
          const end = start + chunk >= file.size ? file.size : start + chunk
          reader.readAsArrayBuffer(file.slice(start, end))
        }
        reader.onload = ({ target }) => {
          spark.append(target.result)
          index += 1
          if (!list.isCalculateMD5) return reject(new Error('Removed'))
          if (index < chunks) {
            const newProgress = list.progress + 20 / chunks
            list.progress = newProgress > 20 ? 20 : newProgress
            loadNext()
          } else {
            list.progress = 20
            resolve(spark.end())
          }
        }
        reader.onerror = () => reject(new Error('File reader error'))
        loadNext()
      })
    },
    socketInit (list, socket) {
      const { ws } = socket
      console.log('==================进入init')
      return new Promise((resolve, reject) => {
        const req = {
          service: this.service,
          action: 'init',
          data: {
            user: this.user,
            code: this.disk.upload_key
          }
        }

        ws.onopen = () => {
          this.send(ws, JSON.stringify(req))
        }
        ws.addEventListener('message', ({ data }) => {
          data = JSON.parse(data)
          if (data.status === 200) return resolve()

          this.close(list)
          this.$message.error(data.message)
          reject(new Error(data.message))
        })
        ws.addEventListener('close', async () => {
          if (list.progress === 100 || list.isClose) return
          await new Promise((resolve) => setTimeout(resolve, 3000))
          socket.ws = new WebSocket(this.disk.upload_url)
          await this.socketInit(list, socket)
          if (!list.isStart) return

          await this.getStatus(socket)
          this.uploadEach(list, socket)
          this.uploadResume(list, socket)
        })
      })
    },
    send (ws, data = '') {
      if (ws.readyState !== ws.OPEN) return
      ws.send(data)
    },
    close (list) {
      if (!list.sockets) return
      list.isClose = true
      list.sockets.forEach((socket) => {
        socket.ws.close()
        clearInterval(socket.interval)
      })
    },
    checkDuplicate (list, fileId) {
      return new Promise((resolve, reject) => {
        const { ws } = list.sockets[0]
        const req = {
          service: this.service,
          action: 'check',
          data: { fileId }
        }

        this.send(ws, JSON.stringify(req))
        ws.onmessage = ({ data }) => {
          data = JSON.parse(data).data
          if (data.fileResult) {
            list.progress = 100
            this.close(list)
            this.$emit('setUrl', data.fileResult)
          }
          resolve(list.progress === 100)
        }
      })
    },
    beforeUpload (list) {
      if (list.isStart) return
      list.isStart = true
      list.hasStarted = true
      list.isClose = false

      const { sockets } = list
      sockets.forEach(async (socket) => {
        const { data, isPause } = socket
        if (isPause) {
          socket.ws = new WebSocket(this.disk.upload_url)
          await this.socketInit(list, socket)
          await this.getStatus(socket)
        }

        this.send(socket.ws, JSON.stringify({ data, service: this.service, action: 'start' }))
        socket.isPause = false
      })
      this.upload(list)
    },
    getStatus (socket) {
      const { ws, data } = socket
      const { taskId, fileId } = data
      return new Promise((resolve) => {
        const event = ({ data }) => {
          ws.removeEventListener('message', event)
          data = JSON.parse(data)
          if (data.action !== 'status') return

          socket.data = data.data.uploadTask
          resolve()
        }
        this.send(ws, JSON.stringify({ service: this.service, action: 'status', data: { taskId, fileId } }))
        ws.addEventListener('message', event)
      })
    },
    async upload (list) {
      try {
        const { sockets } = list
        await Promise.all(sockets.map((socket) => this.uploadEach(list, socket)))
        if (this.pauseQueues.length && !list.hasMerged) this.pauses()
      } catch {
        this.loading = false
      }
    },
    uploadEach (list, socket) {
      const { ws } = socket
      return new Promise((resolve, reject) => {
        ws.onmessage = ({ data }) => {
          const res = JSON.parse(data)
          const whiteLists = ['start', 'binary']
          data = res.data
          if (!whiteLists.includes(res.action) || !data) {
            this.loading = false
            return
          }

          const { isFinish, uploadTask } = data
          const { fileIndex, fileTotalCount } = uploadTask
          if (isFinish) {
            socket.isFinish = true
            socket.interval = setInterval(() => {
              this.send(ws, JSON.stringify({ service: this.service, action: 'status' }))
            }, 10000)
            this.finishUpload(list)
            resolve()
          } else if (socket.isPause) {
            socket.data = data.uploadTask
            resolve()
          } else {
            const start = this.chunk * (fileIndex - 1)
            const end = fileIndex === fileTotalCount ? list.size : this.chunk * fileIndex
            const reader = new FileReader()
            reader.readAsArrayBuffer(list.file.slice(start, end))
            reader.onload = (e) => {
              if (ws.readyState !== ws.OPEN) return reject(new Error('Disconnect'))
              this.send(ws, e.target.result)
            }
            this.updateProgress(res.action, list)
          }
        }
      })
    },
    uploadResume (list, socket) {
      const { ws } = socket
      const { fileIndex, fileTotalCount } = socket.data

      const start = this.chunk * (fileIndex - 1)
      const end = fileIndex === fileTotalCount ? list.size : this.chunk * fileIndex
      const reader = new FileReader()
      reader.readAsArrayBuffer(list.file.slice(start, end))
      reader.onload = (e) => this.send(ws, e.target.result)
    },
    async finishUpload (list) {
      const { sockets } = list
      const total = sockets.filter((socket) => socket.isFinish).length
      if (total !== sockets.length) return

      list.hasMerged = true
      const socket = sockets.find(({ data }) => data.taskId === total)
      const { ws } = socket
      const start = new Date().getTime()
      clearInterval(socket.interval)
      this.interval = setInterval(() => {
        if (new Date().getTime() - start > 180000) clearInterval(socket.interval)
        this.send(ws, JSON.stringify({ service: this.service, action: 'status' }))
      }, 10000)

      await new Promise((resolve, reject) => {
        this.send(ws, JSON.stringify({ service: this.service, action: 'merge' }))
        ws.onmessage = ({ data }) => {
          this.loading = false
          data = JSON.parse(data)
          if (data.action !== 'merge' || data.status !== 200) {
            return
            clearInterval(socket.interval)
            resolve()
          } else {
            this.$emit('setUrl', data.data.fileResult)
          }
        }
      })
      list.progress = 100

      this.close(list)
      // this.$store.dispatch(`${this.service}/disk`)
      // this.$store.dispatch('disk')
    },
    updateProgress (action, list) {
      if (action !== 'binary') return
      const { chunks, progress } = list
      const newProgress = progress + 80 / chunks
      list.progress = newProgress > 99 ? 99 : newProgress
    },
    beforePause (lists) {
      const pauseQueues = [].concat(lists).filter((list) => list.isStart)
      if (!pauseQueues.length) return

      this.loading = true
      this.pauseQueues = []
      pauseQueues.forEach((list) => {
        list.sockets.forEach((socket) => {
          socket.isPause = true
        })
      })
      this.pauseQueues = pauseQueues
    },
    async pause (list) {
      await Promise.all(
        list.sockets.map(({ ws, data }) => {
          return new Promise((resolve) => {
            this.send(ws, JSON.stringify({ service: this.service, action: 'stop' }))
            ws.onmessage = () => resolve()
          })
        })
      )
      this.close(list)
      list.isStart = false
      this.loading = false
    },
    async reset (list) {
      await Promise.all(
        list.sockets.map(({ ws, data }) => {
          return new Promise((resolve) => {
            this.send(ws, JSON.stringify({ data, service: this.service, action: 'reset' }))
            ws.onmessage = () => resolve()
          })
        })
      )
      list.hasStarted = false
      this.close(list)
      this.connect(list)
    },
    remove (list) {
      const { name, sockets, hasStarted } = list
      list.isCalculateMD5 = false
      this.lists = this.lists.filter((list) => list.name !== name)
      if (hasStarted) this.send(sockets[0].ws, JSON.stringify({ service: this.service, action: 'delete' }))
      this.close(list)
    },
    uploads () {
      // this.$refs.table.selection.forEach((list) => {
      //   if (!list.hasMerged && list.progress !== 100) this.connect(list)
      // })
      if (this.lists.length == 0) {
        return Toast({
          message: '请选择上传的影片'
        })
      }
      this.lists.forEach((list) => {
        if (!list.hasMerged && list.progress !== 100) this.connect(list)
      })
    },
    pauses () {
      this.pauseQueues.forEach((list) => {
        if (!list.hasMerged && list.hasStarted) this.pause(list)
      })
      this.pauseQueues = []
    },
    resets () {
      this.$refs.table.selection.forEach((list) => {
        if (!list.hasMerged && list.hasStarted) this.reset(list)
      })
    },
    removes () {
      this.$refs.table.selection.forEach((list) => {
        this.remove(list)
      })
    },
    async beforeRouteLeave () {
      const lists = this.lists.filter((list) => list.hasStarted && list.progress !== 100)
      if (!lists.length) return

      await this.$confirm('确定离开 ?')
      clearInterval(this.interval)
      lists.forEach((list) => {
        this.remove(list)
      })
    }
  },
  watch: {
    lists (newVal, oldVal) {
      console.log(newVal)
      this.$emit('CheckList', newVal)
    }
  }
}
</script>

<style lang="scss" scoped>
.video_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
}
::v-deep {
  .el-upload-dragger {
    border-color: var(--dark);
  }
}

[class*=' el-icon-'],
[class^='el-icon-'] {
  color: var(--danger);
  cursor: pointer;
  font-size: 2em;
}
.d-inline-block {

    span {
      display: inline-block;
      line-height: 40px;
      vertical-align: middle;
      color: #6c757d;
    }
}
.icon-cloud-upload {
  display: inline-block;
  border-radius: 50%;
  background: #f46fe0;
  width: 40px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  margin: 10px;
  font-size: 25px;
  vertical-align: middle;

}
</style>
