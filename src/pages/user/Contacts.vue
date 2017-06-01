<template lang="html">
  <div class="">
    <x-header title="提醒谁看" :left-options="leftOptions">
      <span slot="overwrite-left" style="color: #fff;" @click="cancel">取消</span>
      <span slot="right" style="color: #fff;" @click="confirm">确定</span>
    </x-header>
    <group class="topbar">
      <flexbox style="box-sizing: border-box;">
        <div :style="imgWrapperStyle" class="imgWrapper">
          <img class="contact-avatar" @click="delPic(i)" :src="o.Photo?o.Photo:plchdImg" alt="" v-for="(o,i) in selected" :key="i" />
        </div>
        <flexbox-item grow="1">
          <x-input v-model="keywords" placeholder="搜索" ></x-input>
        </flexbox-item>
      </flexbox>
    </group>
    <scroller lock-x scrollbar-y height="-92" use-origin-scroll style="overflow: auto;">
      <div class="">
        <accordion v-for="(v1,k1) in list" :title="v1.class" :key="k1">
            <template v-for="(v2,k2) in v1.students">
              <div class="weui-cells__title">{{v2.letter}}</div>
              <template v-for="(one, index) in v2.data">
                <div class="weui-cells weui-cells_checkbox">
                  <label class="weui-cell weui-check_label">
                    <div class="weui-cell__hd">
                      <input type="checkbox" class="weui-check" :value="one" v-model="selected" :disabled="ifDisable(one)" @change="checkChange($event,one)">
                      <i class="weui-icon-checked vux-checklist-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd" :class="{'has-phone':one.phone}">
                      <img class="contact-avatar" :src="one.Photo?one.Photo:plchdImg" />
                      <div class="contact-name" :class="{binded: ifBinded(one)}" style="display:inline-block;">
                        <p>{{one.Name}}({{one.StudentNO}})</p>
                        <span v-if="one.phone">{{ one.phone }}</span>
                      </div>
                    </div>
                  </label>
                </div>
                <transition name="phone">
                  <div class="vux-x-input weui-cell phone-cell" v-if="one.needPhone">
                     <div class="weui-cell__bd weui-cell__primary">
                        <input @keyup.enter="enterPhone(one)" v-model="phone" placeholder="您可以输入该同学的手机号通知他" type="text" class="weui-input phone">
                      </div>
                      <div class="weui-cell__ft">
                      </div>
                  </div>
                </transition>
              </template>
            </template>
        </accordion>
      </div>
    </scroller>
  </div>
</template>

<script>
import Accordion from '../../components/Accordion'
import { XHeader, Group, Cell, XInput, Scroller, Flexbox, FlexboxItem } from 'vux'
import  Checklist  from 'vux/src/components/checklist/check.vue'
import _ from 'lodash'
import { matches, getParents } from '../../service/utils'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    students: Object,
    select: Array
  },
  data () {
    return {
      leftOptions: {
        preventGoBack: true
      },
      plchdImg: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
      selected: [],
      imgWrapperStyle: {
        width: ''
      },
      keywords: '',
      phone: '',
      filtedStudents: {}
    }
  },
  computed: {
    list () {
      let list = [],
          students = this.filtedStudents,
          self = this,
          cpFn = function (p1,p2) {
            return p1.localeCompare(p2)
          },
          keys = Object.keys(this.students).sort(cpFn),
          classList = {}
      for(let i = 0;i < keys.length; i++){
        students[keys[i]].forEach((element) => {
          if(!classList[element.ClassName]) {
            classList[element.ClassName] = {}
          }
          if(!classList[element.ClassName][keys[i]]) {
            classList[element.ClassName][keys[i]] = []
          }
          classList[element.ClassName][keys[i]].push(element)
        });
      }
      let classKeys = Object.keys(classList).sort(cpFn)
      for(let i=0;i < classKeys.length; i++){
        let lkeys = Object.keys(classList[classKeys[i]]).sort(cpFn), stus = []
        for(let j=0; j< lkeys.length; j++ ){
          var data = classList[classKeys[i]][lkeys[j]]
          stus.push({
            letter: lkeys[j],
            data: data
          })
        }
        list.push({
          class: classKeys[i],
          students: stus
        })
      }
      return list
    }
  },
  watch: {
    students (newV) {
      this.filtedStudents = newV
    },
    select (newV) {

      this.selected = newV
    },
    selected (newV,oldV) {
      if(newV.length<oldV.length){
        delete oldV[oldV.length-1]['phone']
        this.phone = ''
      }
      let length = newV.length * 46 > 276 ? 276 : newV.length * 46
      this.imgWrapperStyle.width = length +　'px'
    },
    keywords (newV,oldV) {
      let vm = this
      if(newV !== oldV){
        let search = _.debounce(function () {
          let filtedStudents = {}
          for(let k in vm.students){
            filtedStudents[k] = _.filter(vm.students[k],function (o) {
              return o.Name.indexOf(newV) !== -1
            })
          }
          vm.filtedStudents = filtedStudents
        },1000)

        search()
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      this.$emit('confirm',this.selected)
    },
    ifDisable (o) {
      let has = _.some(this.selected, {StudentNO: o.StudentNO})
      if(!has && this.selected.length === 10)
        return true
      return false
    },
    delPic (i) {
      if('phone' in this.selected[i]){
        delete this.selected[i]['phone']
      }
      this.selected.splice(i, 1)
    },
    ifBinded (o) {
      return o.IsAuthenticate === 'TRUE'
    },
    checkChange (e,o) {
      if(e.target.checked && o.IsAuthenticate === 'TRUE'){
          o.needPhone = true
          this.$forceUpdate()
          this.$nextTick(() => {
            let dom = getParents.call(e.target,'weui-cells_checkbox'), pcDom = dom.nextSibling
            console.log(pcDom.nodeType)
            while((pcDom.nodeType !== 1) || !matches.call(pcDom,'.vux-x-input')){
              pcDom = pcDom.nextSibling
            }
            pcDom.querySelector('.weui-input.phone').focus()
          })


      }else {
        o.needPhone = false
      }
      this.$forceUpdate()
    },
    enterPhone(one) {
      one.phone = this.phone
      one.needPhone = false
      this.$forceUpdate()
      this.phone = ''
    }
  },
  components: {
    XHeader,
    Group,
    Cell,
    Checklist,
    XInput,
    Scroller,
    Flexbox,
    FlexboxItem,
    Accordion,
  }
}

</script>

<style lang="less">
.imgWrapper {
  height: 36px;
  padding-left: 10px;
  overflow-x: scroll;
  white-space: nowrap;
}
.topbar .weui-cells{
  margin-top: 0;
}
.contact-avatar {
  margin-right: 10px;
  width: 36px;
  height: 36px;
  vertical-align: middle;

  .has-phone > & {
    vertical-align: baseline;
  }
}
.contact-name.binded {
  color: #bdbdbd;
}
.phone-cell {
  background-color: #6d6d6d;
}
.weui-input.phone {
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  &::placeholder {
    color: #eee;
    font-size: 13px;
  }
}
.phone-enter, .phone-leave-active {
  transform: translateX(-100%);
  opacity: 0;
}
.phone-enter-active, .phone-leave-active {
  transition: all 1s ease;
}
</style>
