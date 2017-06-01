<template lang="html">
  <div class="form">
    <div class="form-group">
      <div class="input-group" :class="{'has-error': error.name != ''}">
        <label>姓名</label>
        <input class="form-control" type="text" v-model="record.name" @focus="focus">
      </div>
      <transition name="slideDown">
        <ul v-if="this.options.names.length !== 0" class="auto-list">
          <li v-for="name in options.names" @click="select(name)">
            {{ name.Name }} - {{ name.ClassName }} - {{ name.StudentNO }}
          </li>
        </ul>
      </transition>
      <span v-if="error.name != ''" class="help-block">{{ error.name }}</span>
    </div>
    <div class="form-group">
      <div class="input-group" :class="{'has-error': error.class != ''}">
        <label>班级</label>
        <!-- <select class="form-control" v-model="record.class" @focus="focus" >
          <option v-for="cls in options.class" :value="cls.ID">{{ cls.ClassName }}</option>
        </select> -->
        <input class="form-control" type="text" v-model="record.class" @focus="focus" readonly>
      </div>
      <span v-if="error.class != ''" class="help-block">{{ error.class }}</span>
    </div>
    <div class="form-group">
      <div class="input-group" :class="{'has-error': error.no != ''}">
        <label>学号</label>
        <input class="form-control" type="text" v-model="record.no" @focus="focus" readonly>
      </div>
      <span v-if="error.no != ''" class="help-block">{{ error.no }}</span>
    </div>
    <div class="form-group">
      <div class="input-group" :class="{'has-error': error.phone != ''}">
        <label>手机号</label>
        <input class="form-control" type="text" v-model="record.phone" @focus="focus">
      </div>
      <span v-if="error.phone != ''" class="help-block">{{ error.phone }}</span>
    </div>
    <div class="form-group">
      <div class="input-group" :class="{'has-error': error.time != ''}">
        <label>方便聚会的时间</label>
        <div class="form-control">
          <div class="select-span">
            <span>{{ timeSpan }}</span>
          </div>
          <select class="select-inner" v-model="record.time" multiple @focus="focus">
            <option v-for="time in options.time" :value="time.ID">{{ time.AttendTime }}</option>
          </select>
        </div>

      </div>
      <span v-if="error.time.length != ''" class="help-block">{{ error.time }}</span>
    </div>
    <div class="form-actions">
      <button class="btn" type="button" @click="submit">提交信息</button>
    </div>
  </div>
</template>

<script>
import FormService from '@/service/FormService'
import _ from 'lodash'
import Vue from 'vue'
import router from '../router'

export default {
  data(){
    return {
      record: {
        name: '',
        class: '',
        no: '',
        phone: '',
        time: []
      },
      error: {
        name: '',
        class: '',
        no: '',
        phone: '',
        time: ''
      },
      options: {
        class: [],
        time: [],
        names: []
      }
    }
  },
  computed: {
    timeSpan: function () {
      if (this.record.time.length === 0) {
        return '请选择'
      }
      let arr = [],self = this

      this.record.time.forEach(function (e) {
        let finded = self.options.time.find(function (value) {
          return value.ID === e
        })
        arr.push(finded.AttendTime)
      })
      return arr.join()
    }
  },
  methods: {
    submit(event){
      console.log(this.record)
      if(this.record.name === ''){
        this.error.name = '姓名不能为空'
        return
      }
      if(this.record.class === ''){
        this.error.class = '班级不能为空'
        return
      }
      if(this.record.no === ''){
        this.error.no = '学号不能为空'
        return
      }
      if(this.record.phone === ''){
        this.error.phone = '手机号不能为空'
        return
      }
      if(this.record.time.length === 0){
        this.error.time = '请选择至少一个时间'
        return
      }
      FormService.submitForm({
        Name: this.record.name,
        PhoneNO: this.record.phone,
        AttendTimeID: this.record.time,
        ClassID: this.record.class,
        StudentID: this.record.no
      }).then(data => {
        router.push('success')
      })
    },
    focus(){
      this.error.name = ''
      this.error.class = ''
      this.error.no = ''
      this.error.phone = ''
      this.error.time = ''
    },
    select(name){
      this.record.name = name.Name
    //  let cls = _.find(this.options.class,{ClassName: name.ClassName})
      this.record.class = name.ClassName
      this.record.no = name.StudentNO
      this.options.names = [];

    }
  },
  mounted(){

    // FormService.fetchClass().then(data => {
    //   this.options.class = data;
    // })

    FormService.fetchTime().then(data => {
      this.options.time = data;
    })
    let names = ['hellon','jack','lilei','hanmeimei']
    let debounce = _.debounce(() => {
      // let newArr = _.filter(names, (o) => { return (o.indexOf(self.record.name.toLowerCase()) != -1) && self.record.name != '' });
      // console.log(newArr);
      if (this.record.name.length >= 2){
        FormService.fetchName({Name: this.record.name}).then(data => {
          this.options.names = data
        })
      }else {
        this.options.names = []
      }

    },200)
    this.$watch('record.name',function (newValue,oldValue) {
      debounce()
    })
  }
}
</script>

<style lang="less">
.form {
  font-size: 0.24rem;
  color: #878787;
}
.form-group {
    margin: 0 0 0.21rem;
    position: relative;

    .help-block {
      display: block;
      text-align: center;
      font-size: 0.19rem;
      color: #f44336;
    }

    .auto-list {
      position: absolute;
      //top: 0.55rem;
      left: 0.8rem;
      margin: 0;
      padding: 0;
    //  width: 2rem;
      list-style: none;
      z-index: 10;
      background-color: #fafafa;
      border: 1px solid #c7c7c7;
      border-radius: 2px;

      li {
        padding: 0.05rem;
        border-bottom: 1px solid #eeeeee;
        text-align: center;
        color: #424242;
        font-size: 0.2rem;
        &:hover {
          background-color: #e2f1f8;
        }
      }
    }
}
.input-group {
  position: relative;
  display: table;
  padding: 0.18rem 0.286rem;
  border-collapse: separate;
  border: 1px solid #C6A274;
  background-color: #fff;

  &.has-error {
    border-color: #f44336;
    color: #ff7961;
  }
}
.input-group label,.input-group .form-control{
  display: table-cell;
}
.input-group label {
  width: 1%;
  white-space: nowrap;
  line-height: 14px;
}
.input-group .form-control {
  width: 100%;
  padding: 0 0.06rem;
  border: none;
  font-size: 14px;
  color: #555;
}
.form-control:focus,button:focus {
  outline: 0;
}
.btn {
  width: 100%;
  padding: 0.16rem 0;
  background-color: #E3D3B1;
  border: none;
  color: #775731;
  user-select: none;
}
.btn:active {
  background-color: darken(#E3D3B1,15%);
  color: darken(#775731,15%);
}
// .slideDown-enter,.slideDown-leave-active {
//   transform: scaleY(0);
// }
// .slideDown-enter-active,.slideDown-leave-active {
//   transition: transfrom 1s;
// }
.slideDown-enter-active, .slideDown-leave-active {
  transition: opacity .5s
}
.slideDown-enter, .slideDown-leave-active {
  opacity: 0
}
select {
  -webkit-appearance: none;
}
.select-span {
  position: absolute;
  top: .18rem;
  width: 1.46rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.select-inner {
  width: 100%;
  height: .3rem;
  opacity: 0;
}
</style>
