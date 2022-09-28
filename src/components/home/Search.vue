<template>
  <div>
    <div id="home-search" @click.stop="cancle(false)">
      <div class="search__header">
        <div class="search__title">
          <input
            v-model.trim="searchText"
            :placeholder="$t('lang.search_hot_label')"
            @focus="searchFocus=true"
            @blur="searchdFocus=false"
            @input="searchInput"
          />
          <span @click="searchFocus=false;searchText='';">
            <a :class="showClean">
              <i></i>
            </a>
          </span>
          <div class="search__cancel" @click="$emit('search-cancel')">{{$t('lang.cancel')}}</div>
        </div>
        <div v-if="!searchText && !searchFocus" :class="isExpand1?'search__content':'search__content showAll'">
          <div class="interest-list">
            <div
              class="interest"
              v-for="(item,i) in interestList"
              :key="i"
              @click="selectInterest(item)"
            >
              <button
                :class="selectdInterest ===  item.id? 'name active' : 'name'"
              >{{ item.interest_name }}</button>
            </div>
          </div>
          <div class="interest-list__show-all" @click="isExpand1=!isExpand1">{{isExpand1?$t('lang.view_all'):$t('lang.close')}}</div>
        </div>
        <div v-else>
          <div class="search__detail">
            <div class="search__detail-header">
              <div
                :class="['search__detail-header-tab',currentTabId==item.id?'active':'']"
                v-for="item in tabList"
                :key="item.id"
                @click="currentTabId = item.id"
              >{{item.name}}</div>
            </div>
            <div class="search__detail-content">
              <!-- 暂不开放隐藏 -->
              <!-- <div
                class="no_open"
                v-if="((currentTabId==1||currentTabId==2)&&accountSearchList.length==0)||((currentTabId==1||currentTabId==3)&&labelSearchList.length==0)"
              >暂不开放</div>-->
              <div class="search__detail-content__account">
                <div class="account-list">
                  <div
                    class="account"
                    v-for="item in accountSearchList"
                    :key="item.uid"
                    v-show="currentTabId==1||currentTabId==2"
                    @click="goUserinfoPage(item)"
                  >
                    <!-- <img class="avatar" :src="item.userImg" /> -->
                    <el-image class="avatar" fit="cover" :src="item.userImg">
                      <div slot="error">
                        <img class="avatar" :src="item.avatar" alt srcset />
                      </div>
                    </el-image>
                    <!-- <img class="avatar" :src="`${require(`@/assets/register/usert.ba24.png`)}`" /> -->
                    <div class="user">
                      <div class="name">{{item.username}}</div>
                      <div class="id">{{item.uid}}</div>
                    </div>
                  </div>
                  <div
                    class="account-id-count"
                    v-for="(item,i) in labelSearchList"
                    :key="i"
                    v-show="currentTabId==1||currentTabId==3"
                  >
                    <img class="avatar" />
                    <div class="user">
                      <div class="name">{{item.tag_name}}</div>
                      <div class="id">{{item.id}}</div>
                    </div>
                  </div>
                </div>
                <div
                  class="account-list__show-all"
                  @click="toggleExpand"
                  v-if="currentTabId==3&&labelSearchList.length>5"
                >{{isExpand2?$t('lang.view_all'):$t('lang.close')}}</div>
                <div
                  class="account-list__show-all"
                  @click="toggleExpand"
                  v-if="currentTabId==2&&accountSearchList.length>5"
                >{{isExpand2?$t('lang.view_all'):$t('lang.close')}}</div>
                <div
                  class="account-list__show-all"
                  @click="toggleExpand"
                  v-if="currentTabId==1&&(accountSearchList.length>5||labelSearchList.length>5)"
                >{{isExpand2?$t('lang.view_all'):$t('lang.close')}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="home-search-modal" @click="cancle(true)"></div>
  </div>
</template>

<script>
import interest from '@/api/interest.js'
import userApi from '@/api/user.js'
import { mapState } from 'vuex'
export default {
  name: 'search',
  data () {
    return {
      searchText: '',
      interestList: [
        {
          id: 1,
          interest_name: '娛樂'
        },
        {
          id: 2,
          interest_name: '日常生活'
        },
        {
          id: 3,
          interest_name: '喜劇'
        },
        {
          id: 4,
          interest_name: '動物'
        },
        {
          id: 5,
          interest_name: '學習'
        },
        {
          id: 1,
          interest_name: '娛樂'
        },
        {
          id: 2,
          interest_name: '日常生活'
        },
        {
          id: 3,
          interest_name: '喜劇'
        },
        {
          id: 4,
          interest_name: '動物'
        },
        {
          id: 5,
          interest_name: '學習'
        },
        {
          id: 1,
          interest_name: '娛樂'
        },
        {
          id: 2,
          interest_name: '日常生活'
        },
        {
          id: 3,
          interest_name: '喜劇'
        },
        {
          id: 4,
          interest_name: '動物'
        },
        {
          id: 5,
          interest_name: '學習'
        },
        {
          id: 1,
          interest_name: '娛樂'
        },
        {
          id: 2,
          interest_name: '日常生活'
        },
        {
          id: 3,
          interest_name: '喜劇'
        },
        {
          id: 4,
          interest_name: '動物'
        },
        {
          id: 5,
          interest_name: '學習'
        }
      ],
      selectdInterest: null,
      searchFocus: false,
      tabList: [
        { name: this.$t('lang.most_relevant'), id: 1 },
        { name: this.$t('lang.account'), id: 2 },
        { name: this.$t('lang.popular_tags'), id: 3 },
        { name: this.$t('lang.nearby'), id: 4 }
      ],
      currentTabId: 1,
      interestData: {
        currentPage: 1,
        isPage: 'false',
        limit: 20,
        condition: ''
      },
      searchList: [],
      allSearchList: [],
      accountSearchList: [],
      labelSearchList: [],
      labelSearchListTemp: [], // 临时存储
      accountSearchListTemp: [], // 临时存储
      isExpand1: true,
      isExpand2: true
    }
  },
  computed: {
    ...mapState({
      userInfo: ({ user }) => user.user_info
    }),
    showClean () {
      return this.searchText || this.searchText === 0 ? 'clean' : ''
    }
  },
  watch: {
    currentTabId (newVal, oldVal) {
      if (this.searchText.trim().length >= 2) this.searchInput()
    }
  },
  methods: {
    selectInterest (id) {
      // if (this.selectdInterest.includes(id)) {
      //   this.selectdInterest.splice(this.selectdInterest.indexOf(id), 1);
      // } else {
      //   this.selectdInterest.push(id);
      // }
      this.selectdInterest = id
    },
    cancle (isCancle) {
      if (isCancle) {
        this.$emit('search-cancel')
      }
    },
    getIntersetList () {
      //   获取兴趣列表
      userApi.interestList(this.interestData).then(res => {
        if (res.status == 200) {
          this.interestList = res.data.list
        }
      })
    },
    searchInput () {
      //   console.log(this.searchText);
      if (!this.searchText) {
        this.accountSearchList = []
      } else {
        const search = this.searchText.trim()
        if (search.length >= 2) {
          // if (this.currentTabId === 1 || this.currentTabId === 2) {
          userApi
            .homeSearchType({ search: this.searchText.trim() })
            .then(res => {
              if (res.status == 200) {
                console.log(res.data.city, res.data.userList.list)

                this.allSearchList = [
                  ...res.data.userList.list,
                  // ...res.data.city,
                  ...res.data.history_search,
                  ...res.data.tagList
                ]
                console.log(this.allSearchList, '--this.allSearchList')
                this.labelSearchListTemp = res.data.tagList.list
                this.accountSearchListTemp = res.data.userList.list
                this.labelSearchList = res.data.tagList.splice(0, 5)
                this.accountSearchList = res.data.userList.list.splice(0, 5)
              }
            })
          // } else if (this.currentTabId === 3) {
          //   // 標籤搜尋
          //   userApi
          //     .homeSearchTag({ search: this.searchText.trim() })
          //     .then(res => {
          //
          //     })
          // }
        }
      }
    },
    // 展开收起
    toggleExpand () {
      if (this.isExpand2) {
        if (this.currentTabId == 1 || this.currentTabId == 3) {
          this.labelSearchList = this.labelSearchListTemp
        }
        if (this.currentTabId == 1 || this.currentTabId == 2) {
          this.accountSearchList = this.accountSearchListTemp
        }
      } else {
        if (this.currentTabId == 1 || this.currentTabId == 3) {
          this.labelSearchList = this.labelSearchListTemp.splice(0, 5)
        }
        if (this.currentTabId == 1 || this.currentTabId == 2) {
          this.accountSearchList = this.accountSearchListTemp.splice(0, 5)
        }
      }
      this.isExpand2 = !this.isExpand2
    },
    // 跳转到用户信息页面
    goUserinfoPage (item) {
      if (this.userInfo.uid == item.uid) {
        this.$router.push({ path: '/my' })
      } else {
        this.$router.push(`/userinfo/${item.uid}`)
      }
    }
  },
  mounted () {
    this.getIntersetList()
  }
}
</script>

<style lang="scss" scoped>
@mixin icon-label {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: 17px;
  padding-right: 1px;
  &:before {
    display: inline-block;
    height: 44px;
    width: 44px;
    // margin-top: 0.25rem;
  }
}
#home-search {
  width: 100vw;
  top: 0px;
  left: 0px;
  position: fixed;
  // background-color: #f1f0ef;
  z-index: 2040;
  border-radius: 0px 0px 8px 8px;
  .search__header {
    // background-color: #f5f4f4;
    z-index: 3;
    input {
      position: relative;
      display: flex;
      height: 36px;
      width: 73vw;
      background: url("~@/assets/home/ic-search@3x.png") no-repeat no-repeat;
      background-size: 30px 30px;
      background-position: left 5px top 5px;
      background-color: #f1f0ef;
      color: rgba(60, 60, 67, 0.6);
      border: 1px solid #cccccc;
      border-radius: 10px;
      margin: 5px;
      padding-left: 40px;
      &::placeholder {
        color: rgba(60, 60, 67, 0.6);
        font-size: 12px;
      }
    }
    div.search__title {
      display: flex;
      font-size: 17px;
      width: 100%;
      background-color: #f1f0ef;
      border-bottom: 1px solid rgba(60, 60, 67, 0.36);
      span {
        a.clean {
          position: absolute;
          // height: 1rem;
          margin-left: -32px;
          text-align: center;
          width: 1rem;
          i {
            position: static;
            display: inline-block;
            margin-top: 1.1rem;
            // margin-right: .8rem;
            width: 15px;
            height: 15px;
            background: url("~@/assets/home/ic-cross.svg") no-repeat 0 center;
            background-size: 15px auto;
          }
        }
      }
    }
    // ::-webkit-input-placeholder{
    //   font-size: 10px;
    // }
    div.search__cancel {
      align-self: center;
      margin-left: auto;
      // margin-right: calc(((100vw - 71vw)/2) - (34px/2));
      margin-right: calc(((100vw - 71vw) / 2) - 42px);
      color: #f46fe0;
      // width: 34px;
    }
  }
  .search__content {
    padding: 10px;
    padding-top: 15px;
    padding-bottom: 1px;
    background-color: #ffffff;
    box-shadow: 0px 12px 12px 0px rgba(0, 0, 0, 0.16);
    border-radius: 0px 0px 8px 8px;
    .interest-list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      height: 130px;
      overflow-y: auto;
      .interest {
        padding-bottom: 1rem;
        button.name {
          color: #6c757d;
          border-radius: 19px;
          padding: 6px 8px;
          border: solid 1px #b0b6ba;
          color: #b0b6ba;
          background-color: #fff;
          font-size: 15px;
          &.active {
            border: solid 1px #f46fe0;
            background-image: radial-gradient(
              circle at 50% 50%,
              #f46fe0,
              #f8a9ec 97%
            );
            color: #fff;
          }
        }
      }
    }
    .interest-list__show-all {
      line-height: 57px;
      font-size: 14px;
      color: #82b1fd;
      margin-left: auto;
      margin-right: 21px;
      text-decoration: underline;
    }
    &.showAll {
      .interest-list {
        height: auto;
      }
    }
  }
  .search__detail {
    padding-top: 8px;
    background-color: #ffffff;
    box-shadow: 0px 12px 12px 0px rgba(102, 87, 87, 0.16);
    border-radius: 0px 0px 8px 8px;
    .search__detail-header {
      height: 36px;
      font-size: 13px;
      color: #6c757d;
      display: flex;
      border-bottom: 1px solid rgba(60, 60, 67, 0.36);
      .search__detail-header-tab {
        line-height: 24px;
        width: 33.3333vw;
        &.active {
          color: #f46fe0;
          border-bottom: 2px solid #f46fe0;
        }
      }
    }
    .search__detail-content {
      .search__detail-content__account {
        padding-bottom: 1rem;
        display: flex;
        flex-flow: row wrap;
        .account-list {
          .account,
          .account-id-count {
            display: flex;
            padding-left: 20px;
            padding-top: 1rem;
            .avatar {
              height: 48px;
              width: 48px;
              border-radius: 50%;
              background-color: #f46fe0;
              // border: solid 2.5px #f46fe0;
            }
            .user {
              padding-left: 10px;
              padding-top: 8px;
              text-align: start;
              .name {
                font-size: 14px;
                line-height: 14px;
                color: #23272b;
              }
              .id {
                font-size: 12px;
                line-height: 22px;
                color: #6c757d;
              }
            }
          }
          .account-id-count {
            img {
              background: url("~@/assets/home/ic-hashtag.png") no-repeat
                no-repeat;
              background-position: center center;
              background-size: 23px 22px;
            }
          }
        }
        .account-list__show-all {
          line-height: 57px;
          font-size: 14px;
          color: #82b1fd;
          margin-left: auto;
          margin-right: 21px;
          text-decoration: underline;
          margin-top: auto;
          margin-bottom: -15px;
        }
      }
      .no_open {
        padding: 20px 0;
      }
    }
  }
}
#home-search-modal {
  width: 100vw;
  height: 100vh;
  top: 3.2rem;
  left: 0px;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
}
</style>
