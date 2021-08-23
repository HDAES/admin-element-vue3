<template>
  <div >
     <BasicTable 
      v-model:addVisible="dialogVisible"
      :searchForm='searchForm'
      :tableConfig="tableConfig"
      :columns="columns" 
      :getData="getUserList"> 
       <template  #gender="scope" >
          自定义slot:
          <span>{{scope.soltval.gender}}</span>
      </template>
     </BasicTable>

     <el-dialog
      title="提示"
      v-model="dialogVisible"
      width="30%"
      >
      <span>这是一段信息</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { BasicTable } from '@/components/Table'
import { getUserList } from '@/api/user'
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
      getUserList,
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
      searchForm: [{
        type: 'IS',
        file: 'name',
        placeholder: "用户名"
      },{
        type: 'IS',
        file: 'key',
        placeholder: "清单名"
      },{
        type: 'FS',
        file: 'vipType',
        label: '会员类型',
        placeholder: "请输入会员类型",
        options:[{
          value: '',
          label: '全部'
        },{
          value: '1',
          label: '包月会员'
        },{
          value: '2',
          label: '包季会员'
        },{
          value: '3',
          label: '包年会员'
        },{
          value: '4',
          label: '永久会员'
        }]
      }]
    }
  }
}
</script>
