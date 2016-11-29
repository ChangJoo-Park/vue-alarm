<template lang="pug">
  div
    AlarmForm(
      v-bind:isNew="true",
      v-bind:submitButtonName="$t('form.buttons.doneButton')",
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
        const message = this.$t('message.createSuccess')
        this.$message({
          showClose: true,
          duration: 1500,
          message: message
        })
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
