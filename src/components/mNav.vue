<template>
  <nav id="navBox">
      <div id="navInner">
          <div class="title">FF 91</div>
          <ol class="navList">
              <li class="navItem">Dimensions</li>
              <li class="navItem">Battery</li>
              <li class="navItem">Powertrain</li>
              <li class="navItem">4-Wheel Steering</li>
              <li class="navItem">Front Lighting</li>
              <li class="navItem">Rear Lighting</li>
              <li class="navItem">Aerodynamics</li>
              <li class="navItem">Free Viewing</li>
          </ol>
          <span class="bigBut" id="reserveBut" style="display: none">Reserve</span>
          <br/>
          <span class="bigBut" id="subscribeBut" style="display: none">Subscribe</span>
          <div id="socialBox" style="display: none">
              <svg class="social" id="Twitter" viewBox="0 0 112 112">
                  <path d="M47,76c18,0,28-15,28-28h0l5-5-6,2a10,10,0,0,0,4-5l-6,2a10,10,0,0,0-17,7v2A28,28,0,0,1,35,38a10,10,0,0,0,3,13H34a10,10,0,0,0,8,10H37a10,10,0,0,0,9,7,20,20,0,0,1-12,4H32a28,28,0,0,0,15,4"
                  />
              </svg>
              <svg class="social" id="Facebook" viewBox="0 0 112 112">
                  <path d="M77,32H35a3,3,0,0,0-3,3V77a3,3,0,0,0,3,3H58V61H51V54h6V49c0-6,4-10,9-10h6v6H69c-3,0-4,1-4,4v5h7v7H65V80H77a3,3,0,0,0,3-3h0V35A3,3,0,0,0,77,32Z"
                  />
              </svg>
              <svg class="social" id="LinkedIn" viewBox="0 0 112 112">
                  <path d="M76,32H36a4,4,0,0,0-4,3V77a4,4,0,0,0,4,3H76a4,4,0,0,0,4-3V35A4,4,0,0,0,76,32ZM46,73H39V50h7ZM43,47a4,4,0,1,1,4-4A4,4,0,0,1,43,47ZM73,73H66V62c0-3,0-6-4-6s-4,3-4,6V73H51V50h7v3h0a7,7,0,0,1,6-4c7,0,9,5,9,11Z"
                  />
              </svg>
          </div>
      </div>
  </nav>
</template>

<script>
export default {
  name: 'mNav'
}
</script>

<style lang="scss" scoped>
  nav {
    pointer-events: none;
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    font-size: 14px;
    z-index: 1;
  }
  #navBox {
    #navInner {
      position: absolute;
      right: 20px;
      top: 50%;
      margin-top: -333px;
      text-align: right;
      display: none;
      opacity: 0;
      transition: opacity 1s ease-in-out, color 0.3s ease-in-out;
      touch-action: none;
      .title {
        font-size: 5em;
        font-weight: 300;
        text-align: right;
        margin: 0 -15px 15px 0;
        line-height: 1em;
      }
      &.inverted {
        color: #cccccc;
        .social {
          fill: #cccccc;
        }
      }

      .navList {
        margin: 0;
        padding: 0;
        list-style-type: none;
        counter-reset: elementcounter;
        font-weight: 400;
      }
      .navItem {
        pointer-events: auto;
        text-align: right;
        padding-bottom: 30px;
        cursor: pointer;
        transform-origin: 100% 50%;
        touch-action: none;
        &::after {
          content: "0"counter(elementcounter);
          counter-increment: elementcounter;
          font-size: 0.7em;
          width: 50px;
          border-bottom: 2px solid #808080;
          display: inline-block;
          margin-left: 10px;
          transition: all 0.3s ease;
        }
        &.active {
          color: #9a614c;
          &::after {
            width: 70px;
            padding-right: 10px;
          }
        }
        &:hover {
          &::after {
            width: 60px;
          }
        }
      }
      .bigBut {
        color: #fff;
        background: #9a614c;
        font-weight: 700;
        text-align: center;
        text-transform: uppercase;
        display: inline-block;
        padding: 12px 0;
        margin: 0px auto 12px;
        width: 175px;
        border: 1px solid #9a614c;
        cursor: pointer;
        pointer-events: auto;
        transition: all 0.5s ease-in-out;
        &:hover {
          background: transparent;
          color: #9a614c;
        }
        &::after {
          font-size: 1.3em;
          line-height: 0.5em;
          content: " \2192";
        }
      }
      .social {
        width: 56px;
        height: 56px;
        fill: #333333;
        position: relative;
        cursor: pointer;
        pointer-events: auto;
        transition: 0.3s fill ease-in-out;
        &:hover {
          fill: #9a614c;
        }
      }
    }
  }
  @media (max-aspect-ratio: 12/10), (max-height: 666px) {
    nav {
      background-color: rgba(232, 230, 227, 0.9);
      position: absolute;
      transform: translateY(-100%);
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      pointer-events: auto;
      touch-action: manipulation;

      &.inverted {
        background-color: rgba(33, 41, 52, 0.8);
      }
      &.visible {
        transform: translateY(0%);
      }

      #navInner {
        top: 0px;
        margin-top: 0;
      }
    }
  }
</style>
