<template>
    <router-view :options="options"></router-view>
</template>

<script>
import bg from './assets/bg.png'
import leftTop from './assets/left-top.jpg'
import rightTop from './assets/right-top.jpg'
import leftBottom from './assets/left-bottom.jpg'
import rightBottom from './assets/right-bottom.jpg'
import HexBg from './assets/lingxing.jpg'
import pic2017 from './assets/2017.jpg'
import yaoQing from './assets/yaoqing.jpg'
export default {
  name: 'app',
  data: function () {
    return {
      options: {
        animateDuration:1,
        backgroundImage: bg,
        children:[
          {
            //backgroundColor: '#3f3',
            sprites: [
              {
                type: 'image',
                src: leftTop,
                width: '372px',
                height: '209px',
                left: '-30px',
                top: '-20px',
                animateName: 'bounceInLeft',
                animationDelay: '0s'
              },
              {
                type: 'image',
                src: rightTop,
                width: '224px',
                height: '159px',
                right: '-60px',
                top: '-30px',
                animateName: 'bounceInRight',
                animationDelay: '0s'
              },
              {
                type: 'image',
                src: leftBottom,
                width: '190px',
                height: '143px',
                left: '-22px',
                bottom: '-23px',
                animateName: 'bounceInLeft',
                animationDelay: '0s'
              },
              {
                type: 'image',
                src: rightBottom,
                width: '259px',
                height: '147px',
                right: '-21px',
                bottom: '-21px',
                animateName: 'bounceInRight',
                animationDelay: '0s'
              },
              {
                type: 'image',
                src: HexBg,
                width: '600px',
                height: '488px',
                top: '100px',
                left: '-120px',
                animateName: 'bounceIn',
                animationDelay: '1s'
              },
              {
                type: 'image',
                src: pic2017,
                width: '75px',
                height: '26px',
                top: '205px',
                left: '39px',
                animateName: 'twisterInUp',
                animationDelay: '1s'
              },
              {
                type: 'image',
                src: yaoQing,
                width: '243px',
                height: '156px',
                top: '283px',
                left: '78px',
                animateName: 'tinUpIn',
                animationDelay: '1s'
              },
              {
                type: 'text',
                text: '南京邮电大学',
                width: '154px',
                height: '38px',
                top: '200px',
                left: '160px',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#fff',
                animateName: 'zoomInLeft',
                animationDelay: '1s'
              }
            ]
          },
          {
            //backgroundColor: 'rgb(226, 3, 176)',
            sprites: [
              {
                type: 'image',
                src: leftTop,
                width: '372px',
                height: '209px',
                left: '-30px',
                top: '-20px',
                animateName: 'slideInLeft',
                animationDelay: '0s'
              },
              {
                type: 'image',
                src: rightTop,
                width: '224px',
                height: '159px',
                right: '-60px',
                top: '-30px',
                animateName: 'slideInRight',
                animationDelay: '0s'
              },
              {
                type: 'image',
                src: leftBottom,
                width: '190px',
                height: '143px',
                left: '-22px',
                bottom: '-23px',
                animateName: 'slideInLeft',
                animationDelay: '0s'
              },
              {
                type: 'image',
                src: rightBottom,
                width: '259px',
                height: '147px',
                right: '-21px',
                bottom: '-21px',
                animateName: 'slideInRight',
                animationDelay: '0s'
              },
              {
                type: 'image',
                src: HexBg,
                width: '600px',
                height: '488px',
                top: '100px',
                left: '-120px',
                animateName: 'bounceIn',
                animationDelay: '1s'
              },
            ]
          },
          {
            //backgroundColor: 'red',
            missSwipe: true,
            sprites: [

            ]
          }
        ],
        audio: {
          src: require('./assets/classmate.mp3')
        }
      }
    }
  }
}
</script>

<style>

</style>
