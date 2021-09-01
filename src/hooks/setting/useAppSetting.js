import { computed } from "vue";
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { useTagsViewStore } from '@/store/modules/tagsView'
export function useAppSetting() {
    const appStore = useAppStore()
    const permissionStore = usePermissionStore()
    const tagsViewStore = useTagsViewStore()
    const isCollapse = computed(() => appStore.getIsCollapse)
    const sidebarRouters = computed(() => permissionStore.getSidebarRouters)

    const visitedViews = computed(() => tagsViewStore.getVisitedViews)
    
    const addViews = (e) => tagsViewStore.addViews(e)
    const delView = (e) => tagsViewStore.delView(e)
    const closeLeftViews = (e) => tagsViewStore.closeLeftViews(e)
    const closeRightViews = (e) => tagsViewStore.closeRightViews(e)
    const closeOthersViews = (e) => tagsViewStore.closeOthersViews(e)
    
    const changeCollapse = () =>appStore.changeCollapse()

    return {
        isCollapse,
        sidebarRouters,
        visitedViews,
        changeCollapse,
        addViews,
        delView,
        closeLeftViews,
        closeRightViews,
        closeOthersViews,
    }
}