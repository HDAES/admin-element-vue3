<template>
  <div style="height:2000px">
     <el-button @click="handleTo('/system/user')">click</el-button>
     <el-button @click="handleTo('/user/index')">click</el-button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  setup(){
    const router = useRouter()
    const handleTo = (path) =>{
      router.push({path})
    }

    return {
      handleTo
    }
  }
}
</script>

<style>

</style>