<template>
    <div class="text_area content">
        <!-- {{destList.x}}-{{destList.y}} -->

        <div class="textarea"
        id="talkInput"
        contenteditable="true"
        ref="talkInputbox"
        @blur="inputHandler($event)"
        @input="inputHandler($event)"
        @keydown="setHotDome($event)">
        </div>
        <ul class="hotTag" v-show="destList.isShow" :style="{left: destList.x +'px' , top:destList.y +'px'}">
            <li @click="setHotTag('test1')">test1</li>
            <li @click="setHotTag('test2')">test2</li>
            <li @click="setHotTag('test3')">test3</li>
            <li @click="setHotTag('test4')">test4</li>
        </ul>
    </div>
</template>
<script>

export default {
  name: 'ContentBox',
  data () {
    return {
      destList: {
        x: 0,
        y: 0,
        isShow: false
      },
      selection: null,
      range: null,
      postContent: null,
      startPosition: 0,
      isHot: false
    }
  },
  computed: {

  },
  methods: {
    // 监听输入内容
    inputHandler (e) {
      var selection = document.getSelection()
      this.selection = selection
      this.range = selection.getRangeAt(0)
      const end = selection.getRangeAt(0).endOffset
      this.focusNode = selection.focusNode
      this.textContent = selection.focusNode.textContent
      this.setTalkContent(e.target.innerHTML, e.target.textContent)
      if (selection.isCollapsed && selection.anchorNode.nodeType == 3) {
        // 非选区状态 && 文本节点

        // 当前区域，光标之前内容
        var str = selection.anchorNode.nodeValue.slice(0, selection.anchorOffset)
        // 最后一个@的位置
        var lastDestIdx = str.lastIndexOf('#')
        // 获取最后一个@之后的字符串为查询字符串
        if (lastDestIdx == -1) {
          // 未查询到@符号

          this.isHot = false
          // return this.destList.isShow = false ;//直接隐藏
        } else {
          if ((end - lastDestIdx) <= 10) {
            var lastDestQuery = str.slice(lastDestIdx + 1)
            this.destList.x = this.getSelectionCoords().x
            this.destList.y = this.getSelectionCoords().y

            // console.log(str, lastDestIdx, lastDestQuery, e)

            this.startPosition = lastDestIdx
            console.log(lastDestIdx)
            this.isHot = true
            // return this.destList.isShow = true;//显示
          } else {
            this.isHot = false
            // return this.destList.isShow = false;//直接隐藏
          }
        }
      } else {
        // 选区状态
        // return this.destList.isShow = false;//直接隐藏
      }
    },
    // 获取光标位置
    getSelectionCoords (win) {
		    win = win || window
		    var doc = win.document
		    var sel = doc.selection; var range; var rects; var rect
		    var x = 0; var y = 0
		    if (sel) {
		        if (sel.type != 'Control') {
		            range = sel.createRange()
		            range.collapse(true)
		            x = range.boundingLeft
		            y = range.boundingTop + 20
		        }
		    } else if (win.getSelection) {
		        sel = win.getSelection()
		        if (sel.rangeCount) {
		            range = sel.getRangeAt(0).cloneRange()
		            if (range.getClientRects) {
		                range.collapse(true)
		                rects = range.getClientRects()
		                if (rects.length > 0) {
		                    rect = rects[0]
		                }
		                // 光标在行首时，rect为undefined
		                if (rect) {
		                    x = rect.left
		                    y = rect.top + 20
		                }
		            }
		            // Fall back to inserting a temporary element
		            if ((x == 0 && y == 0) || rect === undefined) {
		                var span = doc.createElement('span')
		                if (span.getClientRects) {
		                    // Ensure span has dimensions and position by
		                    // adding a zero-width space character
		                    span.appendChild(doc.createTextNode('\u200b'))
		                    range.insertNode(span)
		                    rect = span.getClientRects()[0]
		                    x = rect.left
		                    y = rect.top + 20

		                    var spanParent = span.parentNode
		                    spanParent.removeChild(span)
		                    // Glue any broken text nodes back together
		                    spanParent.normalize()
		                }
		            }
		        }
		    }
		    return { x: x, y: y }
    },
    // 点击联想新增话题
    setHotTag (value) {
      const hotInputBox = document.getElementById('talkInput')
      const start = this.startPosition
      const end = this.range.endOffset
      // if((end - start) < 10){
      // 删除原有的文章部分
      this.$refs.talkInputbox.focus()
      const boxvalue = this.textContent
      const deleteValue = boxvalue.substr(start, end)
      this.range.setStart(this.focusNode, start)
      this.range.setEnd(this.focusNode, end)
      this.range.deleteContents(boxvalue)
      // 新增新的部分
      var space = document.createElement('span')
      space.setAttribute('class', 'tag')
      // 如果是已经有的标签则需要把节点上绑定各项参数
      space.innerHTML = `#${value}`
      this.range.insertNode(space)
      this.range.createContextualFragment('')// 新增一个空白的text
      this.range.collapse(false)
      this.selection.removeAllRanges()
      this.selection.addRange(this.range)
      this.destList.isShow = false
    },
    // 删除#号后选中的部分
    deleteConten () {
      const hotInputBox = document.getElementById('talkInput')
      const start = this.startPosition
      const end = this.range.endOffset
      let boxvalue = this.selection.focusNode.textContent
      const deleteValue = boxvalue.substr(start, end)
      console.log(deleteValue)
      if ((end - start) < 10) {
        // 删除原有的文章部分
        boxvalue = boxvalue.replace(deleteValue, '')
        this.$refs.talkInputbox.focus()
        const childList = hotInputBox.childNodes
        this.range.setStart(this.selection.focusNode, start)
        this.range.setEnd(this.selection.focusNode, end)
        this.range.deleteContents(boxvalue)
      }
    },
    // 插入话题
    async setHotDome (e) {
      const isHot = this.isHot

      if (e.keyCode === 13) {
        if (isHot) {
          const start = this.startPosition
          const end = this.range.endOffset
          const boxvalue = this.selection.focusNode.textContent
          const deleteValue = boxvalue.substr(start, end - start)
          this.deleteConten() // 删除选中部分

          // 新增新的部分
          // 创建标签
          var space = document.createElement('span')
          space.setAttribute('class', 'tag')
          space.innerHTML = `${deleteValue}`

          this.range.insertNode(space)// 插入内容
          this.range.createContextualFragment('')// 新增一个空白的text
          this.range.collapse(false)// 光标移动到最后
          this.selection.removeAllRanges()// 一处所有range
          this.selection.addRange(this.range)// 新增range
          this.destList.isShow = false// 关闭联想部分
          const params = {
            tagName: deleteValue.split('#')[1],
            status: 1
          }
          console.log(params)
          this.setTagAttr(params)
        } else {

        }
        e.preventDefault()
        return false
      }
    },
    setTagAttr (params) {
      this.$store.dispatch('setHotTag', params).then((res) => {
        console.log(res)
        const { status, data } = res
        if (status == 200) {
          const tagList = document.getElementsByClassName('tag')
          console.log(tagList)
          for (const ele of tagList) {
            console.log(ele)
            console.log(ele.getAttribute('data-id'))
            if (!ele.getAttribute('data-id')) {
              ele.setAttribute('data-id', data.id)
              const hotInputBox = document.getElementById('talkInput')
              this.setTalkContent(hotInputBox.innerHTML, hotInputBox.textContent)
            }
          }
        }
      })
    },
    // 设置内容
    setTalkContent (htmlContent, textContent) {
      this.$emit('changeContent', htmlContent, textContent)
    }

  }
}
</script>
<style lang="scss" >
.text_area.content {
    width: 100%;
    margin: 0 auto;
    .textarea {
        width: 100%;
        height: 80px;
        line-height: 20px;
        display: block;
        background-color: #ffffff;
        padding:10px;
        border-radius: 2.1333333333333vw;
        border: solid 1px #cccccc;
        box-sizing: border-box;
        outline-color: #f46fe0;
        margin-bottom: 0 auto 25px;
        text-align: left;
        overflow-y: auto;
    }
    .hotTag {
        position: fixed;
        border: 1px solid rgb(255, 0, 0);
    }
    .tag {
        color: #00f;
        user-modify: read-only;
        -moz-user-modify: read-only;
        -webkit-user-modify: read-only;
        user-select: all;
        -moz-user-select: all;
        -webkit-user-select: all;
    }

}

</style>
