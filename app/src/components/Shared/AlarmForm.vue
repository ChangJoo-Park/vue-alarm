<template lang="pug">
el-form(:ref="alarmForm", :model="formAlarm", label-position="top")
  el-form-item(:label="$t('form.labels.alarmTime')")
    el-time-select.selector--timer(
      v-model="formAlarm.time"
      placeholder="00:00",
      :picker-options="{ start: '00:00', step: '00:05', end: '24:00' }"
    )
  el-form-item(:label="$t('form.labels.alarmSound')")
    el-input(placeholder="", v-model="formAlarm.message")
  el-form-item(:label="$t('form.labels.alarmDay')")
    el-checkbox-group(v-model="formAlarm.date")
      el-checkbox(label=0) {{ $t("days.sun") }}
      el-checkbox(label=1) {{ $t("days.mon")}}
      el-checkbox(label=2) {{ $t("days.tue")}}
      el-checkbox(label=3) {{ $t("days.wed")}}
      el-checkbox(label=4) {{ $t("days.thu")}}
      el-checkbox(label=5) {{ $t("days.fri")}}
      el-checkbox(label=6) {{ $t("days.sat")}}
  el-form-item(:label="$t('form.labels.alarmAtOnce')")
    el-checkbox(v-model="alarmAtOnce", v-on:change="checkAlarmAtOnce") {{ $t("form.labels.noDay")}}
  el-form-item(:label="$t('form.labels.alarmWithAction')")
    el-button.action--button(@click="addAction", icon="plus")
    transition(
      name="action-list-transition"
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutLeft"
    )
      el-row(v-if="formAlarm.actions.length > 0")
        el-col(:span=24)
          transition-group(
            name="action-item-transition"
            enter-active-class="animated bounceInRight"
            leave-active-class="animated bounceOutLeft"
          )
            el-row.action--row(:gutter=10, v-for="action in formAlarm.actions", v-bind:key="action")
              el-col(:span=10)
                el-select(v-model="action.type")
                  el-option(v-for="item in actions", :label="$t(item.label)", :value="item.value")
              el-col(:span=10)
                el-button.block--button(@click="openFileDialog(action)", v-if="action.type == 1") {{ $t("form.labels.actions.select")}}
                div.selected--file--name(v-if="action.type == 1") {{selectedFileName(action.target)}}
                el-input(v-model="action.target", v-if="action.type == 2")
              el-col(:span=4)
                el-button(@click="removeAction(action)", type="danger", icon="minus")
  div.form--actions
    el-button(type="default", @click.native="$router.go(-1)") {{ $t('form.buttons.closeButton') }}
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
          label: 'form.labels.actions.openFile',
          value: 1
        },
        {
          label: 'form.labels.actions.openURL',
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
      this.formAlarm.isOnce = this.formAlarm.date && this.formAlarm.date.length === 0
      return this.formAlarm.isOnce
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
