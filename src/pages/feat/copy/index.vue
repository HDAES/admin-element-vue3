<template>
  <div>
      <el-card header="粘贴板">
           <el-input placeholder="请输入内容" v-model="text">
                <template #append>
                    <el-button icon="el-icon-s-claim"></el-button>
                </template>
            </el-input>
      </el-card>
  </div>
</template>

<script>
import { ref } from 'vue' 
export default {
    setup(){
        const text = ref('')
        return {
            text
        }
    }
}
</script>
