<template>
  <div id="choice-models">
    <Header @back="$emit('change-current-step', 'ChoiceInterest')" :isvisible="true"/>
    <div class="header">
      <div class="title">{{$t('lang.choose_model')}}</div>
      <div class="content">{{$t('lang.follow_model')}}:</div>
    </div>
    <div class="models-list">
      <div class="model" v-for="item in models" :key="item.uid" @click="selectModel(item.uid)">
        <div :class="selectdModels.includes(item.uid) ? 'avatar active' : 'avatar'">
          <img :src="item.avatar" v-if="item.avatar"/>
          <img src="@/assets/my/userpic@3x.png" v-else/>
          <div class="love"></div>
        </div>
        <div class="name">{{ item.nick }}</div>
      </div>
    </div>
    <div class="next">
      <button @click="complete">{{$t('lang.complete')}}</button>
    </div>
  </div>
</template>

<script>
import Header from '@/components/register/Header.vue'
import userApi from '@/api/user.js'

export default {
  name: 'ChoiceModels',
  components: {
    Header
  },
  props: {
    interestModelList: Array,
    require: true
  },
  data () {
    return {
      models: [
        {
          id: 1,
          avatar: require('@/assets/register/usert.ba24.png'),
          name: '＠belleouo'
        },
        {
          id: 2,
          avatar: require('@/assets/register/usert.ba24.png'),
          name: '＠belleouo'
        },
        {
          id: 3,
          avatar: require('@/assets/register/usert.ba24.png'),
          name: '＠belleouo'
        },
        {
          id: 4,
          avatar: require('@/assets/register/usert.ba24.png'),
          name: '＠belleouo'
        },
        {
          id: 5,
          avatar: require('@/assets/register/usert.ba24.png'),
          name: '＠belleouo'
        }
      ],
      selectdModels: []
    }
  },
  mounted () {
    this.models = this.interestModelList
  },
  methods: {
    selectModel (id) {
      if (this.selectdModels.includes(id)) {
        this.selectdModels.splice(this.selectdModels.indexOf(id), 1)
      } else {
        this.selectdModels.push(id)
      }
    },
    complete () {
      this.selectdModels.map(item => {
        userApi.attentionInset({ target_uid: item }).then(res => {
          if (res.status == 200) {
            this.$router.push('home')
            // this.$message({
            //   type: "success",
            //   message: "关注成功~"
            // });
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$main-width: calc(81% + 30px);
$input-width: calc(81% + 30px);
#choice-models {
  // width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  .header {
    height: 11rem;
    padding-top: 3rem;
    .title {
      height: 100px;
      font-size: 26px;
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
  .models-list {
    padding-left: 1rem;
    padding-right: 1rem;
    display: inline-flex;
    flex-flow: row wrap;
    max-height: calc(100% - 20rem);
    overflow: auto;
    .model {
      flex: 0 0 50%;
      padding-bottom: 1.6rem;
      .avatar {
        img {
          height: 79px;
          width: 79px;
          border-radius: 50%;
        }
        &.active {
          img {
            background-color: #ccc;
            border: solid 2.5px #f46fe0;
          }
          .love {
            position: relative;
            width: 27px;
            height: 23px;
            // height: 1.3rem;
            // width: 1.5rem;
            background: url("~@/assets/register/ic-like@3x.png") no-repeat 0
              center;
            background-size: 1.5rem 1.3rem;
            margin-top: -2rem;
            margin-bottom: 0.7rem;
            margin-left: 65%;
            z-index: 2;
          }
        }
      }
      .name {
        color: #6c757d;
        font-size: 14px;
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
