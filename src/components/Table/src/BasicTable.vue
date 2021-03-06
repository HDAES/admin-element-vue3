<template>
  <div class="table" ref="wrapRef">

    <div v-if="searchForm.length >0">
        <el-row :gutter="20">
            <el-col v-for="item in searchForm" :key="item.name" :span="3" >
                <el-input v-if="item.type == 'IS'" v-model="formData[item.file]" :placeholder="item.placeholder" >
                    <template #append>
                        <el-button icon="el-icon-search" @click="handleSearch"></el-button>
                    </template>
                </el-input>
            </el-col>
        </el-row>
        <el-form :inline="true" style="margin-top:10px">
            <template v-for="item in searchForm" :key="item.name"> 
                <el-form-item :label="item.label" v-if="item.type == 'FS'">
                    <el-select v-model="formData[item.file]" >
                        <el-option 
                            v-for="(itm,idx) in item.options"
                            :key="idx"
                            :label="itm.label"
                            :value="itm.value"
                            />
                    </el-select>
                </el-form-item>
            </template>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearch">搜索</el-button>
                <el-button  size="mini" icon="el-icon-refresh" :loading="loading" @click="handleReset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>


    <div class="header">
        <div class="table-name">
            {{tableConfig.tableName}}
            <el-tooltip class="item" effect="dark" :content="tableConfig.subName" placement="top-start">
                <i class="el-icon-warning-outline"/>
            </el-tooltip>
        </div>
        <div class="">
            <el-space direction="horizontal"  :size="10">
                <el-button type="primary" v-if="!addBtnShow" @click="$emit('update:addVisible', true)">新增</el-button>
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
                <el-popover placement="bottom-start" :width="100" trigger="click">
                    <template #reference>
                         <i class="el-icon-setting" style="font-size:20px"/>
                    </template>
                    
                    <div class="setting">
                        <el-table
                            ref="multipleTable"
                            @selectAll="handleSelectionChange"
                            @select="handleSelectionChange" 
                            :data="columns" >
                            <el-table-column type="selection" width="40"></el-table-column>
                            <el-table-column prop="title" label="列展示"></el-table-column>
                        </el-table>
                    </div> 
                </el-popover>
            </el-space>
        </div>
    </div>
    <el-table 
        v-bind="tableConfig"
        :data="tableData"
        v-loading="loading"
        header-row-class-name="hades-table-header">
        <!-- 多选框 -->
        <el-table-column v-if="tableConfig.selection"  type="selection" width="55" align="center"></el-table-column>
        <!-- 序号列 -->
        <el-table-column v-if="tableConfig.index"  type="index" width="100" align="center" :index="1" :label="tableConfig.indexName || '序号'"></el-table-column>
        <!-- 文本 -->
        <template  v-for="(item,index) in columns">
            <el-table-column
                v-if="!item.hide"
                :key="index"
                :label="item.title"
                :prop="item.dataIndex"
                :sortable="item.sortable || false" 
                :align="item.align || 'left'"
                :width="item.width"
                :formatter="item.formatter"
                >
                    <template v-if="!item.formatter" #default="scope">
                        <slot v-if="item.slotname" :name="item.slotname" :row="scope.row" />
                        <span v-else>
                            {{ scope.row[item.dataIndex] }}
                        </span>
                    </template>
                </el-table-column>
        </template>
    </el-table>

    <!-- 分页 -->
    <el-pagination 
        style="margin-top:20px"
        :background="true"
        :total="pagination.total" 
        layout="total,->, sizes, prev, pager, next, jumper"
        v-model:currentPage="pagination.currentPage" 
        v-model:pageSize="pagination.pageSize"/>
  </div>
</template>

<script>
import { onMounted, reactive, ref, watchEffect } from 'vue'

import { ColumnHeightOutlined } from '@ant-design/icons-vue'
export default {
    components: { ColumnHeightOutlined },
    props:{
        loading: {
            type: Boolean,
            default: false
        },
        tableConfig: {
            type: Object
        },
        searchForm: {
            type: Array,
            default: []
        },
        columns: {
            type: Array,
            default: () => []
        },
        getData: {
            type: Function
        },
        addVisible: {
            type: Boolean,
            default: true
        }
    },
    setup(props){
        const defaultConfig = {
            tableName: '默认名字',
            subName: '',
            selection: false,
            index: false,
            stripe: true,
            border: false,
            size: 'small',
            showHeader: true
        }
        const tableConfig = reactive({...defaultConfig,...props.tableConfig} )
        const columns = reactive(props.columns)
        const loading = ref(props.loading)
        const refresh = ref(false)
        const addBtnShow = ref(props.addVisible)
        const tableData = ref([])
        const formData = reactive({})
        const tempFormData = reactive({})
        const pagination = reactive({
            total: 0,
            currentPage: 1,
            pageSize: 10
        })
        const multipleTable = ref(null)
        const checkList = ref([])

        watchEffect(() =>{
            loading.value = true
            refresh.value 
            props.getData({
                page: pagination.currentPage,
                size: pagination.pageSize,
                ...tempFormData
            }).then(res =>{
                pagination.total = res.total
                pagination.currentPage = res.page
                pagination.pageSize = res.size
                tableData.value = res.list
                loading.value = false
            })
        })
        onMounted(() =>{
            columns.forEach(item =>{
                if(!item.hide){
                    multipleTable.value.toggleRowSelection(item)
                }
            })
            //设置搜索参数
            props.searchForm.forEach(item =>{
               formData[item.file] = null
            })
        })

        //搜索
        const handleSearch = () => {
            for(let key in formData){
                tempFormData[key] = formData[key]
            }
        }
        //重置搜索条件
        const handleReset = () =>{
            props.searchForm.forEach(item =>{
               formData[item.file] = null
               tempFormData[item.file] = null
            })
            pagination.currentPage = 1
            pagination.pageSize = 10
        }
        const handleChangeborder = () =>{
            tableConfig.border = !tableConfig.border
        }
        const handleChangeStripe = () =>{
            tableConfig.stripe = !tableConfig.stripe
        }
        //刷新列表
        const handleRefresh = () =>{
           refresh.value = !refresh.value
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
            loading,
            pagination,
            tableData,
            addBtnShow,
            formData,
            handleSearch,
            handleReset
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