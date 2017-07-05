import { ImageTypes, MessageTypes } from '../mutation-types'
import convert from '@/lib/convert'
import store from '@/store'

const state = {
  all: []
}

// getters
const getters = {
  [ImageTypes.all]: state => state.all
}

// actions
const actions = {
  [ImageTypes.add] ({ commit }, image) {
    convert(image.url, Object.assign({}, image), function (datauri) {
      commit(ImageTypes.add, { format: image.format, datauri: datauri, size: image.size })
    },
    function (err) {
      store.dispatch(MessageTypes.add, { title: 'Failed to convert image!', content: err.toString(), klass: 'notification is-danger' })
    })
  },
  [ImageTypes.remove] ({ commit }, idx) {
    commit(ImageTypes.remove, idx)
  },
  [ImageTypes.clear] ({ commit }) {
    commit(ImageTypes.clear)
  }
}

// mutations must be synchronous
const mutations = {
  [ImageTypes.add] (state, image) {
    state.all.push(image)
  },
  [ImageTypes.remove] (state, idx) {
    state.all.splice(idx, 1)
  },
  [ImageTypes.clear] (state, idx) {
    state.all = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
