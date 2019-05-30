<template>
  <div id="backBtn" class="inverted" style="display: none">Back to FF.com</div>
</template>

<script>
export default {
  name: 'backBtn'
}
</script>

<style lang="scss" scoped>
  #backBtn {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;
    color: #000;
    font-size: 0.5em;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.5s ease-in-out;
    &::before {
      content: "\2190   ";
    }
    &.inverted {
      color: #cccccc;
    }
  }
</style>
