import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

const LOGIN = "LOGIN"
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const LOGOUT = "LOGOUT"
const LOGIN_FAILED = "LOGIN_FAILED"
const setUserType = "setUserType"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem("token")!=undefined?true:false,
    userType:''
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
      state.userType = ''
    },
    [setUserType](state,type){
      console.log(type);
      
      state.userType = type
    },
  },
  plugins:[createPersistedState({
    paths: ['isLoggedIn', 'userType']
  })],
  actions: {
    login({ commit }, creds){
      commit(LOGIN)
      return new Promise((resolve,reject) => {
        axios({
          method:'post',
          url:process.env.VUE_APP_ROOT_API+'auth/login',
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
            else if(res.data.verified == false){
              console.log("User not verified")
              commit(LOGIN_FAILED)
              reject(new Error("User not verified"))
            }
            else{
            localStorage.setItem("username",res.data.username)
            localStorage.setItem("token",res.data.token)
            commit(LOGIN_SUCCESS)
            commit(setUserType, 'user')
            resolve()
            }
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
          url:process.env.VUE_APP_ROOT_API+'auth/celllogin',
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
            commit(setUserType,res.data.usertype)
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
    },
    bearerToken: state =>{
/*       console.log(localStorage.getItem("token"))
 */      return localStorage.getItem("token")
    },
    userName: state =>{
      return localStorage.getItem("username")
    },
    usertype: state => {
      return state.userType
    }
  }
})
