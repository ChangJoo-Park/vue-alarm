export const mainCounter = state => state.counters.main
export const alarms = state => state.alarms.all
export const onAlarms = state => state.alarms.all.filter(alarm => alarm.isOn)
