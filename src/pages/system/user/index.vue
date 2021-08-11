<template>
  <div >
    <BasicTable 
      ref="basicTable"
      v-model:addVisible="dialogVisible"
      :tableConfig="tableConfig"
      :columns="columns" 
      :getData="getUserList"> 
      <template  #operate="scope" >
        <el-button type="text" @click="handleDel(scope.row)">删除</el-button>
        <el-button type="text" @click="handleEditBtn(scope.row)">编辑</el-button>
      </template>
    </BasicTable>

    <el-dialog
      title="添加管理员"
      v-model="dialogVisible"
      width="600px"
      @closed="closed"
      >
      <el-form :model="ruleForm" :rules="rules" ref="refForm" label-width="80px">
        <el-form-item v-if="!isAdd" label="ID：">
          <el-input v-model="ruleForm.id" disabled placeholder="请输入角色名"/>
        </el-form-item>
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
import { getRoleList, postRoleAdd,deleteRole, putRole } from '@/api/system/role'
import { getUserList } from '@/api/system/user'

import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';
import { ref } from 'vue'
export default {
  components: { BasicTable },
  setup(){
    const router = useRouter()
    const dialogVisible = ref(false)
    const isAdd = ref(true)
    const refForm = ref('')
    const basicTable = ref('')
    const ruleForm = ref({
      username: '',
      nickname: '',
      roleId: '',
      avatarId: '',
      password: '',
      description: ''
    })
    const handleTo = (path) =>{
      router.push({path})
    }

    //确定
    const handleDetermine = () =>{
      refForm.value.validate(valid =>{
        if (valid) {
          if(isAdd.value){
            postRoleAdd(ruleForm.value).then(res =>{
              dialogVisible.value = false
              basicTable.value.handleRefresh()
            })
          }else{
            putRole(ruleForm.value).then(res =>{
              dialogVisible.value = false
              basicTable.value.handleRefresh()
            })
          }
        } else {
          return false;
        }
      })
    }

    //编辑按钮
    const handleEditBtn = row =>{
      isAdd.value = false
      dialogVisible.value = true
      ruleForm.value ={
        id: row.id,
        name: row.name,
        description: row.description 
      }
    }
    //删除
    const handleDel = (row) => {
      ElMessageBox.confirm(`此操作将永久删除 ${row.name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole({id: row.id}).then(res =>{
          basicTable.value.handleRefresh()
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消'
        })
      })
    }

    //关闭弹窗
    const closed = () =>{
      ruleForm.value ={
        name: '',
        description: '' 
      }
      isAdd.value = true
    }
    return {
      handleTo,
      getUserList,
      dialogVisible,
      ruleForm,
      refForm,
      basicTable,
      isAdd,
      handleDel,
      handleDetermine,
      handleEditBtn,
      closed,
      columns: [{
        title: '角色名',
        dataIndex: 'username'
      },{
        title: '昵称',
        dataIndex: 'nickname'
      },{
        title: '头像',
        dataIndex: 'avatar'
      },
      {
        title: '手机',
        dataIndex: 'phone'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        formatter: ({sex}) => sex == 1? '男': sex == 2? '女':'未知'
      },
      {
        title: '状态',
        dataIndex: 'status',
        formatter: ({status}) => status?'启用':'禁用' 
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
        width: 150,
        align: 'center',
        slotname: 'operate'
      }],
      tableConfig:{
        index: true,
        tableName: '管理员列表',
        subName: '管理员管理'
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
