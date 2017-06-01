<template lang="html">
    <view-box class="" ref="viewBox" body-padding-top="60px" body-padding-bottom="55px">
      <div class="main-box">
        <div class="box-body">
          <img class="icon" src="../assets/sucs.png" alt="">
          <p class="title">身份绑定成功!</p>
          <router-link to="myinfo" class="link">查看个人信息</router-link>
        </div>
      </div>
    </view-box>
</template>

<script>
import { XInput, Group, XButton,ViewBox  } from 'vux'
export default {
  components: {
    XInput,
    Group,
    XButton,
    ViewBox
  }
}
</script>

<style lang="less" scoped>
.main-box {
  width: 4.24rem;
  height: 5.54rem;
  margin: 0 auto;
  background: url('../assets/bg-touming.png');
  background-size: cover;
  font-size: 18px;
  text-align: center;
  .box-body {
    padding-top: 1.2rem;
  }
  .icon {
    width: 1.2rem;
    height: 1.213rem;
  }

  .title {
    font-size: 30px;
    color: #6c4539;
  }
  .link {
    color: #c0b393;
    text-decoration: underline;
  }
}
</style>
