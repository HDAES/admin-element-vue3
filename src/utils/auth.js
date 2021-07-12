import storage from 'store'

const TokenKey = 'Admin-Token'

export function getToken(){
    return storage.get(TokenKey)
}

export function setToken(token){
    return storage.set(TokenKey,token)
}

export function removeToken(){
    return storage.remove(TokenKey)
}