<template>
  <div id="select-country">
    <div>
      <div id="showCoutry"></div>
      <div v-for="(item, index) in showCountry" class="letter-item" :key="index">
        <div :id="item.letter" class="change-city__city-title">{{item.letter}}</div>
        <div
          v-for="(i, idx) in item.countrylist"
          :key="idx"
          class="change-city__city-all"
          @click="selectCountry(i)"
        >{{i.name}}</div>
      </div>
    </div>
    <aside class="letter-aside">
      <ul>
        <li
          :id="`type__${item.letter}`"
          v-for="(item, index) in showCountry"
          :key="index"
          @click="naver(item.letter)"
        >{{item.letter}}</li>
      </ul>
    </aside>
    <div id="tip">{{tipString}}</div>
  </div>
</template>

<script>
import pinyin from '@/utils/web-pinyin/bundle.js'
import { mapState } from 'vuex'
import { log } from 'util'

export default {
  props: {
    isshow: Boolean
  },
  data () {
    return {
      tipString: '',
      nowCityType: ''
    }
  },
  computed: {
    ...mapState({
      countryList: state => state.base.countryList
    }),
    letter () {
      const letter = []
      for (let i = 0; i < 26; i++) {
        const obj = {}
        obj.letter = String.fromCharCode(65 + i)
        obj.countrylist = []
        letter.push(obj)
      }
      return letter
    },
    countryNames () {
      const arr = []
      if (this.isshow) {
        for (let i = 0; i < this.countryList.length; i++) {
          const item = this.countryList[i]
          arr.push({ name: item.name, id: item.id })
        }
      }
      return arr
    },
    showCountry () {
      let showCountry = this.letter
      for (let i = 0; i < this.countryNames.length; i++) {
        const _index = Number(
          this.getFirstLetter(this.countryNames[i].name).charCodeAt() - 65
        )
        if (_index >= 0 && _index < 26) {
          showCountry[_index].countrylist.push(this.countryNames[i])
        }
      }
      // 如果letter中countrylist中没有值的话，过滤这一项
      showCountry = showCountry.filter(function (value) {
        const len = value.countrylist.length
        return len > 0
      })
      return showCountry
    }
  },
  watch: {
    countrySearch (newCountrySearch) {
      this.countryFilter(newCountrySearch)
    }
  },
  mounted () {
    // window.scrollTo(0, 500);
    // this.$nextTick(() => {
    //   let tip = document.getElementById("tip");
    //   tip.style.display = "none";
    //   this.setCityTypeColor();
    // });
    console.log(this.showCountry, 'change-search-rang 加载了')
  },
  methods: {
    getFirstLetter (str) {
      //  得到城市第一个字的首字母
      return pinyin
        .pinyin(str)[0][0]
        .charAt(0)
        .toUpperCase()
    },
    naver (id) {
      // 点击右边字母滚动
      this.tipString = id
      const obj = document.getElementById(id)
      const tip = document.getElementById('tip')
      tip.style.display = ''
      setTimeout(() => {
        tip.style.display = 'none'
      }, 1500)
      tip.setAttribute('class', 'tipAppear')
      setTimeout(function () {
        tip.removeAttribute('class')
      }, 500)

      let oPos = obj.offsetTop - parseInt(window.innerHeight / 3.2)
      if (window.innerHeight > 800) {
        oPos += 20
      }
      if (window.innerHeight > 1000) {
        oPos -= 140
      }
      return (document.getElementById('select-country').scrollTop = oPos)
    },
    countryFilter (city) {
      // 城市搜索筛选
      let showCountryListTemp
      this.buildItem(countryNamesFilter)
      showCountry = showCountryTemp
      showCountry = showCountry.filter(function (value) {
        showCountryList = value.countrylist
        showCountryListTemp = showCountryList.filter(function (val) {
          return val.indexOf(city) > -1
        })
        value.countrylist = showCountryListTemp
        return value.countrylist.length > 0
      })
      this.showCountry = showCountry
      if (showCountry.length === 0) {
        const _showCityContent = document.getElementById('showCoutry')
        //   _showCityContent.innerText = '查询不到结果'
        _showCityContent.setAttribute('class', 'tipShow')
      } else {
        //   document.getElementById('showCityContent').innerText = ''
      }
    },
    selectCountry (country) {
      this.$emit('select-country', country)
    },
    setCityTypeColor (city) {
      const self = this
      const currentCityType = document.getElementById(
        `type__${self.nowCityType}`
      )
      currentCityType && (currentCityType.style.color = '#f46fe0')
      const selectCountry = document.getElementById('select-country')
      // scroll替换颜色
      selectCountry.addEventListener('scroll', e => {
        // const base = parseInt(selectCountry.scrollHeight / (self.allCity.length + showCity.length)); // 基数
        const base = parseInt(
          selectCountry.scrollHeight / this.countryList.length
        ) // 基数
        const scrollCity = this.countryList[
          parseInt(selectCountry.scrollTop / base)
        ] // 所在城市
        // 替换颜色
        const oldCity = document.getElementById(`type__${self.nowCityType}`)
        oldCity && (oldCity.style.color = '#aaa')

        self.nowCityType = self.getFirstLetter(scrollCity)
        const newCountry = document.getElementById(`type__${self.nowCityType}`)
        newCountry && (newCountry.style.color = '#f46fe0')
      })
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#city {
  position: relative;
}

.letter-item {
  > div:first-child {
    font-size: 16px;
    line-height: 2em;
    background: #f5f4f4;
    margin-bottom: 2px;
  }
  > div {
    //   padding-right: 10%;
    //   padding-left: 10%;
    border-bottom: 1px solid rgba(60, 60, 67, 0.1);
  }
}

.letter-aside {
  position: fixed;
  right: 6px;
  top: 100px;
  ul {
    list-style: none;
    line-height: 1.4em;
    font-size: 14px;
    color: #aaa;
  }
}

#tip {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 1px solid #f46fe0;
  color: #f46fe0;
  width: 100px;
  height: 100px;
  z-index: 10;
  text-align: center;
  line-height: 100px;
  font-size: 50px;
  opacity: 0;
}

.tipAppear {
  animation: appearTip 1 linear 0.5s;
}

@keyframes appearTip {
  0% {
    opacity: 1;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}

.search-city {
  text-align: center;
  padding: 5px 0;
  input {
    line-height: 24px;
    border-radius: 5px;
    outline: none;
  }
}

.tipShow {
  text-align: center;
  line-height: 60px;
  font-size: 16px;
  color: #bbbbbb;
}
</style>
<style lang="scss" scoped>
#select-country {
  color: #6c757d;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  height: 320px;
  overflow-y: auto;
  border-radius: 0px 0px 8px 8px;
  .letter-item {
    color: #6c757d;
    display: flex;
    flex-direction: column;
    // font-size: 18px;
    .change-city__city-title {
      height: 36px;
      line-height: 36px;
      background-color: #f5f4f4;
      text-align: left;
      padding-left: 1rem;
      font-size: 16px;
    }
    .change-city__city-all {
      height: 36px;
      line-height: 36px;
      background-color: #ffffff;
      font-size: 18px;
      &:nth-last-child(1) {
        border-radius: 0px 0px 8px 8px;
      }
    }
  }
}
</style>
