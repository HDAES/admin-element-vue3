<template>
  <el-select v-model="statusData" popper-class="select-tree">
    <el-option :value="statusValueData" style="height: auto">
        <el-tree :data="options" :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
    </el-option>
  </el-select>
</template>

<script>
import { ref } from 'vue'
export default {
    props:{
        options: {
            type: Array,
            default: []
        },
        defaultProps: {
            type: Object,
            default:  {
                children: 'children',
                label: 'name'
            }
        }
    },
    setup(props){
        
        const statusData = ref('')
        const statusValueData = ref('')

        const handleNodeClick = (data) =>{
            statusValueData.value = data.id
            statusData.value = data.name
        }
        return {
            statusData,
            handleNodeClick,
            defaultProps: props.defaultProps,
            options: props.options
        }

    }
}
</script>
