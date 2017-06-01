<template lang="html">
  <span>
    <input class="hf-radio" type="radio" :id="id" :value="radioValue" :name="name" :checked="value === radioValue" :outerValue="value" @click="input(radioValue)">
    <label class="lbl" :for="id">
      <div class="lbl-slot">
        <slot></slot>
      </div>
    </label>
  </span>
</template>

<script>
export default {
  props: {
    radioValue: String,
    value: String,
    name: String,
    id: String
  },
  methods: {
    input(v){
      this.$emit('input',v);
    }
  }
}
</script>

<style lang="scss">
.hf-radio {
  display: none;
}
input[type=checkbox] + .lbl::before, input[type=radio] + .lbl::before {
  cursor: pointer;
  font-family: fontAwesome;
  font-weight: normal;
  font-size: 12px;
  color: #32a3ce;
  content: "\a0";
  background-color: #FAFAFA;
  border: 1px solid #c8c8c8;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 0;
  display: inline-block;
  text-align: center;
  height: 16px;
  line-height: 14px;
  min-width: 16px;
  margin-right: 5px;
  position: relative;
  top: -1px;
}
input[type=radio] + .lbl::before {
    border-radius: 100%;
    font-size: 10px;
    font-family: FontAwesome;
    text-shadow: 0 0 1px #32a3ce;
    line-height: 19px;
    height: 17px;
    min-width: 17px;
}
input[type=radio]:checked + .lbl::before {
    content: "\f111";
    border-color: #ff893c;
}
label input[type=radio] + .lbl {
    margin-left: -10px;
}
input[type=radio] + .lbl {
    position: relative;
    display: inline-block;
    margin: 0;
    line-height: 20px;
    min-height: 18px;
    min-width: 18px;
    font-weight: normal;
    cursor: pointer;
}
.lbl-slot {
  display: inline-block;
}
</style>
