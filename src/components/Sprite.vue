<template lang="html">
  <div class="sprite" :class="spriteClass" :style="style">
    <img v-if="options.type === 'image'" :src="options.src" alt=""  :style="{width: style.width,height: style.height}">
    <div class="form" v-if="options.type === 'form'">
    </div>
    <span v-if="options.type === 'text'"> {{ options.text }} </span>
  </div>
</template>

<script>
export default {
  props: [
    'options',
    'isActive'
  ],
  data() {
    return {
      style: {
        left: this.options.left,
        right: this.options.right,
        top: this.options.top,
        bottom: this.options.bottom,
        width: this.options.width,
        height: this.options.height,
        backgroundColor: this.options.backgroundColor,
        animationDuration: this.options.animationDuration,
        animationDelay: this.options.animationDelay,
        fontSize: this.options.fontSize,
        fontWeight: this.options.fontWeight,
        color: this.options.color
      }
    }
  },
  computed: {
    spriteClass() {
      let spriteClass = {
        animated: this.isActive,
        dismiss: !this.isActive
      }
      this.options.animateName && (spriteClass[this.options.animateName] = this.isActive)
      return spriteClass
    }
  }
}
</script>

<style lang="css">
.sprite {
  position: absolute;
}
.sprite.dismiss {
  opacity: 0;
}

</style>
