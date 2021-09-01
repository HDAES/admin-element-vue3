<template>
  <el-scrollbar style="background-color: #F0F2F5">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </el-scrollbar>
</template>
<script>
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useAppSetting } from '@/hooks/setting/useAppSetting'
export default {
  setup(){
    const route =  useRoute()
    const { addViews } = useAppSetting()
    
    watchEffect(() =>{
      console.log(route.path)
      addViews(route)
    })
  }
}
</script>
