<template lang="pug">
  div
    AppHeader(v-bind:nowDate="currentDate", v-bind:nowTime="currentTime")
    SettingButton
    router-view
    //- Dialog Alarm
    el-dialog(
      :title="$t('alarmDialog.title')",
      v-model="alarmDialogVisible",
      size="full",
      v-on:open="alarmDialogOpen"
      v-on:close="alarmDialogClose"
    )
      span(v-if="currentAlarm.message") {{currentAlarm.message}}
      span(v-else) {{ $t('alarmDialog.noMessage') }}
      span(slot="footer")
        el-button.alarm--dialog--button(@click.native="alarmDialogVisible = false" type="danger", size="large") {{ $t('alarmDialog.alarmOff') }}
</template>

<script>
  import store from 'src/vuex/store'
  import { ipcRenderer } from 'electron'
  import { Howl } from 'howler'
  import { mapGetters } from 'vuex'
  import AppHeader from './components/Shared/Header'
  import SettingButton from './components/Shared/SettingButton'
  import moment from 'moment'
  import open from 'opn'

  function getValidDateTimeWithFormat (date, format) {
    const targetDate = moment(date).isValid() ? moment(date) : moment()
    return targetDate.format(format)
  }

  export default {
    store,
    created: function () {
      this.now = moment()
      this.nowInterval = window.setInterval(() => {
        this.now = moment()
        // Update Tray
      }, 1000)
      this.trayUpdate()
      ipcRenderer.on('async-reply-tray', (event, updatedAlarm) => {
        const targetAlarm = this.todayAlarms.filter((alarm) => alarm.alarmId === updatedAlarm.alarmId)
        if (targetAlarm.length >= 1) {
          this.$store.dispatch('onOffAlarm', {alarm: targetAlarm[0], isOn: !updatedAlarm.isOn})
        }
      })
    },
    components: {
      AppHeader,
      SettingButton
    },
    data: function () {
      return {
        now: '',
        player: '',
        nowInterval: '',
        currentAlarm: '',
        alarmDialogVisible: false
      }
    },
    watch: {
      currentTime: function () {
        if (!this.onAlarms && this.onAlarms.length === 0) {
          return
        }
        const currentDay = moment().format('e')
        const currentHour = this.now.hour()
        const currentMinutes = this.now.minute()
        for (let alarm of this.onAlarms) {
          // Check Day
          console.log(currentDay, alarm.date)
          const isAvailableDay = alarm.isOnce || alarm.date.includes(currentDay)
          console.log('is it available day ? ', isAvailableDay, 'is At once ? ', alarm.isOnce)
          if (!isAvailableDay) {
            console.log('return because not that day')
            continue
          }
          // Check Time
          let targetTime = alarm.time.split(':').map(time => parseInt(time, 10))
          if (currentHour !== targetTime[0]) {
            console.log('return because not that hour')
            continue
          }
          if (currentMinutes === targetTime[1]) {
            this.alarmDialogVisible = true
            this.currentAlarm = alarm
            return
          } else {
            console.log('return because not that minute')
          }
        }
      },
      todayAlarms: {
        // 참고: 실제 Today Alarms 내부가 변경되는 경우에는 업데이트가 일어나지 않는 경우
        // -> deep: true
        handler: function (val, oldVal) {
          this.trayUpdate()
        },
        deep: true
      }
    },
    computed: {
      ...mapGetters({
        onAlarms: 'onAlarms',
        todayAlarms: 'todayAlarms'
      }),
      currentDate () {
        return getValidDateTimeWithFormat(this.now, 'LL')
      },
      currentTime () {
        return getValidDateTimeWithFormat(this.now, 'LT')
      }
    },
    methods: {
      play: function () {
        this.player = new Howl({src: './alarm.mp3'})
        this.player.play()
      },
      stop: function () {
        if (this.player) {
          this.player.stop()
        }
      },
      alarmDialogOpen () {
        if (!this.currentAlarm) {
          return
        }
        // Setting에서 알람 파일 읽어옴
        this.play()
        if (this.currentAlarm.actions && this.currentAlarm.actions.length > 0) {
          for (let action of this.currentAlarm.actions) {
            // TODO: Action type에 따라 다른 작업을 해야함.
            open(action.target)
          }
        }
        // 노티피케이션
        this.notificationAction()
      },
      alarmDialogClose () {
        if (!this.currentAlarm) {
          return
        }
        this.stop()
        if (this.currentAlarm.isOnce) {
          this.$store.dispatch('deleteAlarm', this.currentAlarm)
        }
        // 알람 파일 종료
        this.currentAlarm = ''
      },
      notificationAction: function () {
        if (!this.currentAlarm) {
          return
        }
        let myNotification = new Notification(this.$t('notification.title'), {
          body: this.currentAlarm.message ? this.currentAlarm.message : this.$t('notification.close')
        })
        setTimeout(function () {
          myNotification.close()
        }, 10000)
        myNotification.onclick = () => this.notificationClick()
      },
      notificationClick: function () {
        console.log('notification click')
        this.alarmDialogVisible = false
      },
      trayUpdate: function () {
        ipcRenderer.send('async-update-tray', this.todayAlarms)
      }
    }
  }
</script>

<style lang="scss">
/* latin */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  src: local('Montserrat-Regular'), url(/assets/fonts/Montserrat-Regular.ttf) format('ttf');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}

* {
  font-family: 'Montserrat', sans-serif;
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

body, #app {
  overflow-x: hidden;
}

.selector--timer {
  width: 100%;
  // text-align: center;
  .time-select-item  {
    width: 100% !important;
  }
}
.el-dialog__footer {
  text-align: center !important;
}
.form--actions {
  text-align: right;
}

.block--button {
  width: 100%;
}
</style>
