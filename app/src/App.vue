<template lang="pug">
  div
    AppHeader(v-bind:nowDate="currentDate", v-bind:nowTime="currentTime")
    SettingButton
    router-view
    //- Dialog Alarm
    el-dialog(
      title="알람!",
      v-model="alarmDialogVisible",
      size="full",
      v-on:open="alarmDialogOpen"
      v-on:close="alarmDialogClose"
    )
      span(v-if="currentAlarm.message") {{currentAlarm.message}}
      span(v-else) {{ $t("dialog.delete.noMessage") }}
      span(slot="footer")
        el-button.alarm--dialog--button(@click.native="alarmDialogVisible = false" type="danger", size="large") 알람 종료
</template>

<script>
  import store from 'src/vuex/store'
  import { Howl } from 'howler'
  import { mapGetters } from 'vuex'
  import AppHeader from './components/Shared/Header'
  import SettingButton from './components/Shared/SettingButton'
  import moment from 'moment'
  import open from 'opn'

  export default {
    store,
    created: function () {
      moment.locale('ko-kr')
      this.now = moment()
      this.nowInterval = window.setInterval(() => {
        this.now = moment()
        // Check
      }, 1000)
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
        // let currentDay = this.now.
        const currentDay = moment().format('e')
        const currentHour = this.now.hour()
        const currentMinutes = this.now.minute()
        for (let alarm of this.onAlarms) {
          // Check Day
          const isAvailableDay = alarm.isOnce || alarm.date.includes(currentDay)
          console.log('is it available day ? ', isAvailableDay, 'is At once ? ', alarm.isOnce)
          if (!isAvailableDay) {
            console.log('return because not that day')
            return
          }
          // Check Time
          let targetTime = alarm.time.split(':').map(time => parseInt(time, 10))
          if (currentHour !== targetTime[0]) {
            console.log('return because not that hour')
            return
          }
          if (currentMinutes === targetTime[1]) {
            this.alarmDialogVisible = true
            this.currentAlarm = alarm
            return
          } else {
            console.log('return because not that minute')
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        onAlarms: 'onAlarms'
      }),
      currentDate () {
        const date = moment(this.now)
        const targetDate = date.isValid() ? date : moment()
        return targetDate.format('YYYY MMMM DD일 ddd요일')
      },
      currentTime () {
        const time = moment(this.now)
        const targetTime = time.isValid() ? time : moment()
        return targetTime.format('A h:mm')
      }
    },
    methods: {
      play: function () {
        console.log('play')
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
        // TODO: Alarm Target을 열어야됨
        if (this.currentAlarm.actions && this.currentAlarm.actions.length > 0) {
          for (let action of this.currentAlarm.actions) {
            open(action.target)
          }
        }
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
