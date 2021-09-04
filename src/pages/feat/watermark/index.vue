<template>
  <div>
    <el-card header="水印示例">
      <el-button type="primary" @click="handleCreate">Create</el-button>
      <el-button  @click="handleClear">Clear</el-button>
      <el-button @click="handleReset">Reset</el-button>
    </el-card>
  </div>
</template>

<script>
import watermark from '@/utils/watermark'
export default {
    setup(){
        const handleCreate = () =>{
            watermark.set('Watermark')
        }

        const handleClear = () =>{
            watermark.out()
        }

        const handleReset = () =>{
             watermark.set('Watermark')
        }
        return {
            handleCreate,
            handleClear,
            handleReset
        }
    }
};
</script>