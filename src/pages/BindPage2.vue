<template lang="html">
  <view-box class="" ref="viewBox" body-padding-top="60px" body-padding-bottom="55px">
    <group :title="title" :class="{'weui-groun_warn': title!== '联系信息'}">
      <x-input title="手机号" placeholder="请输入手机号" ref="phone" keyboard="number"  v-model="phone" is-type="china-mobile" required></x-input>
      <x-input title="验证码" class="weui-vcode" ref="code" v-model="code">
        <x-button slot="right" type="primary"  :disabled="btnDisabled" @click.native="sendCode" mini>{{ btnText }}</x-button>
      </x-input>
    </group>
    <div style="padding:15px;">
      <x-button type="primary" @click.native="submit">确认提交</x-button>
    </div>
    <div class="back">
      <a @click="goBack" >返回上一页</a>
    </div>
  </view-box>
</template>

<script>
import Vue from 'vue'
import { XInput, Group, XButton,ViewBox  } from 'vux'
import FormService from '@/service/FormService'
export default {
  data(){
    return {
      title: '联系信息',
      phone: '',
      code: '',
      btnDisabled: false,
      btnText: '发送验证码'
    }
  },
  watch: {
    phone(){
      this.title = '联系信息'
    },
    code(){
      this.title = '联系信息'
    }
  },
  methods: {
    sendCode(){
      if(this.phone === ''){
        this.title = '手机号不能为空'
        return
      }
      if(!this.$refs.phone.valid){
        this.title = '请输入正确的手机号'
        return
      }

      FormService.checkPhone({PhoneNO : this.phone}).then(data => {
        let promise = new Promise(function(resolve, reject) {
          if(data.MsgCode === '1'){
            resolve(data)
          }else {
            reject(data)
          }
        })
        return promise
      }).then(data => {
        FormService.fetchCode({PhoneNO : this.phone}).then(data => {
          console.log(data);
          if(data.MsgCode === '1'){
            this.btnDisabled = true
            let maxTime = 60
            this.btnText = '重新发送('+maxTime+')'
            setTimeout(() => {
              setBtnTxt.apply(this)
            },1000)
            function setBtnTxt() {
              if (maxTime === 1) {
                this.btnDisabled = false
                this.btnText = '发送验证码'
                return
              }
              maxTime --
              this.btnText = '重新发送('+maxTime+')'
              setTimeout(() => {
                setBtnTxt.apply(this)
              },1000)
            }
          }
        })
      },data => {
        this.title = data.Msg
      })


    },
    goBack(){
      history.back();
    },
    submit(){
      let formData = this.$store.state.formData
      if(this.phone === ''){
        this.title = '手机号不能为空'
        return
      }
      if(!this.$refs.phone.valid){
        this.title = '请输入正确的手机号'
        return
      }
      if(this.code === ''){
        this.title = '验证码不能为空'
        return
      }

      formData.PhoneNO = this.phone
      formData.Code = this.code
      FormService.submitBind(formData).then(data => {
          if(data.MsgCode === '1'){
            this.$router.push('bind-success')
          }else if(data.MsgCode === '-3'){
            this.title = '验证码有误'
          }
      })
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
.back {
  font-size: 16px;
  text-align: center;
  a {
    color: #8FC474;
    text-decoration: underline;
  }
}
</style>
