<template lang="html">
  <div class="post-wrapper">
    <header class="top-bar">
      <div class="marquee">
        <ul class="marquee-bar" :style="{transform: xTranslate}">
          <li v-for="person in newList">{{ person.Name }}已报名</li>
        </ul>
      </div>
    </header>
    <article class="main">
      <div class="main-top">
        <div class="title">
          <img src="../assets/7-4.png" alt="">
        </div>
      </div>
      <div class="main-body">
        <div class="real-number">
          <img src="../assets/7-7.png" alt="">
          <h5 class="number">{{ count }}</h5>
        </div>
        <div class="middle-title">
          报名时间
        </div>
        <div class="rank-list">
          <ul>
            <li v-for="rank in totalList">
              <span class="rank-title">{{ rank.AttendTime }}</span>
              <span class="rank-bar" :style="{ width: rank.barWidth }"></span>
            </li>
          </ul>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import FormService from '@/service/FormService'
import _ from 'lodash'
export default {
  data(){
    return {
      count: 0,
      newList: [],
      totalList: [],
      xTranslate: ''
    }
  },
  mounted() {
    FormService.fetchSuccessList().then(data => {
      this.count = data.Count
      this.newList = data.NewList
      let max = _.maxBy(data.TotalList,function (o) {
        return o.Count
      })
      data.TotalList.forEach(function (e) {
        e.barWidth = (e.Count / max.Count) * 2.5 + 'rem'
      })
      this.totalList = data.TotalList

      this.$nextTick(function () {
        let barWrapper = document.getElementsByClassName('marquee')[0],
            bar = document.getElementsByClassName('marquee-bar')[0],
            totalWidth = barWrapper.offsetWidth,
            barWidth = bar.offsetWidth,
            currentX = 0,
            self = this
            console.log(barWidth+'=>'+totalWidth);
            if(window.requestAnimationFrame){
              function run() {
                currentX --
                if((currentX + barWidth) < 0) currentX = totalWidth
                self.xTranslate = 'translate3d(' + currentX + 'px,0,0)'
                requestAnimationFrame(run)
              }
              requestAnimationFrame(run)
            }
      })
    })
  }
}

</script>

<style lang="css">
html {
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Noto Sans CJK SC,WenQuanYi Micro Hei,Arial,sans-serif;
}
.post-wrapper {
  background: url('../assets/bg-7.png');
  background-size: cover;
}
.top-bar {
  position: relative;
  width: 100%;
  height: .386rem;
  margin-top: .533rem;
  background: url('../assets/7-1.png');
  background-size: 100%;
}
.top-bar:before {
  position: absolute;
  left: .133rem;
  top: .0933rem;
  display: block;
  content: "";
  width: .2133rem;
  height: .22rem;
  background: url('../assets/7-2.png');
  background-size: cover;
}
.main {
  position: relative;
  margin: .466rem auto 0;
  width: 4.306rem;
  height: 6.066rem;
  background: url('../assets/7-5.png');
  background-size: 100%;
}
.main-top > .title {
  position: absolute;
  left: .733rem;
  top: -.19rem;
  display: block;
  content: "";
  width: 2.813rem;
  height: .626rem;
  background: url('../assets/7-3.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.main-top > .title > img {
  position: absolute;
  top: .1rem;
  left: .65rem;
  width: 1.473rem;
  height: .286rem;
}
.real-number {
  position: relative;
  left: 1.1rem;
  top: .776rem;
  width: 2rem;
  height: 1.89rem;
  background: url('../assets/7-6.png');
  background-size: cover;
}
.real-number > img {
  position: relative;
  left: .45rem;
  top: -.14rem;
  width: 1.2rem;
  height: .26rem;
}
.real-number .number {
  position: relative;
  left: .47rem;
  bottom: .6rem;
  display: inline-block;
  min-width: 1.17rem;
  margin: 0;
  font-size: .7rem;
  text-align: center;
}
.middle-title {
  margin-top: 1rem;
  font-size: .23rem;
  color: #ab8047;
  text-align: center;
}
.rank-list {
  padding: .5rem .3rem;
}
.rank-list li {
  margin-bottom: .1rem;
  list-style: none;
  font-size: .18rem;
  color: #9e9e9e;
}
.rank-list span {
  display: inline-block;
}
.rank-list span:last-child {
  margin-left: .08rem;
}
.rank-list .rank-title {
  width: 1.02rem;
  text-align: right;
}
.rank-list .rank-bar {
  width: 2.5rem;
  height: .25rem;
  vertical-align: middle;
  border-radius: 7px;
  box-shadow: inset -2px 0 5px #EAEAE2 ;
}
.rank-list li:nth-child(4n+1) .rank-bar {
  background: linear-gradient(to right, #C63F07, #D44C05);
}
.rank-list li:nth-child(4n+2) .rank-bar {
  background: linear-gradient(to right, #DEA61D, #FFC127);
}
.rank-list li:nth-child(4n+3) .rank-bar {
  background: linear-gradient(to right, #679D10, #82C40F);
}
.rank-list li:nth-child(4n+4) .rank-bar {
  background: linear-gradient(to right, #1583BC, #319DD3);
}
.marquee {
  position: absolute;
  top: .068rem;
  left: .47rem;
  width: 4.3rem;
  overflow: hidden;
  font-size: .19rem;
  color: #A18057;
}
.marquee ul {
  display: inline-block;
}
.marquee li{
  display: inline-block;
  margin-left: .09rem;
}
</style>
