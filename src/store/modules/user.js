import { defineStore } from 'pinia'
import { putUserLogin, getUserInfo } from '@/api/system/login'
import { setToken as setAuthToken, getToken, removeToken } from '@/utils/auth'
import md5 from 'md5'
export const useUserStore = defineStore({
  id: 'user',
  state: () =>({
    token: getToken(),
    roles: [],
    permissions: [],
    username: ''
  }),
  getters: {
    getUserName(){
      return this.username
    },
    getRoles(){
      return this.roles
    }
  },
  actions: {
    setToken(token) {
      this.token = token
    },
    setRoles(roles) {
      this.roles = roles
    },
    async login(data){
      return new Promise((resolve, reject) =>{
        putUserLogin({...data,password: md5(data.password)}).then(res =>{
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
          this.username = res.username
          this.setRoles(res.roles)
        })
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