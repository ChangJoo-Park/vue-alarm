<template lang="pug">
el-form(:ref="alarmForm", :model="formAlarm", label-position="top")
  el-form-item(label="알람 시각")
    el-time-select.selector--timer(
      v-model="formAlarm.time"
      placeholder="00:00",
      :picker-options="{ start: '00:00', step: '00:01', end: '24:00' }"
    )
  el-form-item(label="알람 메시지")
    el-input(placeholder="", v-model="formAlarm.message")
  el-form-item(label="알람 요일")
    el-checkbox-group(v-model="formAlarm.date")
      el-checkbox(label=0) {{ $t("form.labels.sun") }}
      el-checkbox(label=1) {{ $t("form.labels.mon")}}
      el-checkbox(label=2) {{ $t("form.labels.tue")}}
      el-checkbox(label=3) {{ $t("form.labels.wed")}}
      el-checkbox(label=4) {{ $t("form.labels.thu")}}
      el-checkbox(label=5) {{ $t("form.labels.fri")}}
      el-checkbox(label=6) {{ $t("form.labels.sat")}}
  el-form-item(label="한번만 알림")
    el-checkbox(v-model="alarmAtOnce", v-on:change="checkAlarmAtOnce") {{ $t("form.labels.noDay")}}
  el-form-item(label="알람과 동시에 실행")
    el-button.action--button(@click="addAction", icon="plus")
    el-row(v-if="formAlarm.actions.length > 0")
      el-col(v-for="action in formAlarm.actions")
        el-row.action--row(:gutter=10)
          el-col(:span=10)
            el-select(v-model="action.type")
              el-option(v-for="item in actions", :label="item.label", :value="item.value")
          el-col(:span=10)
            el-button.block--button(@click="openFileDialog(action)", v-if="action.type == 1") 선택하기
            div.selected--file--name(v-if="action.type == 1") {{selectedFileName(action.target)}}
            el-input(v-model="action.target", v-if="action.type == 2")
          el-col(:span=4)
            el-button(@click="removeAction(action)", type="danger", icon="minus")
  div.form--actions
    el-button(type="default", @click.native="$router.go(-1)") 닫기
    el-button(v-if="isNew == true", type="primary", @click="$emit('submitButtonFunction', formAlarm)", :disabled="saveAvailable") {{submitButtonName}}
    el-button(v-else, type="success", @click="$emit('submitButtonFunction', formAlarm)", :disabled="saveAvailable") {{submitButtonName}}
</template>

<script>
import uuid from 'uuid'
import { remote } from 'electron'
import path from 'path'

export default {
  props: {
    alarm: Object,
    submitButtonName: String,
    isNew: Boolean
  },
  components: {},
  created () {
    if (this.isNew === false) {
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
        message: '',
        date: [],
        actions: [],
        isOnce: false,
        isOn: true
      },
      actions: [
        {
          label: '파일 열기',
          value: 1
        },
        {
          label: 'URL 열기',
          value: 2
        }
      ]
    }
  },
  methods: {
    checkAlarmAtOnce: function (event) {
      if (event.isTrusted) {
        this.formAlarm.date = []
      }
    },
    addAction: function () {
      this.formAlarm.actions.push({
        type: '',
        target: ''
      })
    },
    removeAction: function (action) {
      const index = this.formAlarm.actions.indexOf(action)
      this.formAlarm.actions.splice(index, 1)
    },
    openFileDialog: function (action) {
      remote.dialog.showOpenDialog((filePath) => {
        action.target = filePath[0]
        this.selectedFileName()
      })
    },
    selectedFileName: function (filePath) {
      if (filePath) {
        return path.parse(filePath).base
      }
      return ''
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
.action--row, .action--button {
  margin-bottom: 10px;
}
</style>
