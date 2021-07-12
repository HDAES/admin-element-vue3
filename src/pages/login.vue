<template>
  <div class="login">
    <div class="login-box">
      <div class="title">{{$t('login_page.login')}}</div>
      <el-form class="login-form" :model="form" ref="ruleForm" :rules="rules" >
        <el-form-item prop="name">
          <el-input v-model="form.name"  prefix-icon="el-icon-user" :placeholder="$t('login_page.user_placeholder')"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" prefix-icon="el-icon-lock" autocomplete="off" :placeholder="$t('login_page.pass_word_placeholder')"/>
        </el-form-item>
        <el-form-item class="form-item-sb">
          <el-checkbox v-model="checked">{{$t('login_page.remember')}}</el-checkbox>
          <el-link type="primary">{{$t('login_page.forget')}}</el-link>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm" type="primary" :loading="loading" style="width:100%">{{$t('login_page.login')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n/index'
import { useUserStore } from '@/store/modules/user'
export default {
  setup(){
    const { t } = useI18n()
    const userStore = useUserStore()
    
    const checked = ref(false)
    const loading = ref(loading)
    const ruleForm = ref()
    const form = reactive({
      name: '',
      password: ''
    })

    const submitForm = () =>{
      ruleForm.value.validate((valid) => {
        if (valid) {
          userStore.login(form)
        } else {
          return false;
        }
      })
    }
    return {
      checked,
      loading,
      form,
      ruleForm,
      submitForm,
      rules:reactive({
        name: [
          { required: true, message: t('login_page.user_placeholder'), trigger: 'blur' },
        ],
        password: [
          { required: true, message: t('login_page.pass_word_placeholder'), trigger: 'blur' },
        ],
      })
    }
  }

};
</script>

<style lang="scss" scoped>
.login{
  height: 100%;
  .login-box{
    position: absolute;
    right: 200px;
    top:50%;
    transform: translateY(-50%);
    width: 400px;
    border-radius: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .title{
      font-size: 20px;
      text-align: center;
      margin-top: 20px;
    }
    .login-form{
      margin: 50px;
    }
  }
}
</style>
