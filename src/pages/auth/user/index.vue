<template>
  <div >
    <BasicTable 
      ref="table"
     :columns="columns" 
     :getData="getUserList"
     :delData="deleteUser"
     :edit-add="handleEditAdd"
     :tableConfig="tableConfig"
     deleteName="username"
    />

    <el-dialog
      title="添加"
      v-model="dialog.visible"
      width="600px"
      >
      <el-form label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名：">
              <el-input v-model="formData.username" placeholder="请输入用户名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称：">
              <el-input v-model="formData.nickname" placeholder="请输入昵称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色：">
              <el-select multiple  v-model="formData.roleIds" placeholder="请选择角色" style="width:100%">
                <el-option 
                  v-for="(item,index) in roleOptions"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码：">
              <el-input v-model="formData.password" placeholder="请输入密码" show-password/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog.visible = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { BasicTable } from '@/components/BasicTable'
import { getUserList, postUserAdd, deleteUser } from '@/api/system/user'
import { getAllRoleList } from '@/api/system/role'
import { ref, reactive, onMounted } from 'vue'
import Md5 from 'md5'
export default {
  components: { BasicTable },
  setup(){
    const table = ref(null)
    const roleOptions = ref([])
    const formData = ref({
        roleIds: [],
        password: ''
    })
    const dialog = reactive({
      visible: false,
      type: ''
    })

    onMounted(() =>{
      getAllRoleList().then(res =>{
        roleOptions.value = res
      })
    })

    //新增或者编辑
    const handleEditAdd = (type, row) =>{
      dialog.visible = true
      dialog.type = type
      if(type == 'edit'){

      }
      
    }
    //添加
    const handleSubmit = () =>{
      if(dialog.type == 'add'){
        postUserAdd({
          ...formData.value,password: Md5(formData.value.password)
        }).then(res =>{
          dialog.visible = false
          table.value.handleRefresh()
        })
      }
    }
    return {
      table,
      dialog,
      formData,
      roleOptions,
      getUserList,
      deleteUser,
      handleEditAdd,
      handleSubmit,
      columns: [{
        title: '角色名',
        dataIndex: 'username',
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
      tableConfig: {
        name: '管理员管理'
      }
    }
  }
}
</script>
