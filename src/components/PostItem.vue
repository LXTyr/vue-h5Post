<template lang="html">
  <div class="post-item" :style="style">
    
  </div>
</template>

<script>
export default {
  props: [
    'options'
  ],
  data: function () {
    return {
      style: {
        backgroundColor: this.options.backgroundColor
      }
    }
  },
  watch: {
    options: function () {
      console.log(options.backgroundColor);

    }
  },
}
</script>

<style lang="css">

</style>
