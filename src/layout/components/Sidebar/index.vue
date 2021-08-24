<template>
  <el-scrollbar style="background-color: #324157">
    <el-menu
      class="sidebar-el-menu"
      :collapse="isCollapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      :router="true"
    >
      <MenuItem
        v-for="(item, index) in sidebarRouters"
        :key="index"
        :path="item.path"
        :route="item"
        :havecChildren="item.children&&item.children.length>0"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import MenuItem from "./MenuItem.vue";
import { useAppSetting } from "@/hooks/setting/useAppSetting";
export default {
  components: { MenuItem },
  setup() {
    const { isCollapse, sidebarRouters } = useAppSetting();
    return {
      isCollapse,
      sidebarRouters,
    };
  },
};
</script>
