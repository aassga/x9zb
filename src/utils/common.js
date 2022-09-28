export default {
  // 数字计算的方法，如果传入一个数字，如果超过1000，则会变为K
  convertNumber (number) {
    let num = number
    if (num >= 1000) {
      num = (num / 1000).toFixed(1) + 'K'
    }
    return num
  },
  // 时间格式化切割的方法 传入date对象   第二个参数根据传过来的 - 或者 / 等字符串 返回对应如2020-1-2,或者2020/1/2的字符串,默认为/，第三个参数为是否补0,默认为补
  dateFormat (date, splitType = '/', addZero = true) {
    const nDate = date
    console.log(nDate)
    let y = nDate.getFullYear().toString()
    let m = nDate.getMonth() + 1
    let d = nDate.getDate()
    // 是否补零
    if (addZero) {
      y = y < 10 ? '0' + y : y
      m = m < 10 ? '0' + m : m
      d = d < 10 ? '0' + d : d
    }
    // 分隔符类型
    const dateStr = y + splitType + m + splitType + d
    return dateStr
  },
  // 获取这个月到下个月的今天的,第一个参数是date对象，目标时间戳。第二个参数是一共返回多少个月的，返回的数值是数组
  getNextMonthToday (date, num = 1) {
    // 时间格式化切割的方法 传入date对象   第二个参数根据传过来的 - 或者 / 等字符串 返回对应如2020-1-2,或者2020/1/2的字符串,默认为/，第三个参数为是否补0,默认为补
    function dateFormat (date, splitType = '/', addZero = true) {
      const nDate = date
      console.log(nDate)
      let y = nDate.getFullYear().toString()
      let m = nDate.getMonth() + 1
      let d = nDate.getDate()
      // 是否补零
      if (addZero) {
        y = y < 10 ? '0' + y : y
        m = m < 10 ? '0' + m : m
        d = d < 10 ? '0' + d : d
      }
      // 分隔符类型
      const dateStr = y + splitType + m + splitType + d
      return dateStr
    }

    function getNextMonth (date) {
      var arr = date.split('/')
      var year = arr[0] // 获取当前日期的年份
      var month = arr[1] // 获取当前日期的月份
      var day = arr[2] // 获取当前日期的日
      var month2 = parseInt(month) + 1
      var year2 = year
      if (month2 == 13) {
        year2 = parseInt(year) + 1
        month2 = 1
      }
      var day2 = day
      var days2 = new Date(year, month2, 0)
      days2 = days2.getDate()
      if (day2 > days2) {
        day2 = days2
      }
      // if (month2 < 10) {
      //     month2 = '0' + month2;
      // }
      var t2 =
        year +
        '/' +
        month +
        '/' +
        day +
        '~' +
        year2 +
        '/' +
        month2 +
        '/' +
        day2
      return t2
    }

    const time = date.getTime()
    const oneDayTime = 1000 * 60 * 60 * 24
    // let dateStr = dateFormat(date,'/',false);
    const arr = []

    for (let index = 0; index < num; index++) {
      const newDate = new Date(time + oneDayTime * index)
      const dateStr = dateFormat(newDate, '/', false)
      const dateItem = getNextMonth(dateStr)
      arr.push(dateItem)
      // new Date(time += oneDayTime);
    }

    console.log(arr)

    return arr
  },
  getNextMonth (date) {
    var arr = date.split('/')
    var year = arr[0] // 获取当前日期的年份
    var month = arr[1] // 获取当前日期的月份
    var day = arr[2] // 获取当前日期的日
    var month2 = parseInt(month) + 1
    var year2 = year
    if (month2 == 13) {
      year2 = parseInt(year) + 1
      month2 = 1
    }
    var day2 = day
    var days2 = new Date(year, month2, 0)
    days2 = days2.getDate()
    if (day2 > days2) {
      day2 = days2
    }
    // if (month2 < 10) {
    //     month2 = '0' + month2;
    // }
    var t2 =
      year + '/' + month + '/' + day + '~' + year2 + '/' + month2 + '/' + day2
    return t2
  },
  // 图片转blob
  imageChangeBlob (file) {
    var baseData
    var blob = null
    // file-->base64
    var reader = new FileReader()
    reader.readAsDataURL(file)
    // console.log('111111111')
    reader.onload = function () {
      baseData = reader.result
      //  console.log(baseData)
      // base64-->blob
      var byteString
      if (baseData.split(',')[0].indexOf('base64') >= 0) { byteString = atob(baseData.split(',')[1]) }// base64 解码
      else {
        byteString = unescape(baseData.split(',')[1])
      }
      var mimeString = baseData.split(',')[0].split(':')[1].split(';')[0]// mime类型 -- image/png
      var ia = new Uint8Array(byteString.length)// 创建视图
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      blob = new Blob([ia], { type: 'image/png' })
      blob.lastModifiedDate = new Date()
      //  var wj = new FormData();
      //  wj.append("file",blob,blob.name)
      //  console.log(wj)
      console.log(blob)
      return blob
    }
    // console.log(blob)
    // return blob;
  }
}
