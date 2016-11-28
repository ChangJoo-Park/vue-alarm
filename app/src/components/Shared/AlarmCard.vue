<template lang="pug">
  el-card(:body-style="{ padding: '10px 20px' }")
    div(slot="header")
      el-row(type="flex", justify="space-between", align="middle")
        el-col(:span=18)
          h3.alarm--card--time {{alarm.time}}
        el-col.alarm--card-switch(:span=6)
          el-switch(v-model="isTimerOn", on-text="", off-text="", v-on:change="switchChanged")
      el-row(type="flex", justify="space-between", align="middle")
        el-col(:span=24)
          p.alarm--card--message(v-if="alarm.message") {{alarm.message}}
    div
      el-row.footer(type="flex", justify="space-between", align="middle")
        el-col(:span=14)
          span.alarm--card--date {{alarmDate}}
        el-col.alarm--card-buttons(:span=10)
          el-button(:plain="true", type="info", icon="edit" size="small", @click.native="editAlarm")
          el-button(:plain="true", type="danger", icon="delete2", size="small", @click.native="deleteAlarm")
</template>

<script>
import helper from '../../helpers'

export default {
  props: ['alarm'],
  components: {},
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
        this.$message({
          message: '성공적으로 삭제하였습니다.',
          type: 'success',
          duration: 1000
        })
      })
    }
  },
  computed: {
    alarmDate: function () {
      let strAlarmDate = '한번만 울림'
      if (this.alarm.isOnce) {
        return strAlarmDate
      }
      strAlarmDate = helper.parseNumberToDay(this.alarm.date)
      return strAlarmDate
    }
  }
}
</script>

<style lang="scss" scoped>
.alarm--card--time {

}

.alarm--card-switch, .alarm--card-buttons {
  text-align: right;
}

.alarm--card--message {
  margin: 0;
  border-top: 1px solid #8492A6;
  padding: 0;
  padding-top: 1em;
  color: #8492A6;

}
</style>
