<template lang="html">
    <div class="weui-uploader__input-box">
      <div class="weui-uploader__file_status" v-if="uploading">
        <div class="weui-uploader__file-content">50%</div>
      </div>
      <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" @change="change">
    </div>
</template>

<script>
export default {
  props:{
    src: String,
    uploadUrl: String
  },
  data(){
    return {
      uploading: false
    }
  },
  methods: {
    change(e){
      const file = e.target.files[0],fs = new FileReader()
      fs.onload = (e) => {
        var img = new Image(), self = this
        img.src = e.target.result
        img.onload = function () {
          self.$emit('on-upload-success',{
            file: file,
            src: e.target.result,
            width: img.width,
            height: img.height
          })
        }
      }
      fs.readAsDataURL(file)
      // if(file && this.uploadUrl){
      //   this.$http.post(this.uploadUrl,{
      //     file: file
      //   },{
      //     progress: function(e){
      //       if(!e.lengthComputable){
      //         console.log(e.loaded)
      //       }
      //     }
      //   }).then(function(){
      //
      //   },function(res){
      //     console.log(res);
      //   })
      // }
    }
  }
}
</script>

<style lang="css">
.weui-uploader__input-box {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #D9D9D9;
}
.weui-uploader__input {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.weui-uploader__input-box:before, .weui-uploader__input-box:after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #D9D9D9;
}
.weui-uploader__input-box:before {
    width: 2px;
    height: 39.5px;
}
.weui-uploader__input-box:after {
    width: 39.5px;
    height: 2px;
}
.weui-uploader__input-box:active {
    border-color: #999999;
}
.weui-uploader__file_status:before {
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
}
.weui-uploader__file-content {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #FFFFFF;
    z-index: 11;
}
</style>
