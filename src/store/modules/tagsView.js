import { defineStore } from 'pinia'

export const useTagsViewStore = defineStore({
    id: 'tagsView',
    state: () =>({
        visitedViews: [],
        cachedViews: []
    }),
    getters: {
        getVisitedViews(){
            return this.visitedViews
        }
    },
    actions: {
        //添加标签
        addViews(view){
            if(this.visitedViews.some(v => v.path === view.path)) return 
            this.visitedViews.push(
                Object.assign({}, view, {
                    title: view.meta.title || 'no-name'
                })
            )
        }
    }
})