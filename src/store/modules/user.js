import { defineStore } from 'pinia'
import { postLogin } from '@/api/user'
import { setToken as setAuthToken, getToken, removeToken } from '@/utils/auth'
import sha1 from 'sha1'
export const useUserStore = defineStore({
  id: 'user',
  state: () =>({
    token: getToken(),
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
    
    async login(data){
      return new Promise((resolve, reject) =>{
        postLogin({...data,password:sha1(data.password)}).then(res =>{
          setAuthToken(res.data.token)
          this.setToken(res.data.token)
        }).catch(error => {
          reject(error)
        })
      })
    },

    async loginOut(){
      return new Promise((resolve, reject) => {
        removeToken()
        this.setToken('')
        resolve()
      }).catch(error => {
        reject(error)
      })
    }
  }
})