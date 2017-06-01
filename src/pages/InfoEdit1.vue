<template lang="">
  <view-box class="" ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
    <group :title="'上传图片'">
      <cell-box>
        <uploader v-model="files"></uploader>
      </cell-box>
    </group>
    <group title="标签">
      <cell-box>
        <tag-group :items="items"></tag-group>
      </cell-box>
    </group>
    <group title="相关同学">
      <!-- <cell-box>
        <radio v-model="value" radioValue="1" :name="name" id="r1">所有人</radio>
        <radio v-model="value" radioValue="2" :name="name" id="r2">
          <auto-complete title="姓名" placeholder="请输入姓名" ></auto-complete>
        </radio>
      </cell-box> -->

      <radio :options="choose" v-model="choosed" ></radio>
    </group>
    <group v-if="choosed === 'CLASS'" title="按班级">
      <popup-picker title="班级" :data="list1" v-model="value1" placeholder="某个班级"></popup-picker>
    </group>
    <group v-if="choosed === 'STUDENT'" title="按同学">
      <auto-complete title="姓名" placeholder="请输入姓名" v-model="peopleName" :suggestions="suggestions" @onSelect="select"></auto-complete>
    </group>
    <group :title="desTitle" :class="{'weui-groun_warn': desTitle!== '描述'}">
       <x-textarea :max="200" placeholder="请输入" v-model="description"></x-textarea>
    </group>
    <box gap="20px">
        <x-button type="primary" @click.native="goNext">提交</x-button>
    </box>
    <divider>我是有底线的</divider>
    <div v-transfer-dom>
      <confirm v-model="show"
      title="提示">
        <p style="text-align:center;margin-bottom: 10px;">您选择的用户暂未绑定，你可以填写他的手机号通知他</p>
        <input type="text" name="" value="" class="weui-input dialog-input">
      </confirm>
    </div>
  </view-box>
</template>

<script>
import Uploader from '@/components/Uploader'
import TagGroup from '@/components/TagGroup'
import AutoComplete from '@/components/AutoComplete'
import UploadService from '@/service/UploadService'
import { XInput, Radio, Group, XButton,ViewBox,CellBox,Cell,Blur,Divider,PopupPicker,XTextarea,Box,Confirm,TransferDom  } from 'vux'
export default {
  data(){
    return {
      items: [

      ],
      choose: [
        {key: 'ALL', value: '所有人'},
        {key: 'CLASS', value: '按班级'},
        {key: 'STUDENT', value: '按同学'}
      ],
      choosed: 'ALL',
      list1: [['B013004','B013004','B013004']],
      value1: [],
      suggestions: [],
      peopleName: '',
      show: false,
      files: [],
      description: '',
      desTitle: '描述'
    }
  },
  watch: {
    peopleName(){
      if (this.peopleName.length >= 2){
        // FormService.fetchName({Name: this.name}).then(data => {
        //   this.suggestions = data
        // })
        this.suggestions = [{Name:'111',StudentNO:'B1234567',Flag:1},{Name:'222',StudentNO:'B1234567',Flag:0},{Name:'333',StudentNO:'B1234567',Flag:1}]
      }else {
        this.suggestions = []
      }
    },
    description (newV) {
      if(newV !== ''){
        this.desTitle = '描述'
      }
    }
  },
  methods: {
    select(suggestion){
      if(suggestion.Flag === 1){
        this.show = true
      }else {
        this.peopleName = suggestion.Name
        this.suggestions = []
      }
    },
    goNext () {
      if(this.description === ''){
        this.desTitle = '请输入描述'
        return
      }

      let fd = new FormData()
      this.files.forEach(function (item) {
        fd.append('files',item.file)
      })
      this.items.forEach(function (item) {
        fd.append('Tabs',item.name)
      })
      fd.append('Description',this.description)
      fd.append('Type',this.choosed)
      this.$vux.loading.show({
       text: '上传中...'
      })

      UploadService.upload(fd).then(res => {
        this.$vux.loading.hide()
      })
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Radio,
    XInput,
    XButton,
    Group,
    ViewBox,
    CellBox,
    Cell,
    Blur,
    Uploader,
    Divider,
    TagGroup,
    PopupPicker,
    AutoComplete,
    XTextarea,
    Box,
    Confirm
  }
}
</script>

<style lang="less">
.center {
  text-align: center;
  padding-top: 20px;
  color: #fff;
  font-size: 18px;
}
.center img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ececec;
}
.autocomplete li.binded {
  color: #cccccc;
}
.vux-x-dialog .dialog-input {
  width: 150px;
  border-bottom: 1px solid #ccc;
  text-align: center;
}
</style>
