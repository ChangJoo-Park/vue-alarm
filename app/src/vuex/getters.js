import moment from 'moment'

export const mainCounter = state => state.counters.main
export const alarms = state => state.alarms.all
export const onAlarms = state => state.alarms.all.filter(alarm => alarm.isOn)
export const todayAlarms = state => state.alarms.all.filter((alarm) => {
  const splitAlarm = alarm.time.split(':').map(time => parseInt(time, 10))
  if (!splitAlarm && splitAlarm.length < 2) {
    return false
  }
  const alarmHour = splitAlarm[0]
  const alarmMinutes = splitAlarm[1]
  const current = moment()
  const today = current.format('e')
  const currentHour = current.hour()
  const currentMinutes = current.minutes()
  return alarm.isOn &&
         (alarm.isOnce || alarm.date.includes(today)) &&
         (alarmHour >= currentHour && alarmMinutes >= currentMinutes)
}).sort((a, b) => {
  return parseInt(a.time.replace(':', '')) - parseInt(b.time.replace(':', ''))
})
