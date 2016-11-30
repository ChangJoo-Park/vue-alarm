import moment from 'moment'

export const mainCounter = state => state.counters.main
export const alarms = state => state.alarms.all
export const onAlarms = state => state.alarms.all.filter(alarm => alarm.isOn)
export const todayAlarms = state => state.alarms.all.filter((alarm) => {
  const today = moment().format('e')
  return alarm.isOnce || alarm.date.includes(today)
}).sort((a, b) => {
  return parseInt(a.time.replace(':', '')) - parseInt(b.time.replace(':', ''))
})
