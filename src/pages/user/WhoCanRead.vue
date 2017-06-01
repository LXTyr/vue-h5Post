<template lang="html">
  <div >
    <group class="weui-cells_radio">
      <custom-radio :name="name" title="所有人" v-model="value" v="ALL"></custom-radio>
      <custom-radio :name="name" title="班级" v-model="value" v="CLASS"></custom-radio>
      <cell-box v-if="value === 'CLASS'" class="sub-item">
        <checker v-model="selClass" type="checkbox" default-item-class="class-check" selected-item-class="class-check-selected">
          <checker-item :value="item" v-for="(item, index) in classes" :key="index">{{item}}</checker-item>
        </checker>
      </cell-box>
      <custom-radio :name="name" title="仅自己" v-model="value" v="PRIVATE"></custom-radio>
      <custom-radio :name="name" title="白名单" v="WHITE" v-model="value" arrow></custom-radio>
      <cell-box v-if="value === 'WHITE' && selected.length!==0" class="sub-item">
        <p class="sub-title">所选的联系人</p>
        <p class="sub-bd"><i class="fa fa-check-circle"></i><span class="sub-bd-name">{{ selected | getName }}</span></p>
      </cell-box>
      <custom-radio :name="name" title="黑名单" v="BLACK" v-model="value" arrow></custom-radio>
      <cell-box v-if="value === 'BLACK' && selected.length!==0" class="sub-item">
        <p class="sub-title">所选的联系人</p>
        <p class="sub-bd"><i class="fa fa-check-circle"></i><span class="sub-bd-name">{{ selected | getName }}</span></p>
      </cell-box>
    </group>
    <popup v-model="show" height="100%">
      <contacts @cancel="cancel" @confirm="confirm" v-model="show" :students="students" :select="selected"></contacts>
    </popup>
  </div>
</template>

<script>
import { Group, Radio, Popup, CellBox, Checker, CheckerItem } from 'vux'
import Contacts from './Contacts'
import { getName } from './filters'
import { pySort } from '@/service/utils'
import CustomRadio from '../../components/CustomRadio'
export default {
  props: {

  },
  filters: {
    getName
  },
  data () {
    return {
      name: 'radio',
      value: 'ALL',
      show: false,
      selected: [],
      selClass: [],
      classes: [],
      students: {}
    }
  },
  methods: {
    cancel () {
      this.show = false
    },
    confirm (selected) {
      this.show = false
      if(selected){
        this.selected = selected
      }
    }
  },
  watch: {
    value (newV,oldV) {
      if(newV === 'WHITE' || newV === 'BLACK'){
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  },
  components: {
    Group,
    Radio,
    Popup,
    Contacts,
    CustomRadio,
    CellBox,
    Checker,
    CheckerItem
  },
  created () {
    this.$store.commit('updateTitle','谁可以看')
    this.$store.commit('updateAction',{})

    let share = this.$store.state.shareto
    if(share.check) {
      this.$nextTick(() => {
        this.value = share.check
        this.selected = share.selected
        this.selClass = share.selClass
        this.students = share.students
        this.classes = share.classes
      })

    }else {
      this.$http.get('http://222.45.42.120:9083/collegereunion/moment/getStudentList').then(res => {
        let classes = {}
        res.data.Data.forEach(function (e) {
          if(!classes[e.ClassName]){
            classes[e.ClassName] = true
          }
        })
        this.classes = Object.keys(classes).sort(function (p1,p2) {
          return p1.localeCompare(p2)
        })

        let sorted = pySort(res.data.Data,'Name')
        this.students = sorted
      })
    }




  },
  beforeRouteLeave (to, from, next) {
    let share = {
      check: this.value,
      selected: this.selected,
      selClass: this.selClass,
      students: this.students,
      classes: this.classes
    }
    this.$store.commit('updateShare',share)
    next()
  }
}
</script>

<style lang="less">
.weui-cells_radio .sub-item {
  padding-left: 80px;

  & + .weui-cell_radio:before {
    left: 40px;
  }
}
.sub-title {
  margin-bottom: 5px;
  color: #7b1fa2;
}
.sub-bd {
  font-size: 12px;
  color: #00e676;
  .sub-bd-name {
    margin-left: 5px;
  }
}
.class-check {
  padding: 5px 15px;
  margin: 3px;
  border: 1px solid #ececec;
  border-radius: 4px;
  outline: none;
}
.class-check-selected {
  border-color: #00e676;
}
</style>
