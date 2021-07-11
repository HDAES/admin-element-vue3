<template>
  <div>
   <h1> {{ $t('header_menu.logout') }}</h1>
   <h1> {{ $t('header_menu.register') }}</h1>
   <h1> {{ $t('header_menu.login') }}</h1>
    <select-lang/>
    <el-date-picker
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
</template>

<script>

import SelectLang from '@/components/SelectLang'

export default {
  components:{ SelectLang },
}
</script>