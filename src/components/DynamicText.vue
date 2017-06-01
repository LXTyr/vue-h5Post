<template lang="html">
  <div class="dynamic-text" :class="cls">
    <span>{{realText}}</span>
  </div>
</template>

<script>
export default {
  props: [
    'active',
    'text',
    'delay'
  ],
  data: function () {
    return {
      realText: '',
      cls: {
        blink: false
      }
    }
  },
  watch: {
    active: function (newValue) {
      if(newValue){
        let text = this.text
        this.realText = ''
        var self = this
        //self.realText = text
        function generate(i) {
          self.realText = text.substr(0,i)
          if(i <= text.length && self.active){
            setTimeout(function () {
              i += 1
              generate(i)
            },200)
          }else {
            self.cls.blink = false
          }
        }
        setTimeout(function () {
          generate(1)
          self.cls.blink = true
        },this.delay*1000||0)
      }
    }
  },
  mounted: function () {

  }
}
</script>

<style lang="css">
.dynamic-text {
  position: relative;
}
.blink:after {
  position: relative;
  content: '|';
  animation-name: shine;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
}
</style>
