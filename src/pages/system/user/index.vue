<template>
  <div >
    <BasicTable 
      ref="basicTable"
      v-model:addVisible="dialogVisible"
      :tableConfig="tableConfig"
      :columns="columns" 
      :getData="getRoleList"> 
      <template  #operate="scope" >
          <el-button type="text" @click="handleDel(scope.row.id)">删除</el-button>
      </template>
    </BasicTable>

    <el-dialog
      title="添加角色"
      v-model="dialogVisible"
      width="600px"
      >
      <el-form :model="ruleForm" :rules="rules" ref="refForm" label-width="80px">
        <el-form-item label="角色名：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入角色名"/>
        </el-form-item>
        <el-form-item label="描述：" prop="description">
          <el-input v-model="ruleForm.description" type="textarea" :rows="2" placeholder="请输入描述"/>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleDetermine">确 定</el-button>
        </span>
      </template>
    </el-dialog>
     
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { BasicTable } from '@/components/Table'
import { getRoleList, postRoleAdd,deleteRole } from '@/api/system/role'
import { reactive, ref } from 'vue'
export default {
  components: { BasicTable },
  setup(){
    const router = useRouter()
    const dialogVisible = ref(false)
    const refForm = ref('')
    const basicTable = ref('')
    const ruleForm = reactive({
      name: '',
      description: ''
    })
    const handleTo = (path) =>{
      router.push({path})
    }

    //确定
    const handleDetermine = () =>{
      refForm.value.validate(valid =>{
        if (valid) {
          postRoleAdd(ruleForm).then(res =>{
            dialogVisible.value = false
            basicTable.value.handleRefresh()
          })
          } else {
            console.log('error submit!!');
            return false;
          }
      })
    }

    //删除
    const handleDel = (id) => {
      deleteRole({id}).then(res =>{
        basicTable.value.handleRefresh()
      })
    }

    return {
      handleTo,
      getRoleList,
      dialogVisible,
      ruleForm,
      refForm,
      basicTable,
      handleDel,
      handleDetermine,
      columns: [{
        title: '角色名',
        dataIndex: 'name'
      },{
        title: '描述',
        dataIndex: 'description'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime'
      },{
        title: '操作',
        width: 180,
        slotname: 'operate'
      }],
      tableConfig:{
        index: true,
        tableName: '角色列表',
        subName: '角色管理'
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
