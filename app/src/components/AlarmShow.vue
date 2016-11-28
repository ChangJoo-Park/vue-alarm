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
          message: '성공적으로 수정하였습니다.',
          type: 'success'
        })
        this.$router.go(-1)
      })
    }
  },
  computed: {
    currentAlarm: function () {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
