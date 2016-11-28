import Dexie from 'dexie'

// Declare Database
let db = new Dexie('AlarmDatabase')
db.version(1).stores({ alarms: '++id,alarmId,time,date,isOnce,isOn,message' })

export default {
  fetchAlarms () {
    return db.alarms.toArray().then((alarms) => {
      return alarms
    })
  },
  fetchAlarm (alarmId) {
    return db.alarms.toArray().then((alarms) => {
      return alarms.filter(alarm => alarm.alarmId === alarmId)
    })
  },
  addAlarm (newAlarm) {
    return db.alarms.add(newAlarm).then((alarmId) => {
      newAlarm.id = alarmId
      return newAlarm
    })
  },
  onOffAlarm (updatedAlarm, isOn) {
    return db.alarms.update(updatedAlarm.id, {isOn: isOn}).then((response) => {
      return response
    })
  },
  updateAlarm (updatedAlarm) {
    return db.alarms.put(updatedAlarm).then((response) => {
      return response
    })
  },
  deleteAlarm (deletedAlarm) {
    return db.alarms.delete(deletedAlarm.id).then((response) => {
      return response
    })
  }
}
