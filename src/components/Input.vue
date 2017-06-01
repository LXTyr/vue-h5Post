<template lang="html">
  <view-box class="" ref="viewBox" body-padding-top="60px" body-padding-bottom="55px">
    <group :title="title" :class="{'weui-groun_warn': title!== '联系信息'}">
      <x-input title="手机号" placeholder="请输入手机号" ref="phone" keyboard="number"  v-model="phone" is-type="china-mobile" ></x-input>
    </group>
    <div style="padding:15px;">
      <x-button type="primary" @click.native="submit">确认提交</x-button>
    </div>
  </view-box>
</template>

<script>
import Vue from 'vue'
import { XInput, Group, XButton,ViewBox  } from 'vux'
export default {
  data(){
    return {
      title: '联系信息',
      phone: ''
    }
  },
  watch: {

  },
  methods: {
    submit(){
      console.log(this.$refs.phone.firstError);
    }
  },
  components: {
    XInput,
    Group,
    XButton,
    ViewBox
  }
}
</script>

<style lang="less">

</style>
