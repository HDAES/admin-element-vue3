<template>
  <div >
     <el-button @click="handleTo('/system/user')">click</el-button>
     <el-button @click="handleTo('/user/index')">click</el-button>
     <BasicTable :columns="columns" :getData="getUserList"> 
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
import { getUserList } from '@/api/user'
export default {
  components: { BasicTable },
  setup(){
    const router = useRouter()


    
    const handleTo = (path) =>{
      router.push({path})
    }
    return {
      handleTo,
      getUserList,

      columns: [{
        title: '名字',
        dataIndex: 'name'
      },{
        title: '昵称',
        dataIndex: 'nickname'
      },
      {
        title: '登录IP',
        dataIndex: 'lastLoginIp',
      },
      {
        title: '年龄',
        sortable: true,
        hide: true,
        dataIndex: 'age'
      },{
        title: '性别',
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