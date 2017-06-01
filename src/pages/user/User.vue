<template lang="html">
  <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
    <x-header slot="header"
     style="width:100%;position:absolute;left:0;top:0;z-index:100;"
     :title="title"
     :transition="headerTransition">
       <span slot="right" v-if="action.show" @click="action.handler"><i class="fa" :class="'fa-'+action.icon"></i></span>
     </x-header>
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
        <router-view class="router-view"></router-view>
    </transition>
  </view-box>
</template>

<script>
import { ViewBox, XHeader, TransferDom } from 'vux'
import { mapState } from 'vuex'
export default {
  mounted () {

  },
  computed: {
    ...mapState({
      direction: state => state.direction,
      title: state => state.title,
      action: state => state.action
    }),
    headerTransition () {
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    }
  },
  components: {
    ViewBox,
    XHeader,
    TransferDom
  }
}
</script>

<style lang="css">
.router-view {
  width: 100%;
  top: 46px;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
