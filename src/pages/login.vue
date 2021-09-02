<template>
  <div class="login">
    <div class="login-box">
      <div class="title">{{$t('login_page.login')}}</div>
      <el-form class="login-form" :model="form" ref="ruleForm" :rules="rules" >
        <el-form-item prop="username">
          <el-input v-model="form.username"  prefix-icon="el-icon-user" :placeholder="$t('login_page.user_placeholder')"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" prefix-icon="el-icon-lock" autocomplete="off" :placeholder="$t('login_page.pass_word_placeholder')"/>
        </el-form-item>
        <el-form-item prop="code" class="code-item">
          <el-input v-model="form.code" @keyup.enter="submitForm"  prefix-icon="el-icon-key" autocomplete="off" :placeholder="$t('login_page.verify_placeholder')"/>
          <img style="width:100px;margin-left:20px" :src="verifyImageBase64" alt="code" @click="getVerify">
        </el-form-item>
        <el-form-item class="form-item-sb">
          <el-checkbox v-model="form.rememberMe">{{$t('login_page.remember')}}</el-checkbox>
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
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n/index'
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { getVerifyCode } from "@/api/system/login"
export default {
  setup(){
    const { t } = useI18n()
    const userStore = useUserStore()
    const router = useRouter()
    const loading = ref(loading)
    const verifyImageBase64 = ref('')
    const ruleForm = ref()
    const form = reactive({
      username: 'hades',
      password: '123456',
      code: '',
      verify: '',
      rememberMe: true
    })


    onMounted( () =>getVerify())

    const submitForm = () =>{
      ruleForm.value.validate((valid) => {
        if (valid) {
          userStore.login(form).then(res =>{
            router.push({ path: "/dashboard/analysis" })
          }).catch(error  =>{
            getVerify()
            form.code = ''
          })
        } else {
          return false;
        }
      })
    }

    const getVerify = () =>{
      getVerifyCode().then(res =>{
        form.verify = res.verify
        verifyImageBase64.value = 'data:image/jpg;base64,' + res.imageBase64
      })
    }

    return {
      loading,
      form,
      ruleForm,
      verifyImageBase64,
      submitForm,
      getVerify,
      rules:reactive({
        username: [
          { required: true, message: t('login_page.user_placeholder'), trigger: 'blur' },
        ],
        password: [
          { required: true, message: t('login_page.pass_word_placeholder'), trigger: 'blur' },
        ],
        code: [
          { required: true, message: t('login_page.verify_placeholder'), trigger: 'blur' },
        ]
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
