<template>
  <div class="header">

    <MenuUnfoldOutlined v-if="isCollapse" class="icon" @click="changeCollapse"/>
    <MenuFoldOutlined v-else class="icon" @click="changeCollapse"/>
 
    <el-space alignment="center" size="large">
      <SelectLang />
      <Screenfull />
    </el-space>
  </div> 
</template>

<script>
import { useAppSetting } from '@/hooks/setting/useAppSetting'
import SelectLang from '@/components/SelectLang'
import Screenfull from '@/components/Screenfull'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
export default {
  components: { SelectLang, MenuUnfoldOutlined, MenuFoldOutlined, Screenfull },
  setup(){
   const { changeCollapse,isCollapse } = useAppSetting()

    return {
      changeCollapse,
      isCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .icon{
    color: #fff;
    font-size: 24px;
  }
}
</style>
