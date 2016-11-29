<template lang="pug">
  div
    transition-group(
      name="alarm-list-transition"
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutLeft"
    )
      AlarmCard.alarm--card(
        v-for="alarm in alarms",
        v-bind:alarm="alarm"
        v-bind:key="alarm.alarmId"
      )
    transition(
      name="no-alarms-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    )
      NoAlarms(v-if='alarms.length === 0')
    el-button.alarm--new--button(type="primary", icon="plus", @click="newAlarm")
</template>

<script>
import { mapGetters } from 'vuex'
import AlarmCard from './Shared/AlarmCard'
import NoAlarms from './Shared/NoAlarms'

export default {
  components: {
    AlarmCard,
    NoAlarms
  },
  created () {
    this.$store.dispatch('fetchAlarms')
  },
  methods: {
    newAlarm: function () {
      this.$router.push({name: 'alarm-new'})
    }
  },
  computed: {
    ...mapGetters({
      alarms: 'alarms'
    })
  }
}
</script>

<style lang="scss" scoped>
.alarm--card {
  margin-bottom: 20px;
}
.alarm--new--button {
  position: fixed;
  bottom: 1em;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #20A0FF;
  border-radius: 100%;
  padding: 1em;
  z-index: 1000;
}
</style>
