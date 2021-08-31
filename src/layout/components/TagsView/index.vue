<template>
  <div class="tags-views-container">
    <template v-for="(item,index) in visitedViews" :key="index"> 
      <router-link :to="item.path" class="tags tags-select">{{item.meta.title}}</router-link>
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
    line-height: 40px;
    padding: 0 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);
    .tags{
      display: inline-block;
      height: 25px;
      line-height: 25px;
      padding: 0px 10px;
      text-decoration: none;
      border: 1px solid #d8dce5;
      margin-right: 5px;
      font-size: 14px;
      border-radius: 2px;
    }
    .tags-select{
      background-color: #0960BD;
      color: #fff;
    }
    .tags-select::before{
      position: relative;
      left: 0;
      content: '';
      width: 8px;
      height: 8px;
      display: inline-block;
      border-radius: 50%;
      margin-right: 4px;
      background: #fff;
    }
}
</style>