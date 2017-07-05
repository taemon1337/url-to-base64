import Vue from 'vue'
import Vuex from 'vuex'
import messages from './modules/messages'
import images from './modules/images'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    messages,
    images
  },
  strict: debug
})
