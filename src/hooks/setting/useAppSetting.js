import { computed } from "vue";
import { useAppStore } from '@/store/modules/app'

export function useAppSetting() {
    const appStore = useAppStore()
    
    const isCollapse = computed(() => appStore.getIsCollapse)

    function changeCollapse (){
        appStore.changeCollapse()
    }

    

    return {
        isCollapse,
        changeCollapse
    }
}