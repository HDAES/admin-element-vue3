<template>
  <div>404
    <el-button @click="handleTo">click</el-button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  setup(){
    const router = useRouter()
    const handleTo = () =>{
      router.push({path: '/system/user'})
    }

    return {
      handleTo
    }
  }
}
</script>

<style>

</style>