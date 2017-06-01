<template lang="html">
  <div class="post-wrapper" :style="globalStyle">
    <loading :isloading="isloading"></loading>
    <div class="post" @touchstart="touchStart" @touchmove.prevent="touchMove"
          @touchend="touchEnd"  @transitionend="transitionEnd" :style="style" >
      <post-item v-for="(option,index) in options.children" :key="index" :index="index" :currentPage="currentPage" :options="option" :style="{height: clientHeight+'px'}"></post-item>
    </div>
    <div class="music" v-if="options.audio" :class="{stopped: stopped}">
      <audio  id="music-audio" :src="options.audio.src" loop autoplay="autoplay" preload="auto"></audio>
      <div class="control" @touchstart="handleControl">
        <div class="control-btn">
        </div>
      </div>
    </div>
    <vodal :show="show" animation="zoom" @hide="show = false" :width="4" :height="2" measure="rem">
        <div class="header">提示</div>
        <div class="body">A vue modal with animations.</div>
        <button class="vodal-confirm-btn">确认信息无误</button>
        <button class="vodal-cancel-btn">再回去看看</button>
    </vodal>
  </div>
</template>
<script>
import PostItem from './PostItem'
import Loading from './Loading.vue'
import Vodal from 'vodal'
import "vodal/common.css"
import "vodal/zoom.css"
const dragthreshold = 0.5
let beginY = 0,tempTop = 0,tempPage = 0,timestamp = 0,isAnimating = false
export default {
  props: [
    'options'
  ],
  data: function () {
    return {
      clientHeight: window.innerHeight,
      style: {
        transform: '',
        transition: '',
        width: window.pageWidth + 'px'
      },
      globalStyle: {
        backgroundColor: this.options.backgroundColor,
        backgroundImage: 'url(\''+this.options.backgroundImage+'\')'
      },
      postClass: {
        transiton: false
      },
      backgroundImageUrl: this.options.backgroundImage,
      stopped: false,
      isloading: true,
      currentPage: -1,
      show: false
    }
  },
  computed: {

  },
  watch: {
    stopped: function (newValue) {
      let audio = document.getElementById('music-audio')
      if (newValue) {
        audio.pause()
      }else{
        audio.play()
      }
    }
  },
  components: {
    'post-item': PostItem,
    'loading': Loading,
    Vodal
  },
  methods: {
    touchStart: function (e) {
      if (!isAnimating) {
        beginY = e.touches[0].clientY
        timestamp = e.timeStamp
      }
    },
    touchMove: function (e) {
      if (!isAnimating) {
        let movedY = e.changedTouches[0].clientY - beginY
        if ((tempPage === 0 && movedY > 0)||((tempPage === this.options.children.length - 1) && movedY < 0)) return
        if (Math.ceil(Math.abs(movedY) / window.innerHeight * 100) < dragthreshold * 100) {
          this.style.transform = 'translate3d(0,'+(tempTop + movedY)+'px,0)'
        }
      }
    },
    touchEnd: function (e) {
      if (!isAnimating) {
        let movedY = e.changedTouches[0].clientY - beginY
        if ((tempPage === 0 && movedY > 0)||((tempPage === this.options.children.length - 1) && movedY < 0)) return
        let percentage = parseFloat(movedY / this.clientHeight)
        if(percentage*100 > 20){
          tempPage--
          tempTop += this.clientHeight
        }else if (percentage*100 < -20) {
            tempPage++
            tempTop -= this.clientHeight
        }
        if(Math.abs(movedY) > 0){
          this.style.transition = 'all '+this.options.animateDuration+'s'
          this.style.transform = 'translate3d(0,'+tempTop+'px,0)'
          isAnimating = true
          setTimeout(function () {
            isAnimating = false
          },this.options.animateDuration * 1000)
        }

      }
    },
    transitionEnd: function (e) {
      this.style.transition = 'none'
      this.currentPage = tempPage
      isAnimating = false
    },
    handleControl: function (e) {
      this.stopped = !this.stopped
    }
  },
  mounted: function () {

      this.isloading = false;
      this.currentPage = 0;


    // var firstTouch = true;
    // document.body.addEventListener("touchstart",function(e){
    //     if ( firstTouch ) {
    //     firstTouch = false;
    //     document.getElementById('music-audio').play();
    //     }else{
    //     return;
    //     }
    // });
    // let music = document.getElementsByClassName('music')[0];
    // let offsetRight = music.offsetParent.offsetWidth - music.offsetLeft - music.offsetWidth
    // console.log(offsetRight);
    // let right = (document.documentElement.clientWidth - pageWidth) / 2 + offsetRight
    // music.style.right = right + 'px'
    // var ua = navigator.userAgent;
    // if(/iPhone/i.test(ua)){
    //   this.stopped = true

    //}
    document.addEventListener('DOMContentLoaded', function () {
        function audioAutoPlay() {
            var audio = document.getElementById('music-audio');
                audio.play();
            document.addEventListener("WeixinJSBridgeReady", function () {
                audio.play();
            }, false);
        }
        audioAutoPlay();
    });
  }
}

