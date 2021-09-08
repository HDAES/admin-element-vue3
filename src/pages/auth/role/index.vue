<template>
  <div >
    <BasicTable 
     ref="basicTable"
     :columns="columns" 
     :edit-add="handleEditAdd"
     :getData="getRoleList"
     :delData="deleteRole"
     :cellClick="handleCellClick"
     :tableConfig="tableConfig"
     :haveSlot="true"
    >
    
      <template v-slot:card>
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>菜单分配</span>
              <el-button class="button" size="mini" :disabled="cellId == ''" type="primary" @click="hanldeSavePermissionIds">保存</el-button>
            </div>
          </template>

          <el-tree
            ref="tree"
            :data="optionsTree"
            show-checkbox
            node-key="id"
            check-strictly
            :props="defaultProps"
            empty-text="加载中,请稍等"
            >
          </el-tree>
        </el-card>
      </template>
    </BasicTable>
   

    <el-dialog
      title="添加角色"
      v-model="dialog.visible"
      width="600px"
      @closed="closed"
      >
      <el-form :model="ruleForm" :rules="rules" ref="refForm" label-width="80px">
        <el-form-item v-if="dialog.type == 'edit'" label="ID：">
          <el-input v-model="ruleForm.id" disabled placeholder="请输入角色名"/>
        </el-form-item>
        <el-form-item label="角色名：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入角色名"/>
        </el-form-item>
        <el-form-item label="描述：" prop="description">
          <el-input v-model="ruleForm.description" placeholder="请输入描述"/>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog.visible = false">取 消</el-button>
          <el-button type="primary" @click="handleDetermine">确 定</el-button>
        </span>
      </template>
    </el-dialog>
     
  </div>
</template>

<script>
import { BasicTable } from '@/components/BasicTable'
import { getPermissionTree } from '@/api/system/menu'
import { getRoleList, postRoleAdd,deleteRole, putRole, putPermission } from '@/api/system/role'
import { ref,reactive, onMounted } from 'vue'
export default {
  components: { BasicTable },
  setup(){
    
    const dialog = reactive({
      visible: false,
      type: ''
    })
    const optionsTree = ref([])
    const refForm = ref('')
    const basicTable = ref('')
    const tree = ref('')
    const cellId = ref('')
    const ruleForm = ref({
      name: '',
      description: ''
    })

    onMounted(()=>{
      getPermissionTree().then(res =>{
        optionsTree.value = res
      })
    })

    //确定
    const handleDetermine = () =>{
      refForm.value.validate(valid =>{
        if (valid) {
          if(dialog.type == 'add'){
            postRoleAdd(ruleForm.value).then(res =>{
              dialog.visible = false
              basicTable.value.handleRefresh()
            })
          }else{
            putRole(ruleForm.value).then(res =>{
              dialog.visible = false
              basicTable.value.handleRefresh()
            })
          }
        } else {
          return false;
        }
      })
    }


    //添加编辑回调
    const handleEditAdd = (type, row) =>{
      dialog.visible = true
      dialog.type = type
      if(type == 'edit'){
        ruleForm.value = {
          name: row.name,
          description: row.description,
          id: row.id
        }
      }
    }

    //单元格点击
    const handleCellClick = (e) =>{
      cellId.value = e.id
      let temp = []
      e.permissions.forEach(item =>{
        temp.push(item.id)
      })
      tree.value.setCheckedKeys(temp)
    }

    //保存权限
    const hanldeSavePermissionIds = () =>{
      putPermission({
        id: cellId.value,
        permissionIds: tree.value.getCheckedKeys()
      }).then(res =>{
        basicTable.value.handleRefresh()
      })
    }
    //关闭弹窗
    const closed = () =>{
      ruleForm.value ={
        name: '',
        description: '' 
      }
    }
    return {
      getRoleList,
      deleteRole,
      dialog,
      ruleForm,
      refForm,
      basicTable,
      optionsTree,
      tree,
      cellId,
      handleDetermine,
      handleEditAdd,
      handleCellClick,
      hanldeSavePermissionIds,
      closed,
      defaultProps:{
        children: 'children',
        label: 'name'
      },
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
        width: 150,
        align: 'center',
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
      },
      tableConfig:{
        name: '角色管理'
      }
    }
  }
}
</script>
