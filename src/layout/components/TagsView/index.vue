<template>
  <div class="tags-views-container">
    <template v-for="(item,index) in visitedViews"  :key="index">  
      <router-link :to="item.path">{{item.meta.title}}</router-link>
    </template>
  </div>
</template>

<script>
import { useAppSetting } from '@/hooks/setting/useAppSetting'
export default {
  setup(){
    const { visitedViews } = useAppSetting()
    return {
      visitedViews
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-views-container{
    height: 40px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04)
}
</style>