import * as types from './mutation-types'
import API from '../api'

function sortAlarmDate (date) {
  if (date && date.length > 0) {
    date = date.sort()
  }
  return date
}
export const decrementMain = ({ commit }) => {
  commit(types.DECREMENT_MAIN_COUNTER)
}

export const incrementMain = ({ commit }) => {
  commit(types.INCREMENT_MAIN_COUNTER)
}

// For Alarms
export const fetchAlarms = ({ commit }) => {
  API.fetchAlarms().then((alarms) => {
    commit(types.FETCH_ALARMS, alarms)
  })
}
export const fetchAlarm = ({ commit }, alarmId) => {
  return API.fetchAlarm(alarmId)
}
export const addAlarm = ({ commit }, newAlarm) => {
  console.log('[Action] : action add Alarm')
  if (!newAlarm.isOnce) {
    newAlarm.date = sortAlarmDate(newAlarm.date)
  }

  API.addAlarm(newAlarm).then((alarm) => {
    console.log(alarm)
    commit(types.ADD_ALARM, alarm)
  })
}
export const onOffAlarm = ({ commit }, updatedAlarm) => {
  console.log('onOffAlarm', updatedAlarm)
  API.onOffAlarm(updatedAlarm.alarm, updatedAlarm.isOn).then((response) => {
    commit(types.ON_OFF_ALARM, {alarm: updatedAlarm.alarm, isOn: updatedAlarm.isOn})
  })
}
export const updateAlarm = ({ commit }, updatedAlarm) => {
  console.log('[Action] : action update Alarm')
  if (!updatedAlarm.isOnce) {
    updatedAlarm.date = sortAlarmDate(updatedAlarm.date)
  }
  API.updateAlarm(updatedAlarm).then((response) => {
    commit(types.UPDATE_ALARM, updatedAlarm)
  })
}

export const deleteAlarm = ({ commit }, deletedAlarm) => {
  console.log('[Action] : action delete Alarm')
  API.deleteAlarm(deletedAlarm).then(() => {
    commit(types.DELETE_ALARM, deletedAlarm)
  })
}
