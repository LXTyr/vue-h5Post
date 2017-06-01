<template lang="html">
  <view-box class="" ref="viewBox" body-padding-top="60px" body-padding-bottom="55px">
    <div class="background">
      <img src="../assets/info/0-86.png" alt="">
    </div>
    <div class="main-wrapper">
      <div class="main-box">
        <div class="box-header">
          <img src="../assets/info/2007.png" alt="">
        </div>
        <div class="box-body">
          <div class="photo" v-if="photosrc != ''">
            <img :src="photosrc" alt="">
          </div>
          <div class="" v-else>
            <div class="body-title">
              <img src="../assets/info/w-97.png" alt="">
            </div>
            <div class="body-face">
              <img :src="facePic" alt="">
            </div>
          </div>
          <div class="">
            <router-link to="detail2003" class="link" >查看2003年的你</router-link>
          </div>
        </div>
        <div class="box-footer">
            <router-link to="myinfo" class="btn btn-back" >返回个人信息</router-link>
        </div>
      </div>
    </div>
  </view-box>
</template>

<script>
import { ViewBox } from 'vux'
let picM = require('../assets/info/w-98.png')
let picF = require('../assets/info/1-97.png')
export default {
  data(){
    return {
      photosrc: '',
      facePic: ''
    }
  },
  methods: {
    goBack() {
      history.back()
    }
  },
  components: {
    ViewBox
  },
  mounted(){
    this.photosrc = this.$store.state.photoSrc.Photo2007
    if(this.photosrc === '' && this.$store.state.userInfo.sex === '男'){
      this.facePic = picM
    }else {
      this.facePic = picF
    }
  }
}
</script>

<style lang="less" scoped>
.background {
  position: absolute;
  height: 100%;
  width: 100%;
  top: -60px;
  left: -10px;
}
.main-wrapper  {
  width: 100%;
  height: 100%;
  background: url('../assets/info/0-86.png');
  background-size: cover;
  background-repeat: no-repeat;

}
img {
  width: 100%;
  height: 100%;
}
.main-box {
  position: relative;
  width: 4.193rem;
  height: 5.626rem;
  margin: 0 auto;
  padding: .53rem;
  background: url('../assets/info/0-88.png');
  background-size: cover;
  font-size: 18px;
  box-sizing: border-box;
  .box-header {
    position: absolute;
    top: -.3rem;
    left: .85rem;
    width: 2.49rem;
    height: .93rem;


  }
  .box-body {
    margin: .6rem 0 .4rem;
    text-align: center;
    .photo {
      width: 1.5rem;
      height: 2.1rem;
      margin: 0 auto .5rem;
    }
    .body-title {
      width: 2.573rem;
      height: 1.026rem;
      margin: 0 auto;
    }
    .body-face {
      width: 1.586rem;
      height: 1.64rem;
      margin: 0 auto;
    }
  }
  .box-footer {
    text-align: center;

    .btn-back {
      padding: .1rem .3rem;
      border-radius: 20px;
      background-color: #EFAD2C;
      color: #fff;
      font-size: 14px;
    }
  }
  .link {
    color: #c0b393;
    text-decoration: underline;
  }
}
</style>
