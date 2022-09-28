<template>
  <div id="animation" class="animation">
    <div class="progress shine" data-width="0%">
      <div class="progress-text"></div>
      <div class="progress-bar">
        <div class="progress-text"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'animation',
  data () {
    return {

    }
  },
  components: {

  },
  methods: {

  },
  created () {

  }
}
</script>

<style lang="scss" >
.animation {
	height: 5px;
}
.progress {
	position: relative;
	z-index: 9999;
	top: 4.6vh;
	background:#484848;
	// border:10px solid #282828;
	border-radius: 20px;
	display: inline-block;
	// box-shadow: 0 5px 17px rgba(40, 40, 40, 0.5),0 0 3px 1px rgba(40, 40, 40, 0.5) inset;

}
.progress-text {
	position: absolute;
	font: bold 14px/20px Arial;
	text-align: center;
	top: 0;
	left: 0;
}
.progress, .progress-bar, .progress-text {
	width: 100%;
	height: 5px;
}
.progress .progress-text:first-child {
	z-index: 5;
	color: white;
}
.progress .progress-text:last-child {
	z-index: 10;
	color: black;
}
.progress-bar {
	overflow: hidden;
	position: relative;
	z-index: 10;
 	// border-radius: 12px;
	width: 100%;
	-moz-transition: width .2s linear;
	-webkit-transition: width .2s linear;
	-o-transition: width .2s linear;
	transition: width .2s linear;
}

/* Test Style */
.progress.test .progress-bar {
	background-color: #00baba;
	background-image: -moz-linear-gradient(left, #d1fffb 0%, #00baba 100%);
	background-image: -webkit-linear-gradient(left, #d1fffb 0%,#00baba 100%);
	background-image: -o-linear-gradient(left, #d1fffb 0%,#00baba 100%);
	background-image: -ms-linear-gradient(left, #d1fffb 0%,#00baba 100%);
	background-image: linear-gradient(to right, #d1fffb 0%,#00baba 100%);
    background-size: 100% 100%;

	overflow: visible;
}
.progress.test .progress-text:first-child {
	display:none;
}
.progress.test .progress-text:last-child {
	left: auto;
	top:auto;
	bottom: -26px;
	right: -12px;
	display: block;
	background-color: #00baba;
	width: 40px;
	height: 20px;
	border-radius: 3px;
}

.test[data-width='0%'] .progress-text:last-child {
	display: none;
}

.progress.test .progress-text:last-child:before {
	position: absolute;
	left: 12px;
	top: -6px;
	content: '';
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 0 6px 6px 6px;
	border-color: transparent transparent #00baba transparent;
}

// /* Candystripe style */
// .progress.candy .progress-bar {
//     background-color: #d00;
//     box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.3) inset;
//     background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0.35) 25%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 255, 255, 0.35) 75%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0));
//     background-repeat: repeat-x;
//     background-size: 20px 20px;
// 	-webkit-animation: candystripe 1s linear infinite;
// 	-moz-animation: candystripe 1s linear infinite;
// 	animation: candystripe 1s linear infinite;
// }
// @-webkit-keyframes candystripe {
// to {background-position: 20px 0;}
// }
// @-moz-keyframes candystripe {
// to {background-position: 20px 0;}
// }
// @keyframes candystripe {
// to {background-position: 20px 0;}
// }
/* Aqua Style */
.progress.aqua .progress-bar {
	background-color: #00baba;
	background-image: -moz-linear-gradient(left, #d1fffb 0%, #00baba 100%);
	background-image: -webkit-linear-gradient(left, #d1fffb 0%,#00baba 100%);
	background-image: -o-linear-gradient(left, #d1fffb 0%,#00baba 100%);
	background-image: -ms-linear-gradient(left, #d1fffb 0%,#00baba 100%);
	background-image: linear-gradient(to right, #d1fffb 0%,#00baba 100%);
    background-size: 100% 100%;
}

/* Shine style */
.progress.shine .progress-bar {
	background-color: #00BA0C;
	background-image: -moz-linear-gradient(left, #00BA0C 0%, #00BA0C 75%, #D7FFD1 80%, #00BA0C 85%, #00BA0C 100%);
	background-image: -webkit-linear-gradient(left, #00BA0C 0%,#00BA0C 75%,#D7FFD1 80%,#00BA0C 85%,#00BA0C 100%);
	background-image: -o-linear-gradient(left, #00BA0C 0%,#00BA0C 75%,#D7FFD1 80%,#00BA0C 85%,#00BA0C 100%);
	background-image: -ms-linear-gradient(left, #00BA0C 0%,#00BA0C 75%,#D7FFD1 80%,#00BA0C 85%,#00BA0C 100%);
	background-image: linear-gradient(to right, #00BA0C 0%,#00BA0C 75%,#D7FFD1 80%,#00BA0C 85%,#00BA0C 100%);
    background-size: 800px 20px;
	// box-shadow: inset 0 -2px 2px rgba(0,0,0,0.5), inset 0 2px 2px rgba(255,255,255,0.8);
	-webkit-animation: shine 2s linear infinite;
	-moz-animation: shine 2s linear infinite;
	animation: shine 2s linear infinite;
}

@-webkit-keyframes shine {
to {background-position: 800px 0;}
}
@-moz-keyframes shine {
to {background-position: 800px 0;}
}
@keyframes shine {
to {background-position: 800px 0;}
}

h2 {
  text-align: center;
  font-size: 18px;
  font-family: Arial;
}
a {
  color: #89310F;
}
</style>
