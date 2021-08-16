<template>
  <div>
     <BasicTable 
     :columns="columns" 
     :getData="getPermissionTree"
     :edit-add="handleEditAdd"
    />

    <el-dialog
      title="编辑菜单"
      width="600px"
      v-model="dialog.visible"
      >
        <el-form label-width="110px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="菜单类型：">
                <el-radio-group v-model="formData.type">
                  <el-radio-button :label="0">目录</el-radio-button>
                  <el-radio-button :label="1">菜单</el-radio-button>
                  <el-radio-button :label="2">按钮</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="formData.type == 2">
              <el-form-item label="按钮名称：">
                <el-input v-model="formData.name" placeholder="请输入按钮名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="菜单图标">

              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
  </div>
</template>

<script>
import { BasicTable } from '@/components/BasicTable'
import { getPermissionTree } from '@/api/system/menu'
import { reactive, ref } from 'vue'
export default {
  components: { BasicTable },
  setup(){
    
    const formData = ref({
      type: 0,
      name: ''
    })

    const dialog = reactive({
      visible: false,
      type: ''
    })

    //编辑添加
    const handleEditAdd = (type, row) =>{
      dialog.visible = true
      dialog.type = type

    }
    return {
      dialog,
      formData,
      getPermissionTree,
      handleEditAdd,
      columns:[{
        title: '权限管理',
        dataIndex: 'name',
      },{
        title: '图标',
        dataIndex: 'icon',
      },{
        title: '排序',
        dataIndex: 'sort'
      },{
        title: '权限标识',
        dataIndex: 'permission'
      },{
        title: '组件路径',
        dataIndex: 'component'
      },{
        title: '请求方式',
        dataIndex: 'method'
      },{
        title: '地址',
        dataIndex: 'path'
      },{
        title: '类型',
        dataIndex: 'type',
        formatter: ({type}) => type == 1? '页面': '按钮'
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
