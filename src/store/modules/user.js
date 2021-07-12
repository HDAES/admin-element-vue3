import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () =>({
    count: 0
  }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
    async login(params){
        
    }
  }
})