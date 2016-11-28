<template lang="pug">
  div
    el-form(ref="settingForm", v-model="settingForm", label-position="top")
      el-form-item(label="알람 소리", placeholder="알람을 선택하세요")
        | {{selectedAlarm}}
        el-row(:gutter=15)
          el-col(:span=20)
            el-select.alarm--sound--selector(v-model="selectedAlarm")
              el-option(v-for="alarm in defaultAlarms", :label="alarm.label", :value="alarm.value")
          el-col(:span=4)
            el-button(@click="$emit('playAudio')")
              span(v-if="isAlarmPreviewing == true") >
              span(v-else) ㅁ
    div.form--actions
      el-button(type="default", @click="closeSetting") {{ $t("form.buttons.closeButton")}}
      el-button(type="primary", @click="saveSetting") {{ $t("form.buttons.doneButton")}}
</template>

<script>
export default {
  created: function () {
    console.dir(this)
  },
  components: {},
  data () {
    return {
      settingForm: '',
      selectedAlarm: '',
      isAlarmPreviewing: false,
      defaultAlarms: [
        {
          label: '알람 1',
          value: '파일명 1'
        },
        {
          label: '알람 2',
          value: '파일명 2'
        },
        {
          label: '알람 3',
          value: '파일명 3'
        }
      ]
    }
  },
  methods: {
    closeSetting: function () {
      this.$router.go(-1)
    },
    saveSetting: function () {
      console.log('hi')
    },
    togglePlay: function () {
      this.isAlarmPreviewing = !this.isAlarmPreviewing
      if (this.isAlarmPreviewing === true) {
        console.log('true')
        this.$emit('playAudio')
      } else {
        console.log('false')
        this.$emit('stopAudio')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.alarm--sound--selector {
  margin-bottom: 1em;
}
</style>
