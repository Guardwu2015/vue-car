<template>
  <div id="navShow">
      <svg width="50" height="50">
          <polyline class="bar" points="15,19 35,19" />
          <polyline class="bar" points="15,25 35,25" />
          <polyline class="bar" points="15,31 35,31" />
      </svg>
  </div>
</template>

<script>
export default {
  name: 'navShow'
}
</script>

<style lang="scss" scoped>
#navShow {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: #9a614c;
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
  display: none;
  transform: scale(0);
  transition: transform 0.5s ease-in-out;

  svg {
    pointer-events: none;
  }

  .bar {
    fill: none;
    stroke-width: 2px;
    stroke: #fff;
  }
}

@media (max-aspect-ratio: 12/10), (max-height: 666px) {
  #navShow {
    display: block;
    touch-action: none;
    &.hidden {
      display: none;
    }
  }
}
</style>
