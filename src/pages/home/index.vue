<template>
  <div style="height:2000px">
     <el-button @click="handleTo('/system/user')">click</el-button>
     <el-button @click="handleTo('/user/index')">click</el-button>
     <BasicTable :columns="columns" :tableData="tableData"> 
       <template  #gender="scope" >
          自定义slot:
          <span>{{scope.soltval.gender}}</span>
      </template>
     </BasicTable>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { BasicTable } from '@/components/Table'
export default {
  components: { BasicTable },
  setup(){
    const router = useRouter()
    const handleTo = (path) =>{
      router.push({path})
    }
    return {
      handleTo,
      tableData: [{
        name: 'hades',
        age: 18,
        gender: 0
      },{
        name: 'xl',
        age: 28,
        gender: 1
      }],
      columns: [{
        name: '名字',
        dataIndex: 'name'
      },{
        name: '年龄',
        sortable: true,
        hide: true,
        dataIndex: 'age'
      },{
        name: '性别',
        dataIndex: 'gender',
        formatter: ({gender}) => gender? '男': '女'
      }],
      tableConfig:{
        index: true
      }
    }
  }
}
</script>

<style>

</style>