/*
option:{
  animate,animateDuration
  children:[
    postitem
  ]
  backgroundColor,backgroundImage,
  audio:{
  src,image
}
}
 */

</script>

<style lang="less">
html,body,.post-wrapper {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
body {
  font-size: 16px;
}
ul,li,a,button,menu,dir {
  margin: 0;
  padding: 0;
}
.post-wrapper {
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
}
.post {
  width: 100%;
  margin: 0 auto;
  position: relative;
}
.music {
  position: absolute;
  top: .02133333rem;
  right: .32rem;
  width: .42666667rem;
  height: .42666667rem;
  z-index: 100;
}

.music .control{
  width: .74666667rem;
  height: .74666667rem;
  background: url('../assets/music.gif') transparent no-repeat center center;
  background-size: contain;
}
.music .control-btn {
  position: absolute;
  top: 50%;
  left: 20%;
  width: .42666667rem;
  height: .42666667rem;
  background: url('../assets/music_off.png') transparent no-repeat center center;
  background-size: 100% 100%;
  animation-name: rotate2d;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  z-index: -1;
}
.music.stopped .control {
  background: none;
}
.music.stopped .control-btn {
  animation: none;
}
.vodal-dialog .header {
  font-size: .213rem;
  padding-bottom: .133rem;
  border-bottom: 1px solid #e9e9e9;
}
.vodal-cancel-btn, .vodal-confirm-btn {
    position: absolute;
    font: inherit;
    bottom: .213rem;
    padding: .053rem .2rem;
    border-radius: 3px;
    transition: background .2s;
    border: 1px solid #03a9f4;
}
.vodal-confirm-btn {
    color: #fff;
    right: 1.733rem;
    background: #03a9f4;
}
.vodal-cancel-btn {
    color: #03a9f4;
    right: .213rem;
    background: #fff;
}
.vodal-dialog{
  font-size: 0.186rem;
}
.rotate2d {
  animation-name: rotate2d;
  -webkit-animation-name: rotate2d;
  animation-iteration-count: infinite;
}
.rotate2d-reverse {
  animation-name: rotate2dReverse;
  -webkit-animation-name: rotate2dReverse;
  animation-iteration-count: infinite;
}
@keyframes rotate2d {
  .loop-rotate(1%)
}
@keyframes rotate2dReverse {
  .loop-rotate-reverse(1%)
}
.loop-rotate(@index) when (@index =< 100){
  @{index} {transform: rotate(unit(@index*360)/100deg);}
  .loop-rotate(@index + 1)
}
.loop-rotate-reverse(@index) when (@index =< 100){
  @{index} {transform: rotate(unit(-@index*360)/100deg);}
  .loop-rotate-reverse(@index + 1)
}
</style>
