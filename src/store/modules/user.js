import { defineStore } from 'pinia'
import { putUserLogin, getUserInfo } from '@/api/system/login'
import { setToken as setAuthToken, getToken, removeToken } from '@/utils/auth'

export const useUserStore = defineStore({
  id: 'user',
  state: () =>({
    token: getToken(),
    roles: [],
    permissions: []
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
    setRoles(roles) {
      this.roles = roles
    },
    async login(data){
      return new Promise((resolve, reject) =>{
        putUserLogin(data).then(res =>{
          setAuthToken(res.authorizationType + ' ' +res.authorization)
          this.setToken(res.authorizationType + ' ' +res.authorization)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetInfo(){
      return new Promise((resolve, reject) => {
        getUserInfo().then(res =>{
          console.log(res)
        })
        this.setRoles(['admin'])
        resolve(true)
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