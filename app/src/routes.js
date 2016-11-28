export default [
  {
    path: '/',
    name: 'alarms-index',
    component: require('components/AlarmsIndex')
  },
  {
    path: '/alarms/new',
    name: 'alarm-new',
    component: require('components/AlarmNew')
  },
  {
    path: '/alarms/:alarm_id',
    name: 'alarm-show',
    component: require('components/AlarmShow')
  }
]
