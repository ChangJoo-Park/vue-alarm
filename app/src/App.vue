<template lang="pug">
  div
    AppHeader(v-bind:nowDate="currentDate", v-bind:nowTime="currentTime")
    router-view
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
        states: {
          IDLE: 0,
          ALARMING: 1,
          OFF_BY_USER: 2
        }
      }
    },
    watch: {
      currentTime: function () {
        // for (let alarm of this.onAlarms) {
        // }
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
</style>
