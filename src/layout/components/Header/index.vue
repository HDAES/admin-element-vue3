<template>
  <div class="header">
    <MenuUnfoldOutlined v-if="isCollapse" class="icon" @click="changeCollapse"/>
    <MenuFoldOutlined v-else class="icon" @click="changeCollapse"/>
    <el-space alignment="center" size="large">
      <SelectLang />
      <Screenfull />

      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{userName}} {{roles.toString()}}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="loginOut" icon="el-icon-switch-button">
              退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
        </el-dropdown>
    </el-space>
  </div> 
</template>

<script>
import { useAppSetting } from '@/hooks/setting/useAppSetting'
import { useUser } from '@/hooks/user'
import SelectLang from '@/components/SelectLang'
import Screenfull from '@/components/Screenfull'
import { useUserStore } from '@/store/modules/user'
import { MenuUnfoldOutlined, MenuFoldOutlined,LogoutOutlined } from '@ant-design/icons-vue'
export default {
  components: { SelectLang, MenuUnfoldOutlined, MenuFoldOutlined, Screenfull,LogoutOutlined },
  setup(){
    const { changeCollapse,isCollapse } = useAppSetting()
    const userStore = useUserStore()
    const { userName, roles } = useUser()
    const loginOut = () =>{
      userStore.loginOut().then(() => {
        location.href = '/index';
      })
    }

    const handleCommand = (command) =>{
      switch(command){
        case 'loginOut' :
          loginOut()
          break
        default : 
          console.log('click')
      }
    }
    return {
      changeCollapse,
      handleCommand,
      isCollapse,
      userName,
      roles
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
