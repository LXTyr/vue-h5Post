<template lang="html">
    <label class="weui-cell weui-cell_radio weui-check__label" :class="{'weui-cell_access': arrow}">
      <div class="weui-cell__hd">
        <input type="radio" class="weui-check" :name="name" :value="v" v-model="currentValue">
        <span class="weui-icon-checked"></span>
      </div>
      <div class="weui-cell__bd">
        <p>{{ title }}</p>
        <inline-desc>
          <slot name="inline-desc">{{inlineDesc}}</slot>
        </inline-desc>
      </div>
      <div class="weui-cell__ft" :class="{'vux-cell-arrow-down': arrow}"></div>
    </label>
</template>

<script>
import InlineDesc from 'vux/src/components/inline-desc'
export default {
  props: {
    name: String,
    title: String,
    value: String,
    v: String,
    arrow: Boolean,
    inlineDesc: String
  },
  data () {
    return {
      currentValue: {}
    }
  },
  watch: {
    value (newV) {
      this.currentValue = newV
    },
    currentValue (newV) {
      this.$emit('input', newV)
    }
  },
  components: {
    InlineDesc
  },
  created () {
    this.currentValue = this.value
  }
}
</script>

<style lang="css" scoped>
.weui-cell__hd {
  min-width: 30px;
}
</style>
