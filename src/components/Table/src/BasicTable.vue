<template>
  <div class="table" ref="wrapRef">

    <div class="header">
        <div class="table-name">{{tableConfig.tableName}}</div>
        <div class="">
            <el-space direction="horizontal"  :size="10">
                <el-button type="primary" @click="handleChangeborder">{{tableConfig.border?'隐藏边框':'显示边框'}}</el-button>
                <el-button type="primary" @click="handleOpenLoading">开启loading</el-button>
                <el-button type="primary" @click="handleChangeStripe">{{tableConfig.stripe?'隐藏斑马纹':'显示斑马纹'}}</el-button>
                <el-tooltip effect="dark" content="刷新" placement="top">
                    <i class="el-icon-refresh-left" style="font-size:20px" @click="handleRefresh"/>
                </el-tooltip>
                <el-tooltip effect="dark" content="密度" placement="top">
                    <div>
                        <el-dropdown @command="handleCommand" trigger="click">
                            <ColumnHeightOutlined style="font-size:20px"/>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="medium">默认</el-dropdown-item>
                                    <el-dropdown-item command="small">中等</el-dropdown-item>
                                    <el-dropdown-item command="mini">紧凑</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </el-tooltip>
                <el-popover placement="bottom-start" :width="400" trigger="click">
                    <template #reference>
                         <i class="el-icon-setting" style="font-size:20px"/>
                    </template>
                    
                    <div class="setting">
                        <el-table
                            ref="multipleTable"
                            @select="handleSelectionChange" 
                            :data="columns" >
                            <el-table-column type="selection" width="40"></el-table-column>
                            <el-table-column prop="name" label="列展示"></el-table-column>
                        </el-table>
                       

                    </div>
                    
                </el-popover>
            </el-space>
        </div>
    </div>
    <el-table 
        v-bind="tableConfig"
        :data="tableData"
        v-loading="loading">
        <!-- 多选框 -->
        <el-table-column v-if="tableConfig.selection"  type="selection" width="55" align="center"></el-table-column>
        <!-- 序号列 -->
        <el-table-column v-if="tableConfig.index"  type="index" width="100" align="center" :index="1" :label="tableConfig.indexName || '序号'"></el-table-column>
        <!-- 文本 -->
        <template  v-for="(item,index) in columns">
            <el-table-column
                v-if="!item.hide"
                :key="index"
                :label="item.name"
                :prop="item.dataIndex"
                :sortable="item.sortable || false" 
                :align="item.align || 'left'"
                :width="item.width"
                :formatter="item.formatter"
                >
                    <template v-if="!item.formatter" #default="scope">
                        <slot v-if="item.slotname" :name="item.slotname" :soltval="scope.row" />
                        <span v-else>
                            {{ scope.row[item.dataIndex] }}
                        </span>
                    </template>
                </el-table-column>
        </template>
    </el-table>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import { ColumnHeightOutlined } from '@ant-design/icons-vue'
export default {
    components: { ColumnHeightOutlined },
    props:{
        tableData: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        },
        tableConfig: {
            type: Object,
            default: () => {
                return {
                    tableName: '默认名字',
                    selection: false,
                    index: false,
                    stripe: true,
                    border: true,
                    size: 'small',
                    showHeader: true
                }
            }
        },
        columns: {
            type: Array,
            default: () => []
        }
    },
    setup(props){

        const tableConfig = reactive(props.tableConfig)
        const columns = reactive(props.columns)
        const loading = ref(props.loading)
        const multipleTable = ref(null)
        const checkList = ref([])


        onMounted(() =>{
            columns.forEach(item =>{
                if(!item.hide){
                    multipleTable.value.toggleRowSelection(item)
                }
            })

        })

        const handleChangeborder = () =>{
            tableConfig.border = !tableConfig.border
        }
        const handleChangeStripe = () =>{
            tableConfig.stripe = !tableConfig.stripe
        }
        //刷新
        const handleRefresh = () =>{

        }
        const handleCommand = (command) =>{
            tableConfig.size = command
        }
        const handleSelectionChange = (val) =>{
            columns.map(item =>{
                item.hide = ! val.some(v=>v.dataIndex == item.dataIndex)
            })
        }
        const handleOpenLoading = () =>{
           loading.value = true
           setTimeout(() =>{
                loading.value = false
           },1500)
        }
        return {
            handleChangeborder,
            handleOpenLoading,
            handleChangeStripe,
            handleRefresh,
            handleCommand,
            handleSelectionChange,
            multipleTable,
            checkList,
            tableConfig,
            columns,
            loading
        }
    }
};
</script>

<style lang="scss" scoped>
.table{
    background-color: #fff;
    padding: 10px;
    .header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 40px;
    }
    .setting{
        .list{
            .item{
                display: flex;
                flex-direction: row;
            }
        }
    }
}
</style>