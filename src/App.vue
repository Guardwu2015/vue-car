<template>
<div id="app">
    <dynamic-content />

    <div id="GLCanvas"></div>
    <div id="CSSCanvas"></div>
    <m-nav />
    <disclaimer />
    <back-btn />
    <preloader />
<nav-show />
</div>
</template>

<script>
import preloader from 'components/preloader'
import mNav from 'components/mNav'
import navShow from 'components/navShow'
import dynamicContent from 'components/dynamicContent'
import disclaimer from 'components/disclaimer'
import backBtn from 'components/backBtn'

import initApp from 'threes/initApp'

export default {
  name: 'app',
  components: {
    preloader,
    mNav,
    navShow,
    dynamicContent,
    disclaimer,
    backBtn
  },
  mounted () {
    initApp()
  }
}
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
  }
</style>
