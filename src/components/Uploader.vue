<template lang="html">
  <flexbox :gutter="8"  wrap="wrap" >
    <flexbox-item :span="1/4" v-for="(img,key) in sources" :key="key" v-height-equal-width @click.native="picClick(key)">
      <img class="uploader-img" :src="img.src" alt="">
      <span class="hf-tag-close" @click.stop="delPic(key)"><i class="fa fa-close"></i></span>
    </flexbox-item>
    <flexbox-item :span="1/4" v-height-equal-width v-if="sources.length < 5">
      <avatar @on-upload-success="onUploadSuccess" ></avatar>
    </flexbox-item>
        <!-- Root element of PhotoSwipe. Must have class pswp. -->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true" v-transfer-dom>

        <!-- Background of PhotoSwipe.
             It's a separate element as animating opacity is faster than rgba(). -->
        <div class="pswp__bg"></div>

        <!-- Slides wrapper with overflow:hidden. -->
        <div class="pswp__scroll-wrap">

            <!-- Container that holds slides.
                PhotoSwipe keeps only 3 of them in the DOM to save memory.
                Don't modify these 3 pswp__item elements, data is added later on. -->
            <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>

            <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
            <div class="pswp__ui pswp__ui--hidden">

                <div class="pswp__top-bar">

                    <!--  Controls are self-explanatory. Order can be changed. -->

                    <div class="pswp__counter"></div>

                    <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

                    <button class="pswp__button pswp__button--share" title="Share"></button>

                    <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                    <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                    <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                    <!-- element will get class pswp__preloader--active when preloader is running -->
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                          <div class="pswp__preloader__cut">
                            <div class="pswp__preloader__donut"></div>
                          </div>
                        </div>
                    </div>
                </div>

                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"></div>
                </div>

                <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                </button>

                <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                </button>

                <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                </div>

            </div>

        </div>

    </div>
  </flexbox>
</template>

<script>
import Avatar from './Avatar'
import './height-equal-width'
import { Flexbox, FlexboxItem, XDialog, TransferDomDirective as TransferDom } from 'vux'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'

export default {
  mounted(){
  },
  data(){
    return {
      sources: [],
    }
  },
  computed: {
  },
  watch: {
    sources (newV) {
      this.$emit('input',newV)
    }
  },
  methods: {
    onUploadSuccess(img){
      this.sources.push(img)
    },
    picClick(key){
      var self = this
      var items = [], pswpElement = document.querySelectorAll('.pswp')[0];
      for(var i = 0;i < self.sources.length; i++ ){
        items.push({
          src: self.sources[i].src,
          w: self.sources[i].width,
          h: self.sources[i].height
        })
      }

      var options = {
        index: key,
        shareEl: false
      }

      var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();


    },
    delPic(key){
      this.sources.splice(key,1)
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Flexbox,
    FlexboxItem,
    Avatar,
    XDialog
  }
}
</script>

<style lang="less" scoped>
@import "../../node_modules/photoswipe/dist/photoswipe.css";
@import "../../node_modules/photoswipe/dist/default-skin/default-skin.css";
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
  position: relative;
  margin-bottom: 5px;
}
</style>
