<template>
    <transition :name="position" >
        <div class="popup_context" >

        </div>
    </transition>

</template>

<script>
export default {
  name: 'commonPopup',
  props: {
    position: {
      type: String,
      default: 'bottom'
    }
  },
  data () {
    return {

    }
  },

  mounted () {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.top-enter{

}
.top-enter-active{

}
.top-enter-to{

}
.top-leave-active{

}
.popup_context{

}
</style>
