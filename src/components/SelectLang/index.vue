<template>
    <el-dropdown>
        <TranslationOutlined style="color:#333;font-size:16px"/>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="change('zh')">简体中文</el-dropdown-item>
                <el-dropdown-item @click="change('en')">English</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script>
import { loadLanguageAsync } from '@/locales'
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n/index'
import { TranslationOutlined } from '@ant-design/icons-vue'
export default {
    components: { TranslationOutlined },
    setup(){
        const { t } = useI18n() 
        const change = (lang) =>{
            loadLanguageAsync(lang).then(res =>{
                ElMessage.success(t('message.lang'))
            })
        }
        return {
            change
        }
    }
}
</script>