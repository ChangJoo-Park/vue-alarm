import * as types from './mutation-types'
import API from '../api'

function sortAlarmDate (date) {
  if (date && date.length > 0) {
    date = date.sort()
  }
  return date
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
  if (!newAlarm.isOnce) {
    newAlarm.date = sortAlarmDate(newAlarm.date)
  }

  API.addAlarm(newAlarm).then((alarm) => {
    commit(types.ADD_ALARM, alarm)
  })
}

export const onOffAlarm = ({ commit }, updatedAlarm) => {
  API.onOffAlarm(updatedAlarm.alarm, updatedAlarm.isOn).then((response) => {
    commit(types.ON_OFF_ALARM, {alarm: updatedAlarm.alarm, isOn: updatedAlarm.isOn})
  })
}

export const updateAlarm = ({ commit }, updatedAlarm) => {
  if (!updatedAlarm.isOnce) {
    updatedAlarm.date = sortAlarmDate(updatedAlarm.date)
  }
  API.updateAlarm(updatedAlarm).then((response) => {
    commit(types.UPDATE_ALARM, updatedAlarm)
  })
}

export const deleteAlarm = ({ commit }, deletedAlarm) => {
  API.deleteAlarm(deletedAlarm).then(() => {
    commit(types.DELETE_ALARM, deletedAlarm)
  })
}

// For Play Alarm

export const playAlarm = ({ commit }, alarmFile) => {
  console.log('[ACTION] PLAY Alarm')
  let audio = new Audio('./alarm.mp3')
  audio.play()
  commit(types.PLAY_ALARM, alarmFile)
}

export const stopAlarm = ({ commit }) => {
  console.log('[ACTION] STOP Alarm')
  commit(types.STOP_ALARM)
}
