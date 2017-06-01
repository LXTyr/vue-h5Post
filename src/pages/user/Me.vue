<template lang="html">
  <div >
    <group>
      <cell title="头像" inline-desc="点击更换头像" is-link>
        <img src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" alt="a">
      </cell>
      <cell title="姓名" value="王正"></cell>
      <cell title="班级" value="B0103025" ></cell>
      <cell title="学号" value="B010302501" ></cell>
      <cell title="手机号" value="139xxxxxxxx" is-link></cell>
    </group>
    <group>
      <cell title="私信" is-link :link="{name: 'messages'}">
        <div class="badge-value">
          <span class="vertical-middle" >新消息 &nbsp;</span>
          <badge text="10"></badge>
        </div>
      </cell>
    </group>
  </div>
</template>

<script>
import { XHeader, Group, Cell, Badge } from 'vux'
export default {
  mounted () {
    this.$store.commit('updateTitle','我')
    this.$store.commit('updateAction',{})
  },
  computed: {
  },
  components: {
    XHeader,
    Group,
    Cell,
    Badge
  }
}
</script>

<style lang="css">
.badge-value {
  display: inline-block!important;
}
.vertical-middle {
  vertical-align: middle;
}
</style>
