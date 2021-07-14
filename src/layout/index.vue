<template>
  <el-container style="height:100%">
    <SideBar/>
    <el-container>
      <el-header style="background-color: #242f42"><Header/></el-header>
      <AppMain />
    </el-container>
  </el-container>
</template>

<script>
import SideBar from './components/Sidebar'
import Header from './components/Header'
import AppMain from './components/AppMain'
export default {
  components: { SideBar, Header,AppMain }
}
</script>

<style>

</style>