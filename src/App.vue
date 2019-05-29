<template>
<div id="app">
<aside id="dynamicContent">
    <!--////////// 00. Background //////////-->
    <div id="cardBack">
    </div>
    <!--////////// 01. Dimensions //////////-->
    <div id="content-dimensions">
        <h1>Dimensions</h1>
        <p class="copy">FF 91's 126-inch long wheelbase and extended platform is a new benchmark in comfort and refinement. The welcome
            absence of a gas powertrain allowed us to create a unique interior architecture that maximizes space and
            luxury.</p>
    </div>

    <!--////////// 02. Battery //////////-->
    <div id="content-battery">
        <h1>Battery</h1>
        <p class="copy">Our 130 kWh lithium-ion battery pack achieves the world’s highest energy density of any automotive battery currently
            in production. This enables a tremendous increase in range, well in excess of 300 miles on a single charge
            and 200 miles on a 30-minute fast charge.</p>
    </div>

    <!--////////// 03. Powertrain //////////-->
    <div id="content-powertrain">
        <svg id="powertrainSlider" class="svgSlider">
            <polyline class="lineArrow" points="70 22 50 2 30 22" />
            <polyline class="lineArrow" points="30 478 50 498 70 478" />
            <line class="lineDashed" x1="50" y1="50" x2="50" y2="450" />
            <g id="powerKnob" class="knob">
                <circle class="circle" cx="50" cy="250" r="50" />
                <polyline class="lineDiamond" points="30 250 50 270 70 250 50 230 30 250 70 250" />
            </g>
        </svg>
        <div id="powertrainText">
            <h1>Powertrain</h1>
            <ul>
                <li>3 Electric Motors</li>
                <li>1,050 Horsepower</li>
                <li>0 - 60 mph in 2.39 seconds</li>
                <li>Dynamic Vehicle Control</li>
            </ul>
        </div>
    </div>

    <!--////////// 04. 4-Wheel Steering //////////-->
    <div id="content-steering">
        <h1>4-Wheel Steering</h1>
        <p class="copy">This feature allows all four wheels to act in unison to give FF 91 incredibly responsive and nimble handling,
            comparable with the turning radius of a much smaller vehicle.</p>

        <svg id="steeringSlider" class="svgSlider">
            <polyline class="lineArrow" points="22 70 2 50 22 30" />
            <polyline class="lineArrow" points="478 30 498 50 478 70" />
            <line class="lineDashed" x1="50" y1="50" x2="450" y2="50" />
            <g id="steerKnob" class="knob">
                <circle class="circle" cx="250" cy="50" r="50" />
                <polyline class="lineDiamond" points="250 30 270 50 250 70 230 50 250 30 250 70" />
            </g>
        </svg>
    </div>

    <!--////////// 05. Front Lighting //////////-->
    <div id="content-front-lighting">
        <h1>Front Lighting</h1>
        <div class="frontLightBut active">
            <svg>
                <polyline class="edge" points="20,2 38,20 20,38 2,20 20,2" />
                <polyline class="inner" points="20,12 28,20 20,28 12,20 20,12" />
            </svg>
            <p>Daytime running lights</p>
        </div>
        <div class="frontLightBut active">
            <svg>
                <polyline class="edge" points="20,2 38,20 20,38 2,20 20,2" />
                <polyline class="inner" points="20,12 28,20 20,28 12,20 20,12" />
            </svg>
            <p>Low beams</p>
        </div>
        <div class="frontLightBut">
            <svg>
                <polyline class="edge" points="20,2 38,20 20,38 2,20 20,2" />
                <polyline class="inner" points="20,12 28,20 20,28 12,20 20,12" />
            </svg>
            <p>High beams</p>
        </div>
        <div class="frontLightBut">
            <svg>
                <polyline class="edge" points="20,2 38,20 20,38 2,20 20,2" />
                <polyline class="inner" points="20,12 28,20 20,28 12,20 20,12" />
            </svg>
            <p>Fog lamps</p>
        </div>
    </div>

    <!--////////// 06. Rear Lighting //////////-->
    <div id="content-rear-lighting">
        <h1>Rear Lighting</h1>
        <svg id="rearSlider" class="svgSlider">
            <polyline class="lineArrow" points="478 30 498 50 478 70" />
            <polyline class="lineArrow" points="22 70 2 50 22 30" />
            <polyline class="lineArrow" points="270 128 250 148 230 128" />
            <line class="lineDashed" x1="50" y1="50" x2="450" y2="50" />
            <g id="rearKnob" class="knob">
                <circle class="circle" cx="250" cy="50" r="50" />
                <polyline class="lineDiamond" points="250 30 270 50 250 70 230 50 250 30 250 70" />
            </g>
        </svg>
    </div>

    <!--////////// 07. Aerodymanics //////////-->
    <div id="content-aerodynamics">
        <h1>Aerodynamics</h1>
        <p class="copy">Most luxury vehicles of this size and shape have a drag coefficient in excess of 0.3. Our target is to get it
            below 0.26. At highway speeds, this 13% reduction in aerodynamic drag gives you a 5% improvement in range.</p>
    </div>

    <svg width="90" height="90" id="closeX">
        <path class="tan" d="M29,5.1c-5.2,2.1-10.2,5.3-14.4,9.5c-16.8,16.8-16.8,44,0,60.8c4.2,4.2,9.2,7.4,14.4,9.5" />
        <path class="tan" d="M61,84.9c5.2-2.1,10.2-5.3,14.4-9.5c16.8-16.8,16.8-44,0-60.8c-4.2-4.2-9.2-7.4-14.4-9.5" />
        <line class="gray" x1="32" y1="58" x2="58" y2="32" />
        <line class="gray" x1="32" y1="32" x2="42" y2="42" />
        <line class="gray" x1="48" y1="48" x2="58" y2="58" />
    </svg>
