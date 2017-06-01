<template lang="html">
  <flexbox :gutter="8"  wrap="wrap" >
    <flexbox-item :span="1/4" v-for="(src,key) in sources" :key="src" v-height-equal-width @click.native="picClick(key)">
      <img class="uploader-img" :src="src" alt="">
    </flexbox-item>
    <flexbox-item :span="1/4" v-height-equal-width v-if="sources.length < 5">
      <avatar @on-upload-success="onUploadSuccess" ></avatar>
    </flexbox-item>
    <div v-transfer-dom>
      <x-dialog v-model="showDialog" class="img-preview" >
        <div class="img-box" v-if="currentPic !== -1">
          <img :src="bigPicSrc" :style="imgStyle"  >
        </div>
        <div  class="dialog-footer">
          <span class="img-del" @click="delPci"><i class="fa fa-trash-o"></i></span>
        </div>
        <div class="img-close" @click="bigPicSrc = ''">
          <i class="fa fa-times-circle-o"></i>
        </div>
      </x-dialog>
    </div>
  </flexbox>
</template>

<script>
import Avatar from './Avatar'
import './height-equal-width'
import touch from 'touchjs'
import { PicScalableDirective as PicScalable } from './pic-scalable'
import { Flexbox, FlexboxItem, XDialog, TransferDomDirective as TransferDom } from 'vux'
const status = {
  enlarged: false,
  tinyStyle: {
    maxWidth: '100%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  },
  largeStyle: {
    maxWidth: 'none',
    top: '0',
    left: '0',
    transform: 'none'
  }
}
function tapHandler(){
  this.bigPicSrc = ''
}
function doubleTapHandler(){
  if(status.enlarged){
    this.imgStyle = status.tinyStyle
  }else {
    this.imgStyle = status.largeStyle
  }
  status.enlarged = !status.enlarged
  this.$forceUpdate()
  //this.enlarge = !this.enlarge
}
export default {
  mounted(){
    touch.on(document, 'tap', '.img-box img', tapHandler.bind(this))
    touch.on(document, 'doubletap', '.img-box img', doubleTapHandler.bind(this))
  },
  data(){
    return {
      sources: [],
      enlarge: false,
      imgStyle: status.tinyStyle,
      currentPic: -1,
      bigPicSrc: ''
    }
  },
  computed: {
    showDialog(){
      return this.bigPicSrc !== ''
    }
  },
  methods: {
    onUploadSuccess(src){
      this.sources.push(src)
    },
    picClick(key){
      this.currentPic = key
      this.bigPicSrc = this.sources[key]
    },
    delPci(){
      this.bigPicSrc = ''
      this.$nextTick(() => {
        this.sources.splice(this.currentPic,1)
      })
    }
  },
  directives: {
    TransferDom,
    PicScalable
  },
  components: {
    Flexbox,
    FlexboxItem,
    Avatar,
    XDialog
  }
}
</script>

<style lang="less">
.img-preview {
  .weui-dialog{
    width: 100%;
    height: 100%;
    border-radius: 0 !important;
    padding-bottom: 0;
    background: none;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    position: relative;
    height: 100%;
    overflow: auto;

    img {
      position: absolute;
      max-width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    img.enlarge {
      max-width: none;
      top: 0;
      left: 0;
      transform: none;
    }
  }
  .img-del {
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 35px;
    color: #fff;
  }
  .img-close {
    position: absolute;
    top: -5px;
    right: 10px;
    font-size: 25px;
    font-weight: thin;
    color: #fff;
  }
  .dialog-footer {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}
.uploader-img {
  width: 100%;
  height: 100%;
}
.vux-flexbox-item {
  margin-bottom: 5px;
}
</style>
