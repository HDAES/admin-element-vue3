<template>
  <div >
    <BasicTable 
     :columns="columns" 
     :getData="getUserList"
     :edit-add="handleEditAdd"
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
              <el-input placeholder="请输入用户名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称：">
              <el-input placeholder="请输入昵称"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
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
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { BasicTable } from '@/components/BasicTable'
import { getUserList } from '@/api/system/user'
import { getAllRoleList } from '@/api/system/role'
import { ref, reactive, onMounted } from 'vue'
export default {
  components: { BasicTable },
  setup(){
    const roleOptions = ref([])
    const formData = ref({
        roleIds: []
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
    }

    return {
      dialog,
      formData,
      roleOptions,
      getUserList,
      handleEditAdd,
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
      }]
    }
  }
}
</script>
