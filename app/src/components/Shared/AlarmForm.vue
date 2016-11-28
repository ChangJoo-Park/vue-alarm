<template lang="pug">
el-form(:ref="alarmForm", :model="formAlarm", label-position="top")
  el-form-item(label="알람 시각")
    el-time-select.selector--timer(
      v-model="formAlarm.time"
      placeholder="00:00",
      :picker-options="{ start: '00:00', step: '00:05', end: '24:00' }"
    )
  el-form-item(label="알람 메시지")
    el-input(placeholder="", v-model="formAlarm.message")
  el-form-item(label="알람 요일")
    el-checkbox-group(v-model="formAlarm.date")
      el-checkbox(label=0) 일
      el-checkbox(label=1) 월
      el-checkbox(label=2) 화
      el-checkbox(label=3) 수
      el-checkbox(label=4) 목
      el-checkbox(label=5) 금
      el-checkbox(label=6) 토
  el-form-item(label="한번만 알림")
    el-checkbox(v-model="alarmAtOnce", v-on:change="checkAlarmAtOnce") 알람 요일을 선택하지 않으면 한번만 울립니다.
  el-button(type="default", @click.native="$router.go(-1)") 닫기
  el-button(v-if="isNew", type="primary", @click="$emit('submitButtonFunction', formAlarm)", :disabled="saveAvailable") {{submitButtonName}}
  el-button(v-else, type="success", @click="$emit('submitButtonFunction', formAlarm)", :disabled="saveAvailable") {{submitButtonName}}
</template>

<script>
import uuid from 'uuid'

export default {
  props: {
    alarm: Object,
    submitButtonName: String,
    isNew: Boolean
  },
  components: {},
  created () {
    if (this.isNew === false) {
      // this.formAlarm = JSON.parse(JSON.stringify(this.alarm))
      const id = this.$route.params.alarm_id
      this.$store.dispatch('fetchAlarm', id).then((alarm) => {
        if (alarm.length !== 0) {
          this.formAlarm = alarm[0]
        }
      })
    }
  },
  data () {
    return {
      formAlarm: {
        alarmId: uuid(),
        time: '',
        isOnce: false,
        message: '',
        date: [],
        isOn: false
      },
      isNewForm: function () {
        return this.isNew
      }
    }
  },
  methods: {
    checkAlarmAtOnce: function (event) {
      if (event.isTrusted) {
        this.formAlarm.date = []
      }
    }
  },
  computed: {
    alarmAtOnce: function () {
      if (this.formAlarm.date && this.formAlarm.date.length === 0) {
        this.formAlarm.isOnce = true
      } else {
        this.formAlarm.isOnce = false
      }

      return this.formAlarm.isOnce
    },
    submitButtonType: function () {
      return this.submitButtonClass
    },
    saveAvailable: function () {
      // 저장 가능하면 isAvailable이 true가 되어야 한다.
      let isAvailable = this.formAlarm && this.formAlarm.time
      return !isAvailable
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
