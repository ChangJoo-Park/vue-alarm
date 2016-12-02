import moment from 'moment'

export const mainCounter = state => state.counters.main
export const alarms = state => state.alarms.all
export const onAlarms = state => state.alarms.all.filter(alarm => alarm.isOn)
export const todayAlarms = state => state.alarms.all.filter((alarm) => {
  const splitAlarm = alarm.time.split(':').map(time => parseInt(time, 10))
  if (!splitAlarm && splitAlarm.length < 2) {
    return false
  }
  const current = moment()
  const alarmTime = moment(alarm.time, 'HH:mm')
  const alarmToday = alarm.isOnce || alarm.date.includes(current.format('e'))
  const isAfterTime = alarmTime.isAfter(current)
  return alarm.isOn && alarmToday && isAfterTime
}).sort((a, b) => {
  return parseInt(a.time.replace(':', '')) - parseInt(b.time.replace(':', ''))
})
