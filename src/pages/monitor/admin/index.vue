<template>
  <div>
      <BasicTable 
        :columns="columns" 
        :getData="getOnline"
        :tableConfig="tableConfig"
        />
  </div>
</template>

<script>
import { BasicTable } from '@/components/BasicTable';
import { getOnline } from '@/api/monitor/admin'
export default {
    components: { BasicTable },
    setup(){

        return {
            columns: [],
            tableConfig:{
                name: '管理员管理'
            },
            getOnline
        }
    }
}
</script>
