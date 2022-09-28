const state = {
  likeList: [], // 已点赞的贴文的列表
  imgData: [],
  tidListLike: [],
  imgfiles: [],
  taskId: [],
  uploadedInfo: [],
  postInfo: {
    help: {
      reward: 1234, // 发帖版规奖励说明
      original: 2234 // 什么是原创
    },
    opt: { // 依序為：1=发视频、2=发图片、3=发楼凤信息、4=发讨论话题、5=发杏博话题
      1: [
        {
          key: '发视频1', // 版塊名稱
          val: '111', // 板塊fid
          typeid: [
            {
              key: '主题B', // 主題名稱
              val: '2210' // 主題typeid
            },
            {
              key: '主题A',
              val: '3210'
            }
          ]
        },
        {
          key: '发视频3',
          val: '333',
          typeid: [
            {
              key: '主题E',
              val: '9999'
            }
          ]
        },
        {
          key: '发视频2',
          val: '222',
          typeid: [
            {
              key: '主题C',
              val: '1152'
            },
            {
              key: '主题D',
              val: '2252'
            }
          ]
        }
      ],
      2: [
        {
          key: '发图片1',
          val: '555',
          typeid: [
            {
              key: '主题Q',
              val: '8888'
            }
          ]
        }
      ],
      3: [
        {
          key: '发楼凤信息1',
          val: '999',
          typeid: [
            {
              key: '主题X',
              val: '2222'
            }
          ]
        }
      ],
      4: [
        {
          key: '发讨论话题1',
          val: '888',
          typeid: [
            {
              key: '主题G',
              val: '7777'
            }
          ]
        }
      ],
      5: [
        {
          key: '发杏博话题1',
          val: '777',
          typeid: [
            {
              key: '主题Z',
              val: '3333'
            }
          ]
        }
      ]
    }
  },
  postRequestData: {
    title: '',
    content: '',
    option1: '选择版块',
    option2: '选择主题',
    photo: []
  },
  showImgs: [],
  loadings: [false],
  imgFailIndex: [],
  get_comment_details: [], // 获取具体某个帖子的详情
  homeVideoList: [] // 获取首页videoList
}
export default state
