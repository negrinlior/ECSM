import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    JWT:'',
    CurrPage:'hi'
  },
  getters:{
    GetUser: state=>{return state.user},
    GetCurrPage: state=>{return state.CurrPage},
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

    SetCurrPage: (state,PageName)=>
    {
        state.CurrPage=PageName;
    },
  },
  actions: {

  }
})
