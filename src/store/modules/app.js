import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () =>({
    isCollapse: false,
  }),
  getters: {
    getIsCollapse(){
      return this.isCollapse
    }
  },
  actions: {
    changeCollapse() {
      this.isCollapse =  !this.isCollapse
    }
  }
})