<template lang="pug">
  div
    AppHeader(v-bind:nowDate="currentDate", v-bind:nowTime="currentTime")
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
      span(v-else) 알람이 울리고 있습니다. 알람을 끄려면 아래 버튼을 눌러주세요
      span(slot="footer")
        el-button.alarm--dialog--button(@click.native="alarmDialogVisible = false" type="danger", size="large") 알람 종료
</template>

<script>
  import store from 'src/vuex/store'
  import { mapGetters } from 'vuex'
  import AppHeader from './components/Shared/Header'
  import moment from 'moment'

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
      AppHeader
    },
    data: function () {
      return {
        now: '',
        nowInterval: '',
        currentAlarm: '',
        alarmDialogVisible: false
      }
    },
    watch: {
      currentTime: function () {
        console.log('hi')
        if (!this.onAlarms && this.onAlarms.length === 0) {
          return
        }

        // Check Time
        let currentHour = this.now.hour()
        let currentMinutes = this.now.minute()
        for (let alarm of this.onAlarms) {
          // now
          let target = alarm.time.split(':')
          if (currentHour === parseInt(target[0], 10) &&
              currentMinutes === parseInt(target[1], 10)) {
            this.alarmDialogVisible = true
            this.currentAlarm = alarm
            return
          } else {
            console.log(`is not same, ${target[0]}  ${target[1]}`)
          }
          // current
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
      alarmDialogOpen () {
        if (!this.currentAlarm) {
          return
        }
        // Setting에서 알람 파일 읽어옴
        console.log('alarm : ', this.currentAlarm)
        // TODO: Alarm Target을 열어야됨
        console.log('Turn on alarming')
      },
      alarmDialogClose () {
        if (!this.currentAlarm) {
          return
        }
        // 알람 파일 종료
        this.currentAlarm = ''
        console.log('Turn Off alarming')
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
}

.selector--timer {
  width: 100%;
  text-align: center;
  .time-select-item  {
    width: 100% !important;
  }
}
.el-dialog__footer {
  text-align: center !important;
}
</style>
