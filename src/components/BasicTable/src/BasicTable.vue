<template>
  <div class="basic-table">
    
    <div class="table-header">
      <el-space wrap>
        <el-button icon="el-icon-plus" @click="editAdd('add')">新增</el-button>
        <el-button icon="el-icon-edit" :disabled="selectList.length != 1">修改</el-button>
        <el-button icon="el-icon-delete" :disabled="selectList.length == 0" @click="handleDelBtn('multiple')">删除</el-button>
        <el-button icon="el-icon-download">导出</el-button>
      </el-space>
      <el-button-group>
        <el-button icon="el-icon-search"></el-button>
        <el-tooltip effect="dark" content="刷新列表" placement="top-start">
          <el-button icon="el-icon-refresh-right" :loading="loading" @click="handleRefresh"/>
        </el-tooltip>
        
        <ColumnSetting v-model:columns="columns" v-model:tableConfig="tableConfig"/>

        <el-popover placement="bottom-start" :width="300" trigger="click">
          <template #reference>
            <el-button icon="el-icon-setting" />
          </template>
          <div class="table-setting">
            <div class="setting-item">
              <span class="label">尺寸：</span>
              <el-radio-group v-model="tableConfig.size">
                <el-radio label="medium">默认</el-radio>
                <el-radio label="small">中等</el-radio>
                <el-radio label="mini">紧凑</el-radio>
              </el-radio-group>
            </div>
            <div class="setting-item">
              <span class="label">斑马线：</span>
              <el-switch v-model="tableConfig.stripe" active-color="#13ce66" inactive-color="#ff4949" />
            </div>
            <div class="setting-item">
              <span class="label">边框：</span>
              <el-switch v-model="tableConfig.border" active-color="#13ce66" inactive-color="#ff4949" />
            </div>
            <div class="setting-item">
              <span class="label">头部：</span>
              <el-switch v-model="tableConfig.showHeader" active-color="#13ce66" inactive-color="#ff4949" />
            </div>
            <div class="setting-item">
              <span class="label">序号：</span>
              <el-switch v-model="tableConfig.index" active-color="#13ce66" inactive-color="#ff4949" />
            </div>
          </div>
        </el-popover>
      </el-button-group>
    </div>
    
     <el-row :gutter="24" style="margin-top: 15px;">
        <el-col :span="haveSlot?18:24">
          <el-card :header="tableConfig.name" shadow="never" >
            <el-table 
                :data="tableData" 
                v-loading="loading" 
                v-bind="tableConfig" 
                ref="table"
                row-key="id"
                @selection-change="handleSelectionChange"
                @cell-click="handleCellClick"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                header-row-class-name="hades-table-header">
                <!-- 多选框 -->
                <el-table-column v-if="tableConfig.selection" type="selection" width="55" align="center"/>
                <!-- 序号列 -->
                <el-table-column v-if="tableConfig.index&&pagination.total>0"  type="index" width="100" align="center" :index="1" :label="tableConfig.indexName || '序号'"></el-table-column>
                <!-- 文本 -->
                <template v-for="(item,index) in columns">
                  <el-table-column
                    v-if="item.show"
                    :key="index"
                    :label="item.title"
                    :prop="item.dataIndex"
                    :sortable="item.sortable || false" 
                    :align="item.align || 'left'"
                    :width="item.width"
                    :formatter="item.formatter"
                    >
                      <template v-if="!item.formatter" #default="scope">
                        <template v-if="item.slotname">
                          <el-button type="text" @click="editAdd('edit',scope.row)">编辑</el-button>
                          <el-button type="text" style="color:#f00" @click="handleDelBtn('single',scope.row)">删除</el-button>
                          <slot :name="item.slotname" :row="scope.row" />
                        </template>
                        <span v-else>
                            {{ scope.row[item.dataIndex] }}
                        </span>
                      </template>
                    </el-table-column>
                </template>
              </el-table>
            <!-- 分页 -->
            <el-pagination 
              v-if="pagination.total>0"
              style="margin-top:20px"
              :background="true"
              :total="pagination.total" 
              layout="total,->, sizes, prev, pager, next, jumper"
              v-model:currentPage="pagination.currentPage" 
              v-model:pageSize="pagination.pageSize"/>
          </el-card>
        </el-col>
        <el-col :span="6" v-if="haveSlot">
          <slot name="card"/>
        </el-col>
      </el-row>

    
  </div>
</template>

<script>
import { ref, reactive, watchEffect, onMounted } from 'vue';
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';
import ColumnSetting from './ColumnSetting.vue'
export default {
  components: { ColumnSetting },
  props:{
    columns: {
      type: Array,
      default: () => []
    },
    getData: {
      type: Function
    },
    delData: {
      type: Function
    },
    tableConfig: {
      type: Object
    },
    //编辑或者新增 事件
    editAdd: {
      type: Function
    },
    //删除时 主键id
    deleteKey: {
      type: String,
      default: 'id'
    },
    //删除时 主键name
    deleteName: {
      type: String,
      default: 'name'
    },
    haveSlot: {
      type: Boolean,
      default: false
    },
    //单元格点击事件
    cellClick: {
      type: Function
    }
  },
  setup(props){
    const defaultConfig = {
      name: '默认名字',
      stripe: true,
      border: false,
      size: 'small',
      showHeader: true,
      index: true,
      selection: true
    }
    const tableConfig = reactive({...defaultConfig,...props.tableConfig})
    const table = ref(null)
    const selectList = ref([])
    const columns = ref(props.columns)
    const loading = ref(false)
    const refresh = ref(false)
    const tableData = ref([])
    const tempFormData = reactive({})
    const pagination = reactive({
      total: 0,
      currentPage: 1,
      pageSize: 10
    })

    watchEffect(() =>{
      loading.value = true
      refresh.value 
      props.getData({
          page: pagination.currentPage,
          size: pagination.pageSize,
          ...tempFormData
      }).then(res =>{
        if(res instanceof Array){
          tableData.value = res
        }else{
          pagination.total = res.total
          pagination.currentPage = res.page
          pagination.pageSize = res.size
          tableData.value = res.list
        }
         
          loading.value = false
      })
    })

    onMounted(() =>{
      columns.value.forEach(item =>{
        item.show = true
      })
    })

    

    //table选状态改变
    const handleSelectionChange = (val) =>{
      selectList.value = val
    }
    //删除按钮点击
    const handleDelBtn = (type, row) =>{
      let title = []
      let ids = []
      if(type == 'single'){
        title = row[props.deleteName]
        ids = [row[props.deleteKey]]
      }else if(type == 'multiple'){
        selectList.value.forEach(item => {
          ids.push(item[props.deleteKey])
          title.push(item[props.deleteName])
        })
      }
      ElMessageBox.confirm(`此操作将永久删除 ${title} , 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        props.delData({ids: ids.toString()}).then(res =>{
          table.value.clearSelection();
          handleRefresh();
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消'
        })
      })
    }
    //刷新列表
    const handleRefresh = () =>{
      refresh.value = ! refresh.value 
    }
    
    return {
      table,
      columns,
      tableData,
      selectList,
      loading,
      tableConfig,
      pagination,
      handleRefresh,
      handleDelBtn,
      handleSelectionChange,
      editAdd: props.editAdd,
      handleCellClick: props.cellClick,
      haveSlot: props.haveSlot
      
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-table{
  background-color: #fff;
  padding: 10px;
  .table-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
  }
}
</style>
