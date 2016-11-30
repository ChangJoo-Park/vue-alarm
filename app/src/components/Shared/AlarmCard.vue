<template lang="pug">
  el-card(:body-style="{ padding: '10px 20px' }")
    div(slot="header")
      el-row(type="flex", justify="space-between", align="middle")
        el-col(:span=18)
          h3.alarm--card--time {{alarm.time}}
        el-col.alarm--card--switch(:span=6)
          el-switch(v-model="isTimerOn", on-text="", off-text="", v-on:change="switchChanged")
      el-row
        el-col(:span=24)
          p.alarm--card--message(v-if="alarm.message") {{alarm.message}}
    div
      el-row.footer(type="flex", justify="space-between", align="middle")
        el-col(:span=14)
          span.alarm--card--date {{alarmDate}}
        el-col.alarm--card--buttons(:span=10)
          el-button(:plain="true", type="info", icon="edit" size="small", @click.native="editAlarm")
          el-button(:plain="true", type="danger", icon="delete2", size="small", @click.native="deleteAlarm")
</template>

<script>
export default {
  props: ['alarm'],
  created: function () {
    this.isTimerOn = this.alarm.isOn
  },
  data () {
    return {
      cardAlarm: function () {
        return this.alarm
      },
      isTimerOn: false,
      deleteDialogVisible: false
    }
  },
  methods: {
    switchChanged: function (isOn) {
      this.$store.dispatch('onOffAlarm', {alarm: this.alarm, isOn: isOn})
    },
    editAlarm: function () {
      this.$router.push({name: 'alarm-show', params: {alarm_id: this.alarm.alarmId}})
    },
    deleteAlarm: function () {
      this.$store.dispatch('deleteAlarm', this.alarm).then(() => {
        const message = this.$t('message.deleteSuccess')
        this.$message({
          showClose: true,
          message: message,
          duration: 1500,
          type: 'success'
        })
      })
    }
  },
  computed: {
    alarmDate: function () {
      let strAlarmDate = this.$t('alarmCard.date.atOnce')
      if (this.alarm.isOnce) {
        return strAlarmDate
      }
      if (!this.alarm.date && !this.alarm.date.isArray() && this.alarm.date.length === 0) {
        console.error(`[ParseNumberToDay] ${this.alarm.date} is not valid.`)
        return ''
      }
      // TODO: Helper로 뺴야하는데.. 어떻게 I18n도 같이 적용하지
      const isOnlyWeekend = this.alarm.date.includes('0') && this.alarm.date.includes('6')
      if (this.alarm.date.length === 7) {
        strAlarmDate = this.$t('alarmCard.date.everyday')
      } else if (this.alarm.date.length === 2 && isOnlyWeekend) {
        strAlarmDate = this.$t('alarmCard.date.weekend')
      } else if (this.alarm.date.length === 5 && !isOnlyWeekend) {
        strAlarmDate = this.$t('alarmCard.date.workday')
      } else {
        strAlarmDate = this.alarm.date.map((number) => {
          switch (parseInt(number, 10)) {
            case 0:
              return this.$t('days.sun')
            case 1:
              return this.$t('days.mon')
            case 2:
              return this.$t('days.tue')
            case 3:
              return this.$t('days.wed')
            case 4:
              return this.$t('days.thu')
            case 5:
              return this.$t('days.fri')
            case 6:
              return this.$t('days.sat')
            default:
              return ''
          }
        }).join(', ').trim()
      }
      return strAlarmDate
    }
  }
}
</script>

<style lang="scss" scoped>
.alarm--card--switch, .alarm--card--buttons {
  text-align: right;
}
.alarm--card--message {
  margin: 0;
  border-top: 1px solid #BFBFBF;
  padding: 0;
  padding-top: 1em;
  color: #BFBFBF;

}
</style>
