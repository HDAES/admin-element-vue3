<template>
    <FullscreenOutlined v-if="isFullscreen" class="icon" @click="handleClick"/>
    <FullscreenExitOutlined v-else class="icon" @click="handleClick"/>
</template>

<script>
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue'
import screenfull from 'screenfull'
import { ElMessage } from 'element-plus'
import { onBeforeUnmount, onMounted, ref } from 'vue'
export default {
    name: 'Screenfull',
    components: { FullscreenOutlined, FullscreenExitOutlined },
    setup(){
        const isFullscreen = ref(false)
        onMounted(() =>{
            if (screenfull.isEnabled) {
                screenfull.on('change', () => isFullscreen.value = screenfull.isFullscreen)
            }
        })

        onBeforeUnmount(() =>{
            if (screenfull.isEnabled) {
                screenfull.off('change',  () => isFullscreen.value = screenfull.isFullscreen)
            }
        })
        const handleClick = () =>{
            if (!screenfull.isEnabled) {
                ElMessage({ message: '你的浏览器不支持全屏', type: 'warning' })
                return false
            }
            screenfull.toggle()
        }

        return {
            isFullscreen,
            handleClick
        }
    }
}
</script>
