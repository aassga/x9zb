<template>
    <article style="border:1px solid white;width:400px;height:400px;margin:0 auto;background-color:white;">

        <section class="experiment" style="width:320px; height:240px;border:1px solid green; margin:50px auto;">
            <div id="videos-container" style="width:320px; height:240px;">
                <!-- <video src=""
                 width="320"
                 height="240"
                 muted="false"
                 controls="false"
                 x5-video-player-type="h5-page"
                playsinline="true"
                v-show="vedioShow"
                id="shipin"
                ></video> -->

            </div>
        </section>
        <section class="experiment" style="text-align:center;border:none; margin-top:20px;">
            <button id="openCamera" @click="openCamera">打开摄像头</button>
            <button id="openCamera" @click="connect(lists[0])" v-show="files">上传</button>
            <div v-for="row,index in lists" :key="index">
                <div>
                    <div v-if="row.progress !== 100 && !row.isStart">
                        <span v-if="row.isCalculateMD5">切片中</span>
                        <i class="el-icon-upload2" v-else @click="connect(row)"></i>
                    </div>
                    <div v-if="row.progress !== 100 && row.isStart">
                        <i class="el-icon-video-pause" @click="beforePause(row)"></i>
                        <i class="el-icon-refresh-left" @click="reset(row)"></i>
                        <i class="el-icon-delete" @click="remove(row)"></i>
                    </div>
                    <el-progress
                    :status="row.progress >= 100 ? 'success' : undefined"
                    :percentage="row.progress | progress"
                    :stroke-width="24"
                    text-inside
                    ></el-progress>
                </div>
            </div>

        </section>

        <video :src="vediourl"
         controls id="video"
         style="width:320px; height:240px;"
        x5-video-player-type="h5-page"
        playsinline="true"
        v-show="vedioShow"
        ></video>

 </article>
</template>
<script>
// import { saveAs } from '@/utils/fileSaver.js'
import { MessageBox, Message } from 'element-ui'
import { mapState } from 'vuex'
import numeral from 'numeral'
import SparkMD5 from 'spark-md5'

