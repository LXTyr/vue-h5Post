<template lang="html">

  <view-box class="" ref="viewBox" body-padding-top="60px" body-padding-bottom="55px">
    <group :title="title" :class="{'weui-groun_warn': title!== '基本信息'}">
      <auto-complete title="姓名" placeholder="请输入姓名" ref="name" v-model="name" :suggestions="suggestions" @onSelect="select" @on-change="nameChanged"  required></auto-complete>
    </group>
    <group>
      <x-input title="班级" placeholder="选择姓名后自动填入"  v-model="cls"   :readonly="true" ></x-input>
    </group>
    <group>
      <x-input title="学号" placeholder="选择姓名后自动填入"  v-model="no"   :readonly="true" ></x-input>
    </group>
    <group>
      <x-input title="身份证后4位" placeholder="请输入身份证后4位" :max="4"  v-model="id" required></x-input>
    </group>
    <div style="padding:15px;">
      <x-button type="primary" @click.native="goNext">下一步</x-button>
    </div>
  </view-box>

</template>

<script>
import { XInput, Group, XButton,ViewBox  } from 'vux'
import Vue from 'vue'
import AutoComplete from '@/components/AutoComplete'
import FormService from '@/service/FormService'
export default {
  data(){
    return {
      title: '基本信息',
      name: '',
      cls: '',
      no: '',
      id: '',
      suggestions: [],
      direction: this.$store.direction
    }
  },
  computed: {

  },
  watch: {
    name: function () {
      if (this.name.length >= 2){
        FormService.fetchName({Name: this.name}).then(data => {
          this.suggestions = data
        })
      }else {
        this.suggestions = []
        this.cls = ''
        this.no = ''
      }
    },
    id(){
      if(this.id === ''){
        this.title = '身份证后4位不能为空'
      }else {
        this.title = '基本信息'
      }
    }
  },
  methods: {
    nameChanged(newVal){
      if(newVal === ''){
        this.title= '姓名不能为空'
      }else {
        this.title= '基本信息'
      }
    },
    select(suggestion){
      this.name = suggestion.Name
      this.cls = suggestion.ClassName
      this.no = suggestion.StudentNO
      if(suggestion.Flag === 1){
        this.title = '账户已被绑定，请联系管理员'
      }
      this.suggestions = []
    },
    sendCode(){
      if(this.cls == '' && this.name !== '') {
        this.title = '未匹配到'
        return
      }
      if(!this.errors.phone.valid || !this.errors.name.valid) {
        this.title2 = this.errors.phone.msg
        return
      }
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
    },
    goNext(){
      if(this.name == '' ) {
        this.title = '姓名不能为空'
        return
      }
      if(this.cls == '') {
        this.title = '请先匹配后再进入下一步'
        return
      }
      if(this.title == '账户已被绑定，请联系管理员') {
        return
      }
      if(this.id === ''){
        this.title = '身份证后4位不能为空'
        return
      }

      FormService.checkUser({
        Name: this.name,
        StudentNO: this.no,
        CardID: this.id
      }).then(data => {
        let promise = new Promise(function(resolve,reject){
          console.log(data)
          if (data.Data === 1){
            resolve(data)
          }else {
            reject()
          }
        })
        return promise
      }).then(() => {
        this.$store.commit('appendFormData',{
            Name: this.name,
            ClassID: this.cls,
            StudentNO: this.no
        })
        this.$router.push('bind2')
      },() => {
        this.title = '身份证后4位有误'
      })
    }
  },
  components: {
    XInput,
    Group,
    XButton,
    ViewBox,
    AutoComplete
  }
}

</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
body {
  background: url('../assets/bg8.jpg');
  background-size: cover;
}
.weui-groun_warn .weui-cells__title {
  color: #E64340;
}
.weui-btn_mini {
  font-size: 16px !important;
}
.vux-x-dialog {
  font-size: 16px;
}
.weui-dialog {
  max-width: 1000px !important;
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
.weui-dialog {
  border-radius: 10px !important;
}
</style>
