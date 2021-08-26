<template>
  <div class="header">
    <MenuUnfoldOutlined v-if="isCollapse" class="icon" @click="changeCollapse"/>
    <MenuFoldOutlined v-else class="icon" @click="changeCollapse"/>
    <el-space alignment="center" size="large">
      <SelectLang />
      <Screenfull />
      <LogoutOutlined class="icon" @click="loginOut"/>
    </el-space>
  </div> 
</template>

<script>
import { useAppSetting } from '@/hooks/setting/useAppSetting'
import SelectLang from '@/components/SelectLang'
import Screenfull from '@/components/Screenfull'
import { useUserStore } from '@/store/modules/user'
import { MenuUnfoldOutlined, MenuFoldOutlined,LogoutOutlined } from '@ant-design/icons-vue'
export default {
  components: { SelectLang, MenuUnfoldOutlined, MenuFoldOutlined, Screenfull,LogoutOutlined },
  setup(){
    const { changeCollapse,isCollapse } = useAppSetting()
    const userStore = useUserStore()
    const loginOut = () =>{
      userStore.loginOut().then(() => {
        location.href = '/index';
      })
    }
    return {
      loginOut,
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
    color: #333;
    font-size: 16px;
  }
}
</style>
