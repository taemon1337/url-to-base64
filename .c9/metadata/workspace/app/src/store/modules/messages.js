{"filter":false,"title":"messages.js","tooltip":"/app/src/store/modules/messages.js","undoManager":{"mark":1,"position":1,"stack":[[{"start":{"row":0,"column":0},"end":{"row":46,"column":1},"action":"insert","lines":["import { MessageTypes } from '../mutation-types'","","const state = {","  all: []","}","","// getters","const getters = {","  [MessageTypes.all]: state => state.all","}","","// actions","const actions = {","  [MessageTypes.add] ({ commit }, message) {","    commit(MessageTypes.add, message)","  },","  [MessageTypes.remove] ({ commit }, idx) {","    commit(MessageTypes.remove, idx)","  },","  [MessageTypes.clear] ({ commit }) {","    commit(MessageTypes.clear)","  }","}","","// mutations must be synchronous","const mutations = {","  [MessageTypes.add] (state, message) {","    if (message.title) {","      state.all.push(message)","    } else {","      console.error('Invalid Message, title is required', message)","    }","  },","  [MessageTypes.remove] (state, idx) {","    state.all.splice(idx, 1)","  },","  [MessageTypes.clear] (state, idx) {","    state.all = []","  }","}","","export default {","  state,","  getters,","  actions,","  mutations","}"],"id":1}],[{"start":{"row":46,"column":1},"end":{"row":47,"column":0},"action":"insert","lines":["",""],"id":2}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":30,"column":66},"end":{"row":30,"column":66},"isBackwards":false},"options":{"tabSize":2,"useSoftTabs":true,"guessTabSize":false,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1499173819483,"hash":"9271cfb59f6c6783992931b424f8ff850755bd88"}