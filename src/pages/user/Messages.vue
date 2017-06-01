<template lang="html">
  <div>
    <scroller lock-x scrollbar-y use-pulldown ref="scroller"
    :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}"
    height="-56"
    @on-pulldown-loading="load2"
    v-model="status1">
      <div class="">
        <card :header="header">
          <div slot="header" class="header">
            <img class="avatar" src="https://o5omsejde.qnssl.com/demo/test2.jpg"></img>
            <span class="name">姓名</span>
          </div>
          <div slot="content" class="content">
            我可以发朋友圈啦
            <flexbox :gutter="8"  wrap="wrap" class="img-container">
              <flexbox-item  :span="1/3" class="item" v-for="(img, index) in imgs" :key="img">
                <img class="img" :src="img.src" @click="picClick($event,index)"></img>
              </flexbox-item>
            </flexbox>
          </div>
          <div class="card-footer" slot="footer">
            <ul class="tags">
              <li class="hf-tag-item tag-primary">第一个</li>
              <li class="hf-tag-item tag-success">第二个</li>
              <li class="hf-tag-item tag-danger">第三个</li>
              <li class="hf-tag-item tag-purple">第四个</li>
            </ul>
            <div class="comments" v-show="comments.length!==0">
              <div v-for="c in comments">
                <span class="name">{{ c.by }}</span>：{{ c.msg }}
              </div>
            </div>
            <div class="action">
              <span class="love" @click="loved = !loved"><i class="fa" :class="['fa-heart'+(loved?'':'-o')]"></i>赞</span>
              <span class="comment" @click="comment"><i class="fa fa-commenting"></i>评论</span>
            </div>
          </div>
        </card>
      </div>
    </scroller>
    <div class="input-container" v-show="commenting">
      <input id="comment-input" class="input" v-model="commentText" @blur="inputBlur">
      <button id="comment-btn" class="weui-btn weui-btn_default" type="button" @click.stop="sendComment">发送</button>
    </div>
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
  </div>
</template>

<script>
// @blur="commenting = false;commentText=''"
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'
import { Divider, Card, XImg, ViewBox, XHeader, Scroller, Flexbox, FlexboxItem, TransferDom } from 'vux'
import { matches, getParents } from '../../service/utils'
export default {
  data(){
    return {
      header: {

      },
      status1: {
        pulldownStatus: 'default'
      },
      commenting: false,
      commentText: '',
      loved: false,
      comments: [],
      imgs: [
        {
          src: 'https://o5omsejde.qnssl.com/demo/test2.jpg'
        },
        {
          src: 'https://o5omsejde.qnssl.com/demo/test2.jpg'
        },
        {
          src: 'https://o5omsejde.qnssl.com/demo/test2.jpg'
        },
        {
          src: 'https://o5omsejde.qnssl.com/demo/test2.jpg'
        },
        {
          src: 'https://o5omsejde.qnssl.com/demo/test2.jpg'
        },
        {
          src: 'https://o5omsejde.qnssl.com/demo/test2.jpg'
        },
        {
          src: 'https://o5omsejde.qnssl.com/demo/test2.jpg'
        },
        {
          src: 'https://o5omsejde.qnssl.com/demo/test2.jpg'
        },
        {
          src: 'https://o5omsejde.qnssl.com/demo/test2.jpg'
        }
      ]
    }
  },
  watch: {
    commentText (newV) {
      console.log(newV);
    }
  },
  methods: {
    load2 () {
      setTimeout(() => {
        this.status1.pulldownStatus = 'default'
      }, 2000)
    },
    comment () {
      this.commenting = true
      this.$nextTick(() => {
        let input = document.getElementById('comment-input')
        input.focus()
      })
    },
    sendComment () {
      console.log(this.commentText);
      this.comments.push({
        by: '老大',
        msg: this.commentText
      })
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
      this.commenting = false
      this.commentText = ''
    },
    inputBlur (e) {
      if(e.relatedTarget === document.getElementById('comment-btn')){
        return
      }
      this.commenting = false
      this.commentText = ''
    },
    newMoment () {
      this.$router.push({name: 'new'})
    },
    picClick (event, key) {
      let container = getParents.call(event.target,'.img-container'),
          imgs = container.querySelectorAll('.img'),
          items = [], pswpElement = document.querySelectorAll('.pswp')[0]

      for(let i = 0, j = imgs.length; i < j; i++) {
        items.push({
          src: imgs[i].src,
          w: imgs[i].naturalWidth,
          h: imgs[i].naturalHeight
        })
      }

      var options = {
        index: key,
        shareEl: false
      }

      var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();

    }
  },
  mounted () {
    this.$store.commit('updateTitle','朋友圈')
    this.$store.commit('updateAction',{
      show: true,
      icon:'plus',
      handler: this.newMoment
    })
  },
  directives: {
    TransferDom
  },
  components: {
    Divider,
    Card,
    XImg,
    ViewBox,
    XHeader,
    Scroller,
    Flexbox,
    FlexboxItem
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
.header {
  padding: 10px 15px 0;
  font-size: 15px;
}
.avatar {
  width: 24px;
  height: 24px;
  border: 1px #eee solid;
  border-radius: 100%;
  vertical-align: top;
}
.name {

}
.content {
  padding: 5px 15px;
}

.card-footer {
  position: relative;
  padding: 10px 0;

  &:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #E5E5E5;
    color: #E5E5E5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
  }
}

.tags {
  padding: 0 15px;
  list-style: none;
  font-size: 0;
  .hf-tag-item {
    padding: 5px;
    font-size: 10px;
  }
}
.comments {
  position: relative;
  margin: 10px 15px 10px 10px;
  padding: 0 5px;
  background-color: #e0e0e0;
  font-size: 14px;

  &:before {
    position: absolute;
    left: 10px;
    top: -8px;
    display: block;
    content: '';
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 8px solid #e0e0e0;
  }

  .name {
    color: #03a9f4;
  }
}

.action {
  padding: 0 15px;
  font-size: 12px;

  .fa {
    margin-right: 5px;
  }

  .love {
    color: #f06292;
  }
  .comment {
    position: relative;
    float: right;
    bottom: 1px;
    color: #7986cb;
  }
}
.input-container {
  position: fixed;
  display: flex;
  width: 100%;
  padding: 10px 10px;
  background-color: #efefef;
  bottom: 20px;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;

  .input {
    flex: 1;
    height: 34px;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    color: #555;
    background-color: #fff;
    background-image: none;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-sizing: border-box;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;

    &:focus {
      border-color: #66afe9;
      outline: none;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
    }
  }

  .weui-btn {
    margin-left: 5px;
    width: 60px;
    font-size: 10px;
  }
}
.img-container .item {
  max-width: 150px;
  max-height: 100px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
  }
}
.vux-flexbox-item {
  margin-bottom: 5px;
}
</style>
