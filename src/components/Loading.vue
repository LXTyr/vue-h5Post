<template lang="html">
  <div class="loading" v-show="isloading">
    <img :src="src" alt="">
  </div>
</template>

<script>
import img from '../assets/loading.gif'
export default {
  props: [
    'isloading'
  ],
  data() {
    return {
      src: img
    }
  }
}
</script>

<style lang="css">
.loading {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 101;
}
.loading img {
  display: block;
  margin: 10rem auto;
  width: 10rem;
  height: 10rem;
}
</style>
