<template lang="html">
  <div class="post-item" :class="{'no-swipe': options.missSwipe}" :style="style">
    <sprite v-for="(option,index) in options.sprites" :key="index" :options="option" :isActive="isActive">
    </sprite>
  </div>
</template>

<script>
import Sprite from './Sprite.vue'
export default {
  props: [
    'options',
    'index',
    'currentPage'
  ],
  data: function () {
    return {
      style: {
        backgroundColor: this.options.backgroundColor,
        backgroundImage: this.options.backgroundImageUrl
      }
    }
  },
  computed: {
    isActive() {
      return this.index === this.currentPage
    }
  },
  components: {
    'sprite': Sprite
  },
  watch: {
    options: function () {


    }
  },
}
</script>

<style lang="css">
.post-item {
  position: relative;
}
.post-item.no-swipe:after {
  display: none;
}
.post-item:after {
  position: absolute;
  left: 47%;
  bottom: 1em;
  content: " ";
  width: 2em;
  height: 1.8em;
  background-image: url('../assets/web-swipe-tip.png');
  background-repeat: no-repeat;
  background-size: contain;
  animation-name: swipe-tip;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

@keyframes swipe-tip {
  from {
    transform: translate3d(0,0,0);
    opacity: 1;
  }
  50% {
    transform: translate3d(0,-1em);
    opacity: 0.5;
  }
  to {
    transform: translate3d(0,-2em,0);
    opacity: 0;
  }
}
</style>
