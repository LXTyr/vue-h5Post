<template lang="">
  <div>
    <group :title="'上传图片'">
      <cell-box>
        <uploader v-model="files"></uploader>
      </cell-box>
    </group>
    <group title="标签">
      <cell-box>
        <tag-group :items="items"></tag-group>
      </cell-box>
    </group>
    <group >
      <cell title="谁可以看" is-link :link="{name: 'shareto'}" :value="share.check | getTag">
        <span slot="icon" class="vux-cell-left-icon">
          <i class="fa fa-globe"></i>
        </span>
      </cell>
    </group>

    <group :title="desTitle" :class="{'weui-groun_warn': desTitle!== '描述'}">
       <x-textarea :max="200" placeholder="请输入" v-model="description"></x-textarea>
    </group>
    <box gap="20px">
        <x-button type="primary" @click.native="goNext">提交</x-button>
    </box>
    <divider>我是有底线的</divider>
  </div>
</template>

<script>
import Uploader from '@/components/Uploader'
import TagGroup from '@/components/TagGroup'
import UploadService from '@/service/UploadService'
import { getTag } from './filters'
import { mapState } from 'vuex'
import { Group, XButton, CellBox, Cell, Divider, XTextarea, Box, Confirm, TransferDom  } from 'vux'
export default {
  mounted () {
    this.$store.commit('updateTitle','发布')
    this.$store.commit('updateAction',{})
  },
  data(){
    return {
      items: [
      ],
      files: [],
      description: '',
      desTitle: '描述'
    }
  },
  filters: {
    getTag
  },
  computed: {
    ...mapState({
      share: state => state.shareto
    })
  },
  watch: {
    description (newV) {
      if(newV !== ''){
        this.desTitle = '描述'
      }
    }
  },
  methods: {
    goNext () {
      if(this.description === ''){
        this.desTitle = '请输入描述'
        return
      }

      let fd = new FormData()
      this.files.forEach(function (item) {
        fd.append('files',item.file)
      })
      this.items.forEach(function (item) {
        fd.append('Tabs',item.name)
      })
      fd.append('Description',this.description)
      fd.append('Type',this.choosed)
      this.$vux.loading.show({
       text: '上传中...'
      })

      UploadService.upload(fd).then(res => {
        this.$vux.loading.hide()
      })
    }
  },
  directives: {
    TransferDom
  },
  components: {
    XButton,
    Group,
    CellBox,
    Cell,
    Uploader,
    Divider,
    TagGroup,
    XTextarea,
    Box,
    Confirm
  }
}
</script>

<style lang="less">
.center {
  text-align: center;
  padding-top: 20px;
  color: #fff;
  font-size: 18px;
}
.center img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ececec;
}
.autocomplete li.binded {
  color: #cccccc;
}
.vux-x-dialog .dialog-input {
  width: 150px;
  border-bottom: 1px solid #ccc;
  text-align: center;
}
.vux-cell-left-icon {
  margin-right: 15px;
}
</style>
