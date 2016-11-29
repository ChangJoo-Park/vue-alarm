<template lang="pug">
  div
    AlarmForm(
      v-bind:isNew="false",
      v-bind:submitButtonName="`수정`",
      v-on:submitButtonFunction="updateAlarm"
    )
</template>

<script>
import AlarmForm from './Shared/AlarmForm'

export default {
  components: {
    AlarmForm
  },
  data () {
    return {
      alarm: ''
    }
  },
  methods: {
    updateAlarm: function (alarm) {
      this.$store.dispatch('updateAlarm', alarm).then(() => {
        this.$message({
          showClose: true,
          message: '성공적으로 수정하였습니다.',
          duration: 2000,
          type: 'success'
        })
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
