<template>
    <div>
        <el-select v-model="defaultLang" @change="changeLang()">
            <el-option
            v-for="item in langArr"
            :key="item.key"
            :label="item.key"
            :value="item.key"
            >
            </el-option>
        </el-select>
        <i class="icon-group"></i>
    </div>

</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'ChangeLang',
  data () {
    return {
      langArr:
            [
              {
                key: 'cn'
              },
              {
                key: 'tc'
              },
              {
                key: 'en'
              }
            ],
      defaultLang: localStorage.getItem('locale') || 'en'
    }
  },
  mounted () {

  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo

    }),

    ...mapGetters([
      'nickName'
    ])
  },
  methods: {
    changeLang () {
      localStorage.setItem('locale', this.defaultLang)
      this.$i18n.locale = this.defaultLang
    }

  }

}
</script>
