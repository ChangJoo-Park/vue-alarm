import Dexie from 'dexie'

// Declare Database
let db = new Dexie('AlarmDatabase')
db.version(1).stores({ alarms: '++id,alarmId,time,date,isOnce,isOn,message' })

export default {
  fetchAlarms () {
    console.log('[API] : fetchAlarms')
    return db.alarms.toArray().then((alarms) => {
      console.log(alarms)
      return alarms
    })
  },
  fetchAlarm (alarmId) {
    console.log('[API] : fetchAlarm', alarmId)
    return db.alarms.toArray().then((alarms) => {
      return alarms.filter(alarm => alarm.alarmId === alarmId)
    })
  },
  addAlarm (newAlarm) {
    console.log('[API] : addAlarm')
    return db.alarms.add(newAlarm).then((alarmId) => {
      newAlarm.id = alarmId
      return newAlarm
    })
  },
  onOffAlarm (updatedAlarm, isOn) {
    console.log('[API] : onOffAlarm')
    return db.alarms.update(updatedAlarm.id, {isOn: isOn}).then((response) => {
      return response
    })
  },
  updateAlarm (updatedAlarm) {
    console.log('[API] : updateAlarm')
    return db.alarms.put(updatedAlarm).then((response) => {
      console.log(response)
      return response
    })
  },
  deleteAlarm (deletedAlarm) {
    console.log('[API] : deleteAlarm')
    return db.alarms.delete(deletedAlarm.id).then((response) => {
      return response
    })
  }
}
