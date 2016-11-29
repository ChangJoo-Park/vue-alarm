<template lang="pug">
  div
    AlarmForm(
      v-bind:isNew="true",
      v-bind:submitButtonName="`완료`",
      v-on:submitButtonFunction="saveAlarm"
    )
</template>

<script>
import AlarmForm from './Shared/AlarmForm'

export default {
  components: {
    AlarmForm
  },
  methods: {
    saveAlarm: function (alarm) {
      this.$store.dispatch('addAlarm', alarm).then(() => {
        this.$message({
          showClose: true,
          duration: 2000,
          message: '성공적으로 추가하였습니다.'
        })
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
