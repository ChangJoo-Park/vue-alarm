export default {
  parseNumberToDay (date) {
    if (!date && !date.isArray() && date.length === 0) {
      console.error(`[ParseNumberToDay] ${date} is not valid.`)
      return ''
    }
    let strAlarmDate = ''
    const isOnlyWeekend = date.includes('0') && date.includes('6')
    if (date.length === 7) {
      strAlarmDate = '매일 알림'
    } else if (date.length === 2 && isOnlyWeekend) {
      strAlarmDate = '주말에만 알림'
    } else if (date.length === 5 && !isOnlyWeekend) {
      strAlarmDate = '주중에만 알림'
    } else {
      strAlarmDate = date.map((number) => {
        switch (parseInt(number, 10)) {
          case 0:
            return '일'
          case 1:
            return '월'
          case 2:
            return '화'
          case 3:
            return '수'
          case 4:
            return '목'
          case 5:
            return '금'
          case 6:
            return '토'
          default:
            return ''
        }
      }).join(', ').trim()
    }
    return strAlarmDate
  },
  validateDate (date) {
    return ''
  }
}