</aside>

<div id="GLCanvas"></div>
<div id="CSSCanvas"></div>

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

<div id="disclaimer">Production FF 91 specifications may differ</div>

<div id="backBtn" class="inverted" style="display: none">Back to FF.com</div>

<div id="navShow">
    <svg width="50" height="50">
        <polyline class="bar" points="15,19 35,19" />
        <polyline class="bar" points="15,25 35,25" />
        <polyline class="bar" points="15,31 35,31" />
    </svg>
</div>

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
</div>
</template>

<script>
import initApp from 'threes/initApp'

export default {
  name: 'app',
  mounted () {
    initApp()
    console.log('init')
  }
}
</script>

<style lang="scss">
html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  width: 100%;
  height: 100%;
}
body {
  margin: 0;
  width: 100%;
  height: 100%;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section,
summary {
  display: block;
}
audio,
canvas,
progress,
video {
  display: inline-block;
  vertical-align: baseline;
}
audio:not([controls]) {
  display: none;
  height: 0;
}
[hidden],
template {
  display: none;
}
a {
  background-color: transparent;
}
a:active,
a:hover {
  outline: 0;
}
abbr[title] {
  border-bottom: 1px dotted;
}
b,
strong {
  font-weight: bold;
}
dfn {
  font-style: italic;
}
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
mark {
  background: #ff0;
  color: #000;
}
small {
  font-size: 80%;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sup {
  top: -0.5em;
}
sub {
  bottom: -0.25em;
}
img {
  border: 0;
  display: block;
  max-width: 100%;
  height: auto;
}
svg:not(:root) {
  overflow: hidden;
}
figure {
  margin: 1em 40px;
}
hr {
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  height: 0;
}
pre {
  overflow: auto;
}
code,
kbd,
pre,
samp {
  font-family: monospace, monospace;
  font-size: 1em;
}
button,
input,
optgroup,
select,
textarea {
  color: inherit;
  font: inherit;
  margin: 0;
}
button {
  overflow: visible;
}
button,
select {
  text-transform: none;
}
button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
  -webkit-appearance: button;
  cursor: pointer;
}
button[disabled],
html input[disabled] {
  cursor: default;
}
button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}
input {
  line-height: normal;
}
input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  height: auto;
}
input[type="search"] {
  -webkit-appearance: textfield;
  -moz-box-sizing: content-box;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
fieldset {
  border: 1px solid #c0c0c0;
  margin: 0 2px;
  padding: 0.35em 0.625em 0.75em;
}
legend {
  border: 0;
  padding: 0;
}
textarea {
  overflow: auto;
}
optgroup {
  font-weight: bold;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
td,
th {
  padding: 0;
}
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html {
  font-size: 10px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 10px;
  line-height: 1.428571429;
  color: #fff;
  background-color: #333;
}
input,
button,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
a {
  color: #9A9A9A;
  text-decoration: none;
}
a:hover,
a:focus {
  color: #9A9A9A;
  text-decoration: underline;
}
a:focus {
  outline: thin dotted;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
.img-responsive {
  display: block;
  max-width: 100%;
  height: auto;
}
.img-responsive-2 {
  display: block;
  width: auto;
  max-height: 100%;
}
nav {
  pointer-events: none;
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  font-size: 14px;
  z-index: 1;
}
#app {
  width: 100%;
  height: 100%;
}
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
}
#navInner.inverted {
  color: #cccccc;
}
#navInner.inverted .social {
  fill: #cccccc;
}
#navInner .title {
  font-size: 5em;
  font-weight: 300;
  text-align: right;
  margin: 0 -15px 15px 0;
  line-height: 1em;
}
#navInner .navList {
  margin: 0;
  padding: 0;
  list-style-type: none;
  counter-reset: elementcounter;
  font-weight: 400;
}
#navInner .navItem {
  pointer-events: auto;
  text-align: right;
  padding-bottom: 30px;
  cursor: pointer;
  transform-origin: 100% 50%;
  touch-action: none;
}
#navInner .navItem:after {
  content: "0" counter(elementcounter);
  counter-increment: elementcounter;
  font-size: 0.7em;
  width: 50px;
  border-bottom: 2px solid #808080;
  display: inline-block;
  margin-left: 10px;
  transition: all 0.3s ease;
}
#navInner .navItem:hover:after {
  width: 60px;
}
#navInner .navItem.active {
  color: #9a614c;
}
#navInner .navItem.active:after {
  width: 70px;
  padding-right: 10px;
}
#navInner .social {
  width: 56px;
  height: 56px;
  fill: #333333;
  position: relative;
  cursor: pointer;
  pointer-events: auto;
  transition: 0.3s fill ease-in-out;
}
#navInner .social:hover {
  fill: #9a614c;
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
}
.bigBut:hover {
  background: transparent;
  color: #9a614c;
}
.bigBut:after {
  font-size: 1.3em;
  line-height: 0.5em;
  content: " \2192";
}
#reserveBut {
  color: #fff;
  background: #9a614c;
}
#reserveBut:hover {
  color: #9a614c;
  background: transparent;
}
#subscribeBut {
  color: #9a614c;
  background: transparent;
}
#subscribeBut:hover {
  color: #fff;
  background: #9a614c;
}
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
}
#navShow svg {
  pointer-events: none;
}
#navShow .bar {
  fill: none;
  stroke-width: 2px;
  stroke: #fff;
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
  }
  nav.inverted {
    background-color: rgba(33, 41, 52, 0.8);
  }
  nav.visible {
    transform: translateY(0%);
  }
  #navInner {
    top: 0px;
    margin-top: 0;
  }
  #navShow {
    display: block;
    touch-action: none;
  }
  #navShow.hidden {
    display: none;
  }
}
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
}
#disclaimer.enabled {
  display: block;
  opacity: 1;
}
#disclaimer.inverted {
  color: #cccccc;
}
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
}
#preloader #preHeader {
  font-size: 26px;
}
#preloader #preBar {
  width: 100px;
  height: 3px;
  border: 1px solid #9a614c;
  margin: 5px auto;
}
#preloader #preProg {
  background: #fff;
  height: 100%;
  width: 0%;
}
#preloader #preDetail {
  font-size: 14px;
  font-weight: 400;
  padding-top: 5px;
  text-transform: uppercase;
  color: #9a614c;
}
#preloader #preButton {
  background: #9a614c;
  width: 220px;
  height: 40px;
  margin-top: 15px;
  position: relative;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  display: none;
}
#preloader #preButton:hover {
  background: #ffffff;
  color: #9a614c;
}
#preloader a {
  color: #fff;
}
#preloader #preButText {
  position: absolute;
  top: 12px;
  width: 220px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
}
#preloader #preLogo {
  width: 140px;
  height: 140px;
  background: url("/assets/textures/ffLogo.png") center center / 100% auto no-repeat;
  position: absolute;
  left: -160px;
  top: 0px;
  display: none;
}
#preloader.visible {
  opacity: 1;
  transform: translateY(0px);
  cursor: pointer;
  pointer-events: auto;
}
@media screen and (max-width: 500px) {
  #preloader #preloader {
    margin: 70px 0 0 -110px;
  }
  #preloader #preLogo {
    left: 0px;
    top: -160px;
  }
}
#preloader svg {
  transform: scale(0.5);
}
#dynamicContent {
  display: none;
}
svg {
  position: absolute;
}
#cardBack {
  display: block;
  background: rgba(255, 255, 255, 0.5);
  width: 0px;
  height: 0px;
  transition: width 0.5s ease-in, height 0.5s ease-in;
}
#cardBack.active {
  transition: width 0.8s ease-out, height 0.8s ease-out;
}
#cardBack.inverted {
  background: rgba(0, 0, 0, 0.5);
}
#cardFore {
  display: block;
  color: #333333;
  padding: 24px;
  width: 0px;
  height: 0px;
  opacity: 0;
  transition: opacity 0.5s ease-in;
}
#cardFore.active {
  opacity: 1;
  transition: opacity 1s 0.5s ease-out;
}
#cardFore.inverted {
  color: #fff;
}
#cardFore.inverted #closeX .gray {
  stroke: #fff;
}
#cardFore #closeX {
  top: 24px;
  right: 24px;
}
#cardFore .col-item {
  margin-bottom: 24px;
}
#cardFore .col-full {
  width: calc(100% - 24px);
  display: inline-block;
}
#cardFore .col-half {
  width: calc(50% - 24px);
  display: inline-block;
}
#cardFore #powertrainText {
  display: inline-block;
  vertical-align: top;
  margin-left: 24px;
}
#cardFore .frontLightBut {
  margin-top: 48px;
  pointer-events: auto;
  cursor: pointer;
}
#cardFore .frontLightBut svg {
  width: 40px;
  height: 40px;
  position: relative;
  margin-left: 12px;
}
#cardFore .frontLightBut .edge {
  fill: none;
  stroke-width: 3px;
  stroke: #333333;
  transition: all 0.5s ease-in-out;
}
#cardFore .frontLightBut .inner {
  fill: #fff;
  transform: scale(0);
  transform-origin: 20px 20px;
  transition: all 0.3s ease-in-out;
  opacity: 0;
}
#cardFore .frontLightBut p {
  margin-left: 12px;
  height: 20px;
  display: inline;
  font-size: 1.5em;
  font-weight: 300;
  vertical-align: top;
}
#cardFore .frontLightBut.active .edge {
  stroke: #9a614c;
  stroke-width: 3px;
}
#cardFore .frontLightBut.active .inner {
  transform: scale(1);
  opacity: 1;
}
.svgSlider {
  position: absolute;
}
.svgSlider .knob {
  cursor: pointer;
  pointer-events: auto;
}
.svgSlider#powertrainSlider {
  width: 100px;
  height: 500px;
  position: relative;
}
.svgSlider#steeringSlider {
  top: 440px;
  left: 200px;
  width: 500px;
  height: 100px;
}
.svgSlider#rearSlider {
  top: 200px;
  left: 200px;
  width: 500px;
  height: 150px;
}
.svgSlider#rearSlider .lineArrow {
  stroke: #fff;
}
.lineArrow,
.lineDashed,
.lineDiamond {
  fill: none;
  stroke-width: 3px;
}
.circle {
  fill: #212934;
}
.lineDiamond {
  stroke: #9a614c;
  stroke-linejoin: round;
}
.lineArrow {
  stroke: #808080;
}
.lineDashed {
  stroke: #9a614c;
  stroke-dasharray: 16 8;
}
#closeX {
  position: absolute;
  cursor: pointer;
  pointer-events: auto;
}
#closeX .gray,
#closeX .tan {
  fill: none;
  stroke-width: 3px;
  transition: transform 0.3s ease-in-out;
  transform-origin: 45px 45px;
}
#closeX .tan {
  stroke: #9a614c;
}
#closeX .gray {
  stroke: #333333;
}
#closeX:hover .tan {
  transform: rotate(90deg);
}
#closeX:hover .gray {
  transform: rotate(-90deg);
}
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body {
  overflow: hidden;
  font-family: "Roboto", Sans-serif;
  color: #333333;
  background-color: #000;
  font-weight: 300;
  font-size: 28px;
}
#GLCanvas,
#CSSCanvas {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
}
#CSSCanvas > div:first-of-type {
  pointer-events: none;
}
.color-mid-gray {
  color: #808080;
}
.color-light-gray {
  color: #cccccc;
}
.borderTan {
  width: 95%;
  border-bottom: 3px solid #9a614c;
}
.borderGray {
  width: 50%;
  border-bottom: 3px solid #808080;
  display: inline-block;
}
h1,
h2,
h3,
p {
  margin: 0;
  line-height: 1em;
}
h1 {
  font-size: 2.5em;
  font-weight: 300;
  margin: 0 0 24px;
}
h1:after {
  content: " ";
  width: 150px;
  margin-top: 24px;
  margin-left: 4px;
  border-bottom: 4px solid #9a614c;
  display: block;
}
h2 {
  font-weight: 300;
  font-size: 2.5em;
}
h3 {
  font-weight: 300;
  font-size: 1.25em;
}
p.caption {
  font-weight: 400;
  font-size: 1em;
}
p.copy {
  font-size: 1.75em;
  line-height: 1.1em;
}
hr {
  border-top: none;
  border-bottom: 2px solid #9a614c;
  width: 75px;
  display: inline-block;
}
ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
ul li {
  margin: 0 0 12px 12px;
  font-size: 1.5em;
}
ul li:before {
  color: #9a614c;
  content: "\2014   ";
}
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
}
#backBtn:before {
  content: "\2190   ";
}
#backBtn.inverted {
  color: #cccccc;
}

</style>
