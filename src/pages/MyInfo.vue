<template lang="html">
  <view-box class="" ref="viewBox" body-padding-top="60px" body-padding-bottom="55px">
    <div class="main-box">
      <div class="box-header">
        <h3 class="name">{{ name }}</h3>
        <ul>
          <li>班级 ：{{ cls }}</li>
          <li>学号 ：{{ no }}</li>
          <li>手机 ：{{ phone }}</li>
        </ul>
      </div>
      <div class="box-body">
        <p class="label">现在可以查看</p>
        <div class="btn-wrapper">
          <a @click="navigateTo(2003)" class="mybtn btn-2003" ></a>
          <a @click="navigateTo(2007)" class="mybtn btn-2007" ></a>
        </div>
      </div>
    </div>
    <alert v-model="alertShow" button-text=" " :title="alertTitle" @on-show="onAlertShow" @on-hide="onAlertHide">
      <button type="button" class="btn-close" @click="closeAlert"></button>
      <div class="alert-box alert-icon">
        <img src="../assets/info/cat.png" alt="">
      </div>
      <div class="alert-box alert-message">
        <p>您还未进行身份认证哦</p>
        <router-link to="bind" class="alert-btn">赶紧去认证</router-link>
      </div>
    </alert>
  </view-box>
</template>

<script>
import { ViewBox, Alert } from 'vux'
import FormService from '@/service/FormService'

export default {
  data(){
    return {
      name: '姓名',
      cls: '未填写',
      no: '未填写',
      phone: '未填写',
      alertShow: false,
      alertTitle: ''
    }
  },
  methods: {
    onAlertShow(){

    },
    onAlertHide(){

    },
    closeAlert(){
      this.alertShow = false
    },
    navigateTo(num){
      if(this.name === '姓名'){
        this.alertShow = true
        return
      }
      this.$router.push('detail'+num)
    }
  },
  components: {
    ViewBox,
    Alert
  },
  mounted(){
    if( isEmpty(this.$store.state.userInfo) ){
      FormService.fetchUser().then(data => {
        if(data.MsgCode === '1'){
          if (!data.Data) {
            this.alertShow = true
            return
          }

          this.$store.commit('initUserInfo',{
            name: data.Data.Name,
            cls: data.Data.ClassName,
            no: data.Data.StudentNO,
            phone: data.Data.PhoneNO,
            sex: data.Data.Sex
          })
          this.name = data.Data.Name
          this.cls = data.Data.ClassName
          this.no = data.Data.StudentNO
          this.phone = data.Data.PhoneNO
          let photo2003 = data.Data.Photo2003 || '',photo2007 = data.Data.Photo2007 || ''

          this.$store.commit('initPhotoSrc',{
            Photo2003: photo2003,
            Photo2007: photo2007
          })
        }else {
          this.alertShow = true
        }
      })
    }else {
      this.name = this.$store.state.userInfo.name
      this.cls = this.$store.state.userInfo.cls
      this.no = this.$store.state.userInfo.no
      this.phone = this.$store.state.userInfo.phone
    }
  }
}

function isEmpty(o){
  for(var k in o){
    return false
  }
  return true
}
</script>

<style lang="less" scoped>
img {
  height: 100%;
  width: 100%;
}
.main-box {
  width: 4.33rem;
  height: 5.5rem;
  margin: 0 auto;
  padding: .53rem;
  background: url('../assets/info/2-84.png');
  background-size: cover;
  font-size: 18px;
  box-sizing: border-box;
  .box-header {
    .name {
      color: #6c4539;
      margin: .1rem 0;
    }

    li {
      margin-bottom: 3px;
      list-style: none;
      font-size: 13px;
      color: darken(#D0D3D4,40%);
    }
  }
  .box-body {
    margin: .4rem 0;

    p {
      margin-bottom: .4rem;
    }

    .btn-wrapper {
      position: relative;
    }

    .btn-wrapper:before {
      position: absolute;
      right: -.3rem;
      top: -.3rem;
      display: block;
      content: '';
      width: .46rem;
      height: .38rem;
      background: url('../assets/info/2-83.png');
      background-repeat: no-repeat;
      background-size: cover;
    }

    .label {
      color: #eb7e21;
      font-size: 18px;
    }

    .mybtn {
      display: block;
      height: .8rem;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .btn-2003 {
      background-image: url('../assets/info/1-91.png');
    }
    .btn-2007 {
      background-image: url('../assets/info/1-92.png');
    }
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
.alert-box {
  display: inline-block;
  margin-bottom: .3rem;
  text-align: left;
}
.alert-icon {
  width: .72rem;
  height: 1.07rem;
}
.alert-message {
  color: #000;
  vertical-align: top;

  p {
    margin: .1rem;
    font-size: .2rem;
    font-weight: 600;
  }
}
.alert-btn {
  display: inline-block;
  margin: 5px 0 0 5px;
  padding: 3px .1rem;
  border-radius: 4px;
  background-color: #23A439;
  color: #fff;
  font-size: .2rem;
}
.btn-close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: .326rem;
  height: .333rem;
  border: none;
  background: url('../assets/info/close.png');
  background-repeat: no-repeat;
  background-size: cover;
  user-select: none;
  -webkit-appearance: none;
}
</style>
