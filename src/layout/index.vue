<template>
  <el-container style="height:100%">
    <SideBar/>
    <el-container>
      <el-header style="height: 48px">
        <Header/>
      </el-header>
      <TagsView/>
      <AppMain />
    </el-container>
  </el-container>
</template>

<script>
import SideBar from './components/Sidebar'
import Header from './components/Header'
import AppMain from './components/AppMain'
import TagsView from './components/TagsView'
export default {
  components: { SideBar, Header, AppMain, TagsView }
}
</script>
