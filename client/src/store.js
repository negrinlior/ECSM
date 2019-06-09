import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    JWT:''
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

  },
  getters:{
    GetUserFirstChar: state=>{state.user.substring(0, 1)}
  }
})
