<template>
<div id="preloader">
    <div id="preHeader">FF 91 3D Tour</div>
    <div id="preBar">
        <div id="preProg"></div>
    </div>
    <div id="preDetail">Loading assets</div>
    <div id="preLogo"></div>
    <a href="https://www.ff.com/us/ff-91">
        <div id="preButton">
            <div id="preButText">GO TO FF 91 GALLERY</div>
        </div>
    </a>
</div>
</template>

<script>
export default {
  name: 'preloader'
}
</script>

<style lang="scss" scoped>
#preloader {
  width: 200px;
  bottom: 25%;
  left: 50%;
  opacity: 0;
  color: #fff;
  height: auto;
  position: fixed;
  padding: 12px;
  margin-bottom: -50px;
  margin-left: -100px;
  transform: translateY(10px);
  pointer-events: none;
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  text-align: center;

  #preHeader {
    font-size: 26px;
  }
  #preBar {
    width: 100px;
    height: 3px;
    border: 1px solid #9a614c;
    margin: 5px auto;
  }
  #preProg {
    background: #fff;
    height: 100%;
    width: 0%;
  }
  #preDetail {
    font-size: 14px;
    font-weight: 400;
    padding-top: 5px;
    text-transform: uppercase;
    color: #9a614c;
  }
  #preButton {
    background: #9a614c;
    width: 220px;
    height: 40px;
    margin-top: 15px;
    position: relative;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    display: none;
    &:hover {
      background: #ffffff;
      color: #9a614c;
    }
  }

  a {
    color: #fff;
  }

  #preButText {
    position: absolute;
    top: 12px;
    width: 220px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
  }

  #preLogo {
    width: 140px;
    height: 140px;
    background: url("/assets/textures/ffLogo.png") center center / 100% auto no-repeat;
    position: absolute;
    left: -160px;
    top: 0px;
    display: none;
  }

  &.visible {
    opacity: 1;
    transform: translateY(0px);
    cursor: pointer;
    pointer-events: auto;
  }

  svg {
    transform: scale(0.5);
  }
}

@media screen and (max-width: 500px) {
  #preloader {
    margin: 70px 0 0 -110px;

    #preLogo {
      left: 0px;
      top: -160px;
    }
  }
}
</style>
