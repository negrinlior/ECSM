import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    JWT:''
  },
  getters:{
    GetUser: state=>{return state.user},
    GetUserFirstChar: state=>{return state.user.substring(0, 1)}
  },
  mutations: {
    SetUser: (state,UserName)=>
    {
        state.user=UserName;
    },

    SetJWT: (state,newJWT)=>
    {
        state.JWT=newJWT;
    },
  },
  actions: {

  }
})
