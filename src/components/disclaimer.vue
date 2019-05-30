<template>
  <div id="disclaimer">Production FF 91 specifications may differ</div>
</template>

<script>
export default {
  name: 'disclaimer'
}
</script>

<style lang="scss" scoped>
  #disclaimer {
    position: absolute;
    bottom: 0px;
    width: 100%;
    font-size: 12px;
    text-align: center;
    pointer-events: none;
    display: none;
    opacity: 0;
    transition: opacity 1s ease-in-out, color 1s ease-in-out;
    z-index: 0;
    &.enabled {
      display: block;
      opacity: 1;
    }
    &.inverted {
      color: #cccccc;
    }
  }
</style>
