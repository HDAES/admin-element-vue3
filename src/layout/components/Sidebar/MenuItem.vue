<template>
  <div>
    <el-submenu :index="route.path" v-if="route.children && route.children.length > 0">
      <template #title>
        <i :class="route.meta.icon"></i>
        <span>{{ route.meta.title }}</span>
      </template>
      <MenuItem 
         v-for="(item,index) in route.children"
        :key="index"
        :route="item"
        :path="route.path"
        />
    </el-submenu>
    <el-menu-item :index="path+ '/' +route.path" v-else>
      <template #title>{{ route.meta.title }}</template>
    </el-menu-item>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
name: "MenuItem",
  props: {
    route: {
      type: Object,
    },
    path:{
        type: String,
    }
  },
  setup(props) {
    const route = ref(props.route);
    const path = ref(props.path)
    return {
      route,
      path
    };
  },
};
</script>

<style>
</style>