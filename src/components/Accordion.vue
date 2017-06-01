<template lang="html">
<div>
  <div class="weui-cells">
      <div
        class="weui-cell"
        @click="onClick">
        <div class="weui-cell__hd">
          <slot name="icon"></slot>
        </div>
        <div class="vux-cell-bd vux-cell-primary">
          <p>
            <label class="vux-label" v-if="title">{{title}}</label>
          </p>
        </div>
        <div class="weui-cell__ft">
          <i class="fa" :class="panelShow?'fa-chevron-up':'fa-chevron-down'"></i>
        </div>
      </div>
  </div>
  <transition v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:after-enter="afterEnter"
    v-on:leave="leave"
    v-bind:css="false">
      <div class="accordion-panel" v-show="panelShow">
        <slot></slot>
      </div>
  </transition>
</div>
</template>

<script>
import Velocity from 'velocity-animate'
export default {

  name: 'Accordion',
  props: {
    title: {
      type: String, // String, Number, Boolean, Function, Object, Array
      required: true,
      default: ''
    }
  },
  data () {
    return {
      panelShow: false
    };
  },
  methods: {
    onClick () {
      this.panelShow = !this.panelShow
    },
    beforeEnter (el) {
      el.style.height = 0
    },
    enter (el,done) {
      Velocity(el, { height: el.scrollHeight + 'px' }, { duration: 300,complete: done })
    },
    leave (el,done) {
      Velocity(el, { height: 0 }, { duration: 300,complete: done })
    },
    afterEnter(el) {
      el.style.height= 'auto'
    }
  }
};
</script>

<style lang="css" scoped>
.accordion-panel {
  overflow: hidden;
}
</style>
