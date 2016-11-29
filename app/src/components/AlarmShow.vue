<template lang="pug">
  div
    AlarmForm(
      v-bind:isNew="false",
      v-bind:submitButtonName="$t('form.buttons.updateButton')",
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
        const message = this.$t('message.updateSuccess')
        this.$message({
          showClose: true,
          message: message,
          duration: 1500,
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
