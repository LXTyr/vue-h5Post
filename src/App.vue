<template>
    <router-view :options="options"></router-view>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      options: {
        animateDuration:1,
        backgroundImage:'https://cn.vuejs.org/images/logo.png',
        children:[
          {
            backgroundColor: '#3f3'
          },
          {
            backgroundColor: 'rgb(226, 3, 176)'
          },
          {
            backgroundColor: 'red'
          }
        ],
        audio: {
          src:'http://d.ring.i4.cn/audio/2014/05/15/22/3416359331eae23ef0657877aabde9c0.mp3'
        }
      }
    }
  }
}
</script>

<style>

</style>
