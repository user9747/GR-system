import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const LOGIN = "LOGIN"
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const LOGOUT = "LOGOUT"
const LOGIN_FAILED = "LOGIN_FAILED"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem("token")?true:false
  },
  mutations: {
    [LOGIN](state){
      state.pending = true
    },
    [LOGIN_SUCCESS](state){
      state.isLoggedIn = true
      state.pending = false
    },
    [LOGIN_FAILED](state){
      state.pending = false
    },
    [LOGOUT](state){
      state.isLoggedIn = false
    }
  },
  actions: {
    login({ commit }, creds){
      commit(LOGIN)
      return new Promise((resolve,reject) => {
        axios({
          method:'post',
          url:'http://localhost:3000/auth/login',
          data:{
            username:creds.userName,
            password:creds.password,
          }
        }).then(function(res){
            console.log(res)
            if(res.data.error){
              console.log("error in logging in");
              commit(LOGIN_FAILED)
              reject(new Error(res.data.error))
            }
            localStorage.setItem("username",res.data.username)
            localStorage.setItem("token",res.data.token)
            commit(LOGIN_SUCCESS)
            resolve()
          }).catch((err)=>{
            console.log(err.message)
            reject(err)
          })
      })
    },
    celllogin({ commit }, creds){
      commit(LOGIN)
      return new Promise((resolve,reject) => {
        axios({
          method:'post',
          url:'http://localhost:3000/auth/celllogin',
          data:{
            username:creds.userName,
            password:creds.password,
          }
        }).then(function(res){
            console.log(res)
            if(res.data.error){
              console.log("error in logging in");
              commit(LOGIN_FAILED)
              reject(new Error(res.data.error))
            }
            localStorage.setItem("username",res.data.username)
            localStorage.setItem("token",res.data.token)
            commit(LOGIN_SUCCESS)
            resolve()
          }).catch((err)=>{
            console.log(err.message)
            reject(err)
          })
      })
    },
    logout({ commit }){
      localStorage.removeItem("username")
      localStorage.removeItem("token")
      commit(LOGOUT)
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    }
  }
})
