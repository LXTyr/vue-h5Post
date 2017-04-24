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
  </div>
</template>

<script>
import PostItem from './PostItem'
import Loading from './Loading.vue'
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
        transition: ''
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
      currentPage: -1
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
    'loading': Loading
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
    setTimeout(()=>{
      this.isloading = false;
      this.currentPage = 0;
    },0)
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
}
.post-wrapper {
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
}
.post {
  width: 100%;
  position: relative;
}
.music {
  position: absolute;
  top: .1rem;
  right: 1.5rem;
  width: 2rem;
  height: 2rem;
  z-index: 100;
}

.music .control{
  width: 3.5rem;
  height: 3.5rem;
  background: url('../assets/music.gif') transparent no-repeat center center;
  background-size: contain;
}
.music .control-btn {
  position: absolute;
  top: 50%;
  left: 20%;
  width: 2rem;
  height: 2rem;
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
@keyframes rotate2d {
  .loop-rotate(10%)
}
.loop-rotate(@index) when (@index =< 100){
  @{index} {transform: rotate(unit(@index*360)/100deg);}
  .loop-rotate(@index + 10)
}
</style>
