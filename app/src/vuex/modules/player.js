import * as types from '../mutation-types'

const state = {
  player: {
    volume: 0,
    file: '',
    base: ''
  }
}

const mutations = {
  [types.PLAY_ALARM] (state) {
  },
  [types.STOP_ALARM] (state) {
  }
}

export default {
  state,
  mutations
}
