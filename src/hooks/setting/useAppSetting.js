import { computed } from "vue";
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'

export function useAppSetting() {
    const appStore = useAppStore()
    const permissionStore = usePermissionStore()

    const isCollapse = computed(() => appStore.getIsCollapse)

    const sidebarRouters = computed(() => permissionStore.getSidebarRouters)

    function changeCollapse (){
        appStore.changeCollapse()
    }

    return {
        isCollapse,
        changeCollapse,
        sidebarRouters
    }
}