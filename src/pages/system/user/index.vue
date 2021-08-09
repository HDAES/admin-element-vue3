<template>
  <div >
   
     <BasicTable 
      v-model:addVisible="dialogVisible"
      :tableConfig="tableConfig"
      :columns="columns" 
      :getData="getRoleList"> 
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
import { getRoleList } from '@/api/system/role'
import { ref } from 'vue'
export default {
  components: { BasicTable },
  setup(){
    const router = useRouter()
    const dialogVisible = ref(false)
    
    const handleTo = (path) =>{
      router.push({path})
    }
    return {
      handleTo,
      getRoleList,
      dialogVisible,
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
        index: true,
      },
    }
  }
}
</script>
