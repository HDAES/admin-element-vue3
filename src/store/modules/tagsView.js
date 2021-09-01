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
            let isHave = false
            this.visitedViews.forEach(item =>{
                if(view.path.indexOf(item.path) >-1){
                    item.active = true
                    isHave = true
                }else{
                    item.active = false
                }
            })
            if(!isHave){
                this.visitedViews.push(
                    Object.assign({}, view, {
                        active: true,
                        title: view.meta.title || 'no-name'
                    })
                )
            }
            return true
        },
        //删除标签
        delView(view){
            for(const [i, v] of this.visitedViews.entries()){
                if (v.path === view.path) {
                    this.visitedViews.splice(i, 1)
                    break
                }  
            }
        },
        //关闭左侧
        closeLeftViews(view){
            for(const [i, v] of this.visitedViews.entries()){
                if (v.path === view.path) {
                    this.visitedViews.splice(0,i)
                    break
                }  
            }
        },
        //关闭右侧
        closeRightViews(view){
            for(const [i, v] of this.visitedViews.entries()){
                if (v.path === view.path) {
                    this.visitedViews.splice(i,this.visitedViews.length)
                    break
                }  
            }
        },
        closeOthersViews(view){
            this.visitedViews = [{
                ...view,
                active: true,
                title: view.meta.title || 'no-name'
            }]
        }
    }
})