// 影片和图片上传以及websoket domain
export function getDomain (type) {
  switch (type) {
    case 'imgupload':
      return 'wss://apupload.kongljie0.info'
    case 'vedioUpload':
      return 'wss://apupload.dalaiodad.info'
    default :
      return 'http://yoloshow.com:9010/ys'
  }
}
// 是否是h5
export const isH5 = true
