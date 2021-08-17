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
export default {
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>
