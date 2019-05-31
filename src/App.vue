<template>
<div id="app">
    <dynamic-content />
    <gl-canvas />
    <css-canvas />
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
import glCanvas from 'components/glCanvas'
import cssCanvas from 'components/cssCanvas'

import initApp from 'threes/initApp'

export default {
  name: 'app',
  components: {
    preloader,
    mNav,
    navShow,
    dynamicContent,
    disclaimer,
    backBtn,
    glCanvas,
    cssCanvas
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
