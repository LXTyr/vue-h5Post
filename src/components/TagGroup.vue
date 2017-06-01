<template lang="html">
  <div class="">
    <div class="hf-tag-item" v-for="(item,key) in items" :class="item.cls">
      <span class="hf-tag-span">{{ item.name }}</span>
      <span class="hf-tag-close" @click="delItem(key)"><i class="fa fa-close"></i></span>
    </div>
    <div class="hf-tag-item" @click="itemAdd">
      <input v-if="adding" v-autofocus v-model="addValue" class="hf-tag-textfield" type="text" @blur="clickOutside">
      <span v-else class="hf-tag-span">+</span>
    </div>
  </div>
</template>

<script>
import './click-outside.js'
import './autofocus.js'
let colors = ['primary','info','success','warning','danger',
'yellow','pink','purple','inverse']
export default {
  props: {
    items: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      adding: false,
      addValue: ''
    }
  },
  methods: {
    itemAdd(){
      this.adding = !this.adding
    },
    clickOutside(){
      this.adding = !this.adding
      if(this.addValue === '') return
      this.items.push({name: this.addValue,cls: 'tag-'+ colors[getRandomIndex()]})
      this.addValue = ''
    },
    delItem(key){
      this.items.splice(key,1)
    }
  },
  created(){
    this.items.forEach(function(e){
      e.cls = 'tag-' + colors[getRandomIndex()]
    })
  }
}

function getRandomIndex(){
  return parseInt(Math.random() * (colors.length - 1))
}
</script>

<style lang="css">
.hf-tag-item {
  position: relative;
  display: inline-block;
  border: 1px solid #ececec;
  margin: 0 5px 5px 0;
  font-size: 18px;
  vertical-align: top;
}
.tag-primary {
  border-color: #8aafce;
  color: #6688a6 !important;
}
.tag-info {
  border-color: #8fbcd9;
  color: #70a0c1 !important;
}
.tag-success {
  border-color: #a7c9a1;
  color: #81a87b !important;
}
.tag-warning {
  border-color: #e7b979;
  color: #daa458 !important;
}
.tag-danger {
  border-color: #d7a59d;
  color: #b7837a !important;
}
.tag-yellow {
  border-color: #ecd181;
  color: #d3a61a !important;
}
.tag-pink {
  border-color: #d299ae;
  color: #af6f87 !important;
}
.tag-purple {
  border-color: #b7b1c6;
  color: #7d6fa2 !important;
}
.tag-inverse {
  border-color: #959595;
  color: #555555 !important;
}
.hf-tag-span {
  display: inline-block;
  padding: 8px 15px;
}
.hf-tag-textfield {
  width: 50px;
  height: 41px;
  border: none;
  outline: 0;
}
.hf-tag-close {
  position: absolute;
  right: -8px;
  top: -8px;
  width: 16px;
  height: 16px;
  background: #f74c31;
  border-radius: 100%;
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  color: #fff;
  z-index: 10;
}
</style>