export default {
  name: 'VideoAuto',
  data () {
    return {
      MediaUtils: null,
      videosContainer: null,
      mediaRecorder: null,
      mediaStream: null,
      recorderFile: null,
      stopRecordCallback: null,
      vediourl: null,
      vedioShow: false,
      lists: [], // 上传列表
      files: null, // 录像的文件
      chunk: 64 * 1024,
      pauseQueues: [],
      interval: 0,
      maxSocket: 10,
      service: 'video'

    }
  },
  created () {
    this.$store.dispatch('disk')
  },
  computed: {
    // maxSocket: () => +process.env.MAX_SOCKETS,//默认同时可进行上传多少个
    ...mapState({
      user: ({ username }) => username.user_info.username,
      disk: ({ base }) => base.disk
    })
  },
  methods: {

    openCamera () {
      // 这里可以处理其他两个按钮的状态
      var len = this.videosContainer.childNodes.length
      for (var i = 0; i < len; i++) {
        this.videosContainer.removeChild(this.videosContainer.childNodes[i])
      }
      var video = document.createElement('video')
      // var video = document.getElementById('shipin')
      console.log(video)

      var videoWidth = 320
      var videoHeight = 240

      video.controls = false
      video.muted = false
      video.width = videoWidth
      video.height = videoHeight
      video.setAttribute('video.x5-video-player-type', 'h5-page')
      video.setAttribute('playsinline', 'true')
      // video.x5-video-player-type = 'h5-page';
      // video.playsinline = true'

      var _this = this
      console.log(this)
      this.MediaUtils.getUserMedia(true, true, function (err, stream) {
        if (err) {
          Message({
            message: 'open error',
            type: 'error',
            duration: 5 * 1000,
            showClose: true
          })
          throw err
        } else {
          // 通过 _this.mediaRecorder 记录获取到的媒体流
          console.log(_this.mediaRecorder)
          const _mediaRecorder = new MediaRecorder(stream)
          _this.mediaRecorder = _mediaRecorder
          _this.mediaStream = stream
          var chunks = []; var startTime = 0

          video.srcObject = stream
          video.play()

          _this.videosContainer.appendChild(video)
          _this.mediaRecorder.blobs = []
          _this.mediaRecorder.ondataavailable = function (e) {
            console.log('ondata: ' + e)
            _this.mediaRecorder.blobs.push(e.data)
            chunks.push(e.data)
          }

          _this.mediaRecorder.onstop = function (e) {
            console.log('onstop: ' + e)
            _this.recorderFile = new Blob(chunks, { type: _this.mediaRecorder.mimeType })
            chunks = []
            if (_this.stopRecordCallback != null) {
              _this.stopRecordCallback()
            }
          }
          _this.startRecord(_mediaRecorder)
        }
      })
    },
    stopRecord (callback) {
      // 终止录制器
      this.mediaRecorder.stop()
      // 关闭媒体流
      this.MediaUtils.closeStream(this.mediaStream)
      // this.vedioShow = false
      this.stopRecordCallback = callback
    },
    startRecord (_mediaRecorder) {
      console.log(_mediaRecorder)
      _mediaRecorder.start()
      const _this = this
      setTimeout(function () {
        // 结束
        _this.stopRecord(function () {
          console.log('录制成功!')
          this.previewVide()
          // 处理按钮
          // send();
        })
      }, 5000)
    },
    previewVide () {
      var file = new File([this.recorderFile], 'msr-' + (new Date()).toISOString().replace(/:|\./g, '-') + '.mp4', {
        type: 'video/mp4'
      })
      this.files = file
      const { name, size } = file
      const { type } = name.split('.').pop()
      const url = URL.createObjectURL(file)
      this.vediourl = url
      // 如果是多个文件处理须交验文件名是否一样
      this.lists.push({ name, size, type, file })
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
          hasMerged: false,
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
          const ws = new WebSocket(`${this.disk.upload_url[0]}/upload`)
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
          socket.ws = new WebSocket(`${this.disk.upload_url[0]}/upload`)
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
          socket.ws = new WebSocket(`${this.disk.upload_url[0]}/upload`)
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
          if (data.action !== 'merge' || data.status !== 200) return
          clearInterval(socket.interval)
          resolve()
        }
      })
      list.progress = 100
      this.close(list)
      // this.$store.dispatch(`${this.service}/disk`)
      this.$store.dispatch('disk')
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
      this.$refs.table.selection.forEach((list) => {
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
  mounted () {
    this.MediaUtils = {
      /**
            * 获取用户媒体设备(处理兼容的问题)
            * @param videoEnable {boolean} - 是否启用摄像头
            * @param audioEnable {boolean} - 是否启用麦克风
            * @param callback {Function} - 处理回调
            */
      getUserMedia: function (videoEnable, audioEnable, callback) {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
                navigator.msGetUserMedia || window.getUserMedia
        console.log(navigator)

        var constraints = { video: videoEnable, audio: audioEnable }

        // Message({
        //         message: JSON.stringify(navigator.mediaDevices),
        //         type: 'error',
        //         duration: 5 * 1000,
        //         showClose: true
        //         })
        // alert(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          alert('第一个函数')
          navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            callback(false, stream)
          }).catch(function (err) {
            callback(err)
          })
        } else if (navigator.getUserMedia) {
          alert('兼容部分')
          navigator.getUserMedia(constraints, function (stream) {
            callback(false, stream)
          }, function (err) {
            callback(err)
          })
        } else {
          alert('no userMedio')
          callback(new Error('Not support userMedia'))
        }
      },

      /**
            * 关闭媒体流
            * @param stream {MediaStream} - 需要关闭的流
            */
      closeStream: function (stream) {
        if (typeof stream.stop === 'function') {
          stream.stop()
        } else {
          const trackList = [stream.getAudioTracks(), stream.getVideoTracks()]

          for (let i = 0; i < trackList.length; i++) {
            const tracks = trackList[i]
            if (tracks && tracks.length > 0) {
              for (let j = 0; j < tracks.length; j++) {
                const track = tracks[j]
                if (typeof track.stop === 'function') {
                  track.stop()
                }
              }
            }
          }
        }
      }
    }
    this.videosContainer = document.getElementById('videos-container')
  }
}
</script>
<style scoped>
html,body,#app {
    height: auto;
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

.el-upload-dragger .el-icon-upload {
  color: var(--dark);
  font-size: 5em;
}
</style>
