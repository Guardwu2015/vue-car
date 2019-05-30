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
<m-nav />
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
import mNav from 'components/mNav'
export default {
  name: 'app',
  components: {
    mNav
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
