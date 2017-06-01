<template>
    <post :options="options"></post>
</template>

<script>
import Post from '@/components/Post'
import bg from './assets/1.png'
import bg2 from './assets/2.png'
import bg3 from './assets/3.png'
import ss1 from './assets/sunshine1.png'
import ss2 from './assets/sunshine2.png'
import txh from './assets/txh1-26.png'
import line from './assets/line.png'
import zi from './assets/zi.png'
import shuye from './assets/shuye.png'
import {px2rem,px2percent} from './service/utils.js'
export default {
  data: function () {
    return {
      options: {
        animateDuration:1,
        backgroundImage: bg,
        children:[
          {
            backgroundImage: bg2,
            sprites: [
              {
                type: 'image',
                src: bg3,
                width: px2rem(380),
                height: px2rem(512),
                left: px2rem(-4),
                bottom: px2rem(0),
                animateName: 'fadeIn',
              //  animationDelay: '1s'
              },
              {
                type: 'image',
                src: txh,
                width: px2rem(300),
                height: px2rem(136.8),
                left: px2rem(40),
                top: px2rem(160),
                animateName: 'tinUpIn',
                animationDelay: '1s'
              },
              {
                type: 'image',
                src: ss1,
                width: px2rem(304),
                height: px2rem(392),
                right: px2rem(0),
                top: px2rem(0),
                animateName: 'shine',
                animationDuration: '2s',
                animationDelay: '1s'
              },
              {
                type: 'image',
                src: zi,
                width: px2rem(129.5),
                height: px2rem(36.5),
                right: px2rem(75),
                top: px2rem(323),
                animateName: 'zoomInLeft',
                animationDelay: '1s'
              },
              {
                type: 'image',
                src: line,
                width: px2rem(3.5),
                height: px2rem(35),
                right: px2rem(70),
                top: px2rem(325),
                animateName: 'zoomInLeft',
                animationDelay: '1s'
              },
              {
                type: 'image',
                src: ss2,
                width: px2rem(375),
                height: px2rem(365),
                left: px2rem(0),
                top: px2rem(0),
                animateName: 'shine',
                animationDuration: '2s',
                animationDelay: '2s'
              }
              // {
              //   type: 'image',
              //   src: shuye,
              //   width: px2rem(203),
              //   height: px2rem(221),
              //   left: px2rem(50),
              //   top: px2rem(150),
              //   animateName: 'leafDown',
              //   animationDuration: '3s',
              //   animationDelay: '2s'
              // }
            ]
          },
          {
            backgroundImage: require('./assets/bg1-3.png'),
            sprites: [
              {
                type: 'image',
                src: require('./assets/2-2.png'),
                width: px2rem(162),
                height: px2rem(133),
                left: px2rem(108.5),
                top: px2rem(125),
                animateName: 'bounceInLeft',
                animationDuration: '1s',
                //animationDelay: '2s'
              },
              {
                type: 'image',
                src: require('./assets/2-1.png'),
                width: px2rem(242.5),
                height: px2rem(43.5),
                left: px2rem(73.4),
                top: px2rem(49.6),
                animateName: 'fadeIn',
                animationDuration: '1s',
                //animationDelay: '2s'
              },
              {
                type: 'text',
                text: '岁',
                fontSize: px2rem(16),
                color: '#ab8047',
                top: px2rem(59),
                left: px2rem(113),
                animateName: 'fadeIn',
                animationDuration: '1s',
                //animationDelay: '2s'
              },
              {
                type: 'text',
                text: '月',
                fontSize: px2rem(16),
                color: '#ab8047',
                top: px2rem(59),
                left: px2rem(131),
                animateName: 'fadeIn',
                animationDuration: '1s',
                animationDelay: '0.5s'
              },
              {
                type: 'text',
                text: '如',
                fontSize: px2rem(16),
                color: '#ab8047',
                top: px2rem(59),
                left: px2rem(152),
                animateName: 'fadeIn',
                animationDuration: '1s',
                animationDelay: '1s'
              },
              {
                type: 'text',
                text: '歌',
                fontSize: px2rem(16),
                color: '#ab8047',
                top: px2rem(59.5),
                left: px2rem(173),
                animateName: 'fadeIn',
                animationDuration: '1s',
                animationDelay: '1.5s'
              },
              {
                type: 'text',
                text: '情',
                fontSize: px2rem(16),
                color: '#ab8047',
                top: px2rem(59),
                left: px2rem(200),
                animateName: 'fadeIn',
                animationDuration: '1s',
                animationDelay: '2s'
              },
              {
                type: 'text',
                text: '谊',
                fontSize: px2rem(16),
                color: '#ab8047',
                top: px2rem(59),
                left: px2rem(221),
                animateName: 'fadeIn',
                animationDuration: '1s',
                animationDelay: '2.5s'
              },
              {
                type: 'text',
                text: '如',
                fontSize: px2rem(16),
                color: '#ab8047',
                top: px2rem(59),
                left: px2rem(242),
                animateName: 'fadeIn',
                animationDuration: '1s',
                animationDelay: '3s'
              },
              {
                type: 'text',
                text: '酒',
                fontSize: px2rem(16),
                color: '#ab8047',
                top: px2rem(59),
                left: px2rem(263),
                animateName: 'fadeIn',
                animationDuration: '1s',
                animationDelay: '3.5s'
              },
              {
                type: 'image',
                src: require('./assets/photo-38.png'),
                width: px2rem(217.5),
                height: px2rem(215.5),
                left: px2rem(80),
                top: px2rem(304.3),
                // animateName: 'leafDown',
                // animationDuration: '3s',
                // animationDelay: '2s'
                animateName: 'rotate2d-reverse',
                animationDuration: '6s'
              },
              {
                type: 'image',
                src: require('./assets/photo-39.png'),
                width: px2rem(201),
                height: px2rem(201),
                left: px2rem(88.25),
                top: px2rem(311.5),
                // animateName: 'leafDown',
                // animationDuration: '3s',
                // animationDelay: '2s'
              },
              {
                type: 'image',
                src: require('./assets/photo-40.png'),
                width: px2rem(201),
                height: px2rem(201),
                left: px2rem(88.25),
                top: px2rem(311.5),
                // animateName: 'leafDown',
                // animationDuration: '3s',
                // animationDelay: '2s'
              },
              {
                type: 'image',
                src: require('./assets/photo-41.png'),
                width: px2rem(201),
                height: px2rem(201),
                left: px2rem(88.25),
                top: px2rem(311.5),
                // animateName: 'leafDown',
                // animationDuration: '3s',
                // animationDelay: '2s'
              },
              {
                type: 'image',
                src: require('./assets/photo-42.png'),
                width: px2rem(201),
                height: px2rem(201),
                left: px2rem(88.25),
                top: px2rem(311.5)
              },
              {
                type: 'image',
                src: require('./assets/photo-43.png'),
                width: px2rem(201),
                height: px2rem(201),
                left: px2rem(88.25),
                top: px2rem(311.5),
                animateName: 'rotate2d',
                animationDuration: '6s',
                //animationDelay: '2s'
              },
            ]
          },
          {
            backgroundImage: require('./assets/bg1-3.png'),
            //missSwipe: true,
            sprites: [
              {
                type: 'image',
                src: require('./assets/photo-44.png'),
                width: px2rem(330.5),
                height: px2rem(188),
                left: px2rem(35),
                top: px2rem(89),
                animateName: 'slideInLeft',
                animationDuration: '1s'
              },
              {
                type: 'image',
                src: require('./assets/3-1.png'),
                width: px2rem(120),
                height: px2rem(126.5),
                left: px2rem(67),
                top: px2rem(39),
                animateName: 'slideInRight',
                animationDuration: '1s'
              },
              {
                type: 'image',
                src: require('./assets/3-2.png'),
                width: px2rem(109.5),
                height: px2rem(111.5),
                left: px2rem(73),
                top: px2rem(45),
                animateName: 'fadeInLeft',
                animationDuration: '1s'
              },
              {
                type: 'image',
                src: require('./assets/photo-46.png'),
                width: px2rem(199),
                height: px2rem(207.5),
                left: px2rem(39),
                top: px2rem(319),
                animateName: 'lightSpeedIn',
                animationDuration: '1s'
              },
              {
                type: 'image',
                src: require('./assets/photo-45.png'),
                width: px2rem(112),
                height: px2rem(114),
                left: px2rem(238),
                top: px2rem(413),
                animateName: 'jello',
                animationDuration: '1s'
              }
            ]
          },
          {
            backgroundImage: require('./assets/bg1-3.png'),
            //missSwipe: true,
            sprites: [
              {
                type: 'image',
                src: require('./assets/tlc.png'),
                width: px2rem(14),
                height: px2rem(14),
                left: px2rem(32),
                top: px2rem(58),
                animateName: 'fadeIn',
                animationDuration: '0.25s'
              },
              {
                type: 'image',
                src: require('./assets/qing.png'),
                width: px2rem(46),
                height: px2rem(49),
                left: px2rem(45),
                top: px2rem(64),
                animateName: 'fadeIn',
                animationDuration: '0.25s',
                animationDelay: '0.25s'
              },
              {
                type: 'image',
                src: require('./assets/chun.png'),
                width: px2rem(46),
                height: px2rem(49),
                left: px2rem(93),
                top: px2rem(64),
                animateName: 'fadeIn',
                animationDuration: '0.25s',
                animationDelay: '0.5s'
              },
              {
                type: 'image',
                src: require('./assets/drc.png'),
                width: px2rem(14),
                height: px2rem(14),
                left: px2rem(130),
                top: px2rem(102),
                animateName: 'fadeIn',
                animationDuration: '0.25s',
                animationDelay: '0.75s'
              },
              {
                type:'dtext',
                text: '是一场回不去的远行，一声不经意的再见谁想变成了永恒',
                width: px2rem(257),
                height: px2rem(48),
                top: px2rem(129),
                left: px2rem(33),
                fontSize: px2rem(14),
                delay: 1
              },
              {
                type: 'image',
                src: require('./assets/photo-47.png'),
                width: px2rem(238.5),
                height: px2rem(140.5),
                left: px2rem(36.7),
                top: px2rem(210),
                animateName: 'rollIn',
                animationDuration: '1s',
                animationDelay: '3s'
              },
              {
                type: 'image',
                src: require('./assets/photo-48.png'),
                width: px2rem(236.5),
                height: px2rem(140.5),
                right: px2rem(0),
                top: px2rem(385),
                animateName: 'zoomIn',
                animationDuration: '1s',
                animationDelay: '5s'
              },
            ]
          },
          {
            backgroundImage: require('./assets/bg4-6.png'),
            //missSwipe: true,
            sprites: [
              {
                type: 'image',
                src: require('./assets/mask.png'),
                width: px2rem(316),
                height: px2rem(487),
                left: px2rem(33),
                top: px2rem(65.4),
                animateName: 'fadeIn',
                animationDuration: '1s'
              },
              {
                type: 'image',
                src: require('./assets/bmtitle.png'),
                width: px2rem(111.5),
                height: px2rem(22),
                left: px2rem(135),
                top: px2rem(97),
                animateName: 'slideInDown',
                animationDuration: '1.5s',
                // animationDelay: '2s'
              }
            ]
          },
          {
            backgroundImage: require('./assets/bg4-6.png'),
            //missSwipe: true,
            sprites: [
              {
                type: 'image',
                src: require('./assets/mask.png'),
                width: px2rem(316),
                height: px2rem(487),
                left: px2rem(33),
                top: px2rem(65.4),
                animateName: 'fadeIn',
                animationDuration: '1s'
              },
              {
                type: 'image',
                src: require('./assets/4-1.png'),
                width: px2rem(282),
                height: px2rem(450),
                left: px2rem(51.5),
                top: px2rem(80.5),
                animateName: 'fadeIn',
                animationDuration: '1s',
                // animationDelay: '2s'
              },
              {
                type: 'image',
                src: require('./assets/zytitle.png'),
                width: px2rem(147),
                height: px2rem(23),
                left: px2rem(113),
                top: px2rem(97),
                animateName: 'slideInDown',
                animationDuration: '1.5s',
                // animationDelay: '2s'
              },
              {
                type: 'image',
                src: require('./assets/4-2.png'),
                width: px2rem(251),
                height: px2rem(352.5),
                left: px2rem(61.8),
                top: px2rem(152.8),
                animateName: 'rotateInDownRight',
                animationDuration: '1s',
                // animationDelay: '2s'
              }
            ]
          },
          {
            backgroundImage: require('./assets/bg4-6.png'),
            missSwipe: true,
            sprites: [
              {
                type: 'image',
                src: require('./assets/ybmtitle.png'),
                width: px2rem(143),
                height: px2rem(20),
                left: px2rem(117),
                top: px2rem(66.4),
                // animateName: 'leafDown',
                // animationDuration: '3s',
                // animationDelay: '2s'
              },
              {
                type: 'form',
                width: px2rem(288.75),
                height: px2rem(391),
                left: px2rem(40),
                top: px2rem(132),
                // animateName: 'leafDown',
                // animationDuration: '3s',
                // animationDelay: '2s'
              }
            ]
          }
        ],
        audio: {
          src: require('./assets/classmate.mp3')
        }
      }
    }
  },
  components: {
    Post
  }
}
</script>
