import * as types from '../mutation-types'

const state = {
  all: []
}

const mutations = {
  [types.FETCH_ALARMS] (state, alarms) {
    state.all = alarms
  },
  [types.ADD_ALARM] (state, alarm) {
    console.log('[MUTATION] ADD NEW ALARM')
    // FIXME: 왜 push, concat이 안되지????
    // TODO: push , concat이 새로 assign 하는건지 확인
    if (!alarm.isOnce && alarm.date && alarm.date.length > 0) {
      // Sort
      alarm.date = alarm.date.sort()
    }
    state.all[state.all.length] = alarm
  },
  [types.UPDATE_ALARM] (state, updatedAlarm) {
    console.log('[MUTATION] UPDATE ALARM')
    const targetAlarm = state.all.find((alarm) => {
      return alarm.id === updatedAlarm.id
    })
    const targetAlarmIndex = state.all.indexOf(targetAlarm)
    if (!updatedAlarm.isOnce &&
        updatedAlarm.date &&
        updatedAlarm.date.length > 0) {
      updatedAlarm.date = updatedAlarm.date.sort()
    }
    state.all[targetAlarmIndex] = updatedAlarm
  },
  [types.ON_OFF_ALARM] (state, updatedAlarm) {
    console.log('[MUTATION] ON_OFF_ALARM')
    const targetAlarm = state.all.find((alarm) => {
      return alarm.id === updatedAlarm.alarm.id
    })
    const targetAlarmIndex = state.all.indexOf(targetAlarm)
    state.all[targetAlarmIndex].isOn = updatedAlarm.isOn
  },
  [types.DELETE_ALARM] (state, alarm) {
    console.log('[MUTATION] DELETE ALARM')
    const targetAlarmIndex = state.all.indexOf(alarm)
    state.all.splice(targetAlarmIndex, 1)
  }
}

export default {
  state,
  mutations
}
