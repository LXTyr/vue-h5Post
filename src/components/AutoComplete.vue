<template lang="html">
  <div class="">
    <x-input :title="title"
             :placeholder="placeholder"
             :readonly="readonly"
             :type="type"
             :is-type="isType"
             :show-clear="showClear"
             :min="min"
             :max="max"
             :disabled="disabled"
             :debounce="debounce"
             :placeholder-align="placeholderAlign"
             :text-align="textAlign"
             :label-width="labelWidth"
             v-model="currentValue"
             :required="required"
             ref="input"
             @on-change="onChange"
             />

      <transition name="slideDown">
        <div class="autocomplete" v-if="this.suggestions.length !== 0" >
            <ul class="auto-list">
              <li v-for="suggestion in suggestions" :class="{binded: suggestion.Flag === 1}" @click="select(suggestion)">
                {{ suggestion.Name }}-{{ suggestion.StudentNO }}
              </li>
            </ul>
        </div>
      </transition>


  </div>
</template>

<script>
import { TransferDom,XInput } from 'vux'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    value: [String, Number],
    name: String,
    readonly: Boolean,
    disabled: Boolean,
    isType: [String, Function],
    min: Number,
    max: Number,
    showClear: {
      type: Boolean,
      default: true
    },
    textAlign: String,
    // https://github.com/yisibl/blog/issues/3
    autocomplete: {
      type: String,
      default: 'off'
    },
    debounce: Number,
    placeholderAlign: String,
    labelWidth: String,
    suggestions: {
      type: Array,
      default(){
        return []
      }
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      top: 0,
      currentValue: this.value
    }
  },
  computed: {
    valid(){
      return this.$refs.input.valid
    },
    firstError(){
      return this.$refs.input.firstError
    }
  },
  watch: {
    currentValue(newVal){
      this.$emit('input', newVal)
    },
    value(val){
      this.currentValue = val
    }
  },
  methods: {
    onChange(newValue){
      this.$emit('on-change', newValue)
    },
    select(suggestion){
      this.$emit('onSelect',suggestion)
    }
  },
  // directives: {
  //   TransferDom
  // },
  components: {
    XInput
  },
  mounted(){
    // let rect = this.$el.getBoundingClientRect();
    // this.top = rect.top + rect.height + 'px'
  }
}
</script>

<style lang="less">
.autocomplete {
  position: absolute;
  top: 0.6rem;
  left: 0.8rem;
  margin: 0;
  padding: 0;
  //width: 1.5rem;
  background-color: #fafafa;
  border: 1px solid #c7c7c7;
  border-radius: 2px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, .04), 0 2px 4px 0 rgba(0, 0, 0, .12);
  z-index: 10;
  li {
    padding: 0.1rem;
    border-bottom: 1px solid #eeeeee;
    list-style: none;
    text-align: center;
    color: #424242;
    font-size: 0.2rem;
    &:hover {
      background-color: #e2f1f8;
    }
    &.binded {
      color: #E64340;
    }
  }
}

.slideDown-enter-active, .slideDown-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms, opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;
  transform-origin: center top;
}
.slideDown-enter, .slideDown-leave-active {
  opacity: 0;
  transform: scaleY(0);
}
</style>
