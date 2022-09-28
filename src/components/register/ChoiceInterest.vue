<template>
  <div id="choice-interest">
    <Header @back="$emit('change-current-step', 'CreateAccount')" :isvisible="false"/>
    <div class="header">
      <div class="title">{{$t('lang.choose_details')}}</div>
      <div class="content">{{$t('lang.choose_things')}}:</div>
    </div>
    <div class="interest-list">
      <div
        class="interest"
        v-for="item in interestList"
        :key="item.id"
        @click="selectInterest(item)"
      >
        <button :class="selectdInterest.includes(item.id) ? 'name active' : 'name'">{{ item.interest_name }}</button>
      </div>
    </div>
    <div class="next">
      <button @click="submitInterest">{{$t('lang.next')}}</button>
    </div>
  </div>
</template>

<script>
import Header from '@/components/register/Header.vue'
import userApi from '@/api/user.js'
import interest from '@/api/interest.js'

export default {
  name: 'ChoiceInterest',
  components: {
    Header
  },
  data () {
    return {
      interestList: [
        {
          id: 1,
          interset_name: '娛樂'
        },
        {
          id: 2,
          interset_name: '日常生活'
        },
        {
          id: 3,
          interset_name: '喜劇'
        },
        {
          id: 4,
          interset_name: '動物'
        },
        {
          id: 5,
          interset_name: '學習'
        }
      ],
      selectdInterest: [],
      interestData: {
        currentPage: 1,
        isPage: 'false',
        limit: 20,
        condition: ''
      }
      // interestList: []
    }
  },
  created () {
    this.getIntersetList()
  },
  methods: {
    selectInterest (item) {
      if (this.selectdInterest.includes(item.id)) {
        this.selectdInterest.splice(this.selectdInterest.indexOf(item.id), 1)
      } else {
        this.selectdInterest.push(item.id)
        this.searchText = item.interest_name
      }
    },
    submitInterest () {
      const postData = {
        interest_id: this.selectdInterest.join(','),
        isUpdate: 'false' // 是否更新标签
      }
      userApi.optionInterest(postData).then(res => {
        if (res.status == 200) {
          this.$emit('change-current-step', 'ChoiceModels')
          this.$emit('get-interest-model', res.data)
        }
      })
    },
    getIntersetList () {
      //   获取兴趣列表
      interest.getInterestList(this.interestData).then(res => {
        if (res.status == 200) {
          this.interestList = res.data.list
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$main-width: calc(81% + 30px);
$input-width: calc(81% + 30px);
#choice-interest {
  // width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  .header {
    height: 11rem;
    padding-top: 3rem;
    .title {
      height: 100px;
      font-size: 28px;
      line-height: 42px;
      color: #343a40;
      text-align: left;
    }
    .content {
      font-size: 18px;
      line-height: 21px;
      color: #6c757d;
      text-align: left;
    }
  }
  .interest-list {
    // padding-left: 1rem;
    // padding-right: 1rem;
    display: inline-flex;
    flex-flow: row wrap;
    max-height: calc(100% - 20rem);
    overflow: auto;
    // padding-bottom: 1rem;
    .interest {
      margin: 0 10px 12px 0;
      button.name {
        color: #6c757d;
        border-radius: 19px;
        // padding: .8rem;
        padding: 9px 16px;
        border: solid 1px #b0b6ba;
        color: #b0b6ba;
        background-color: #fff;
        font-size: 16px;
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
  .next {
    text-align: right;
    padding-top: 3rem;

    button {
      width: 50%;
      height: 36px;
      font-size: 18px;
      border: 0;
      background-image: radial-gradient(
        circle at 50% 50%,
        #f46fe0,
        #f8a9ec 97%
      );
      color: #fff;
      border-radius: 0.3rem;
    }
  }
}
</style>
