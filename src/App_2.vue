<template>

  <div id="wrapper" :class="wrapperClass">

    <menu-toggle-btn></menu-toggle-btn>

    <Menu></Menu>

    <ContentOverlay></ContentOverlay>

    <router-view></router-view>

  </div>

</template>

<script>
// @ is an alias to /src
import MenuToggleBtn from '@/components/MenuToggleBtn.vue'
import Menu from '@/components/Menu.vue'
import ContentOverlay from '@/components/ContentOverlay.vue'

export default {

  components: {
    MenuToggleBtn,
    Menu,
    ContentOverlay
  },

  created () {
    window.bus.$on('menu/toggle', function () {
      window.setTimeout(function () {
        this.isOpenMobileMenu = !this.isOpenMobileMenu
      }, 200)
    })

    window.bus.$on('menu/closeMobileMenu', function () {
      // 고정영역 == true, 고정영역 아님  == false
      this.isOpenMobileMenu = false
    })
  },

  data () {
    return {
      // 고정영역
      isOpenMobileMenu: false
    }
  },

  computed: {
    wrapperClass () {
      return {
        'toggled': this.isOpenMobileMenu === true
      }
    }
  }
}

</script>

<style lang="scss">
  @import 'style/layout';
  @import 'style/menu-toggle-btn';
  @import 'style/menu';
  @import 'style/content-overlay';
  @import 'style/media-queries';
  @import 'style/admin';
</style>
