<template>
  <BasicTable :columns="columns" :getData="getRoleList" :tableConfig="tableConfig"/>
</template>

<script>
import { BasicTable } from "@/components/BasicTable";
import { getRoleList } from "@/api/system/role";
export default {
  components: { BasicTable },
  setup() {
    return {
      getRoleList,
      columns: [
        {
          title: "角色名",
          dataIndex: "name",
        },
        {
          title: "描述",
          dataIndex: "description",
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
        },
        {
          title: "更新时间",
          dataIndex: "updateTime",
        },
        {
          title: "操作",
          width: 150,
          align: "center",
          slotname: "operate",
        },
      ],
      tableConfig: {
        name: '角色列表'
      }
    };
  },
};
</script>

<style>
</style>