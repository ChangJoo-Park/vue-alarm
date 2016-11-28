<template lang="pug">
  div.header
    h2.header--date {{now.date}}
    h3.header--time {{now.time}}
    el-button.setting--button(type="info", icon="setting", size="mini", @click="showSetting")
</template>

<script>
export default {
  props: ['now'],
  methods: {
    showSetting: function () {
      this.$router.push({name: 'setting-show'})
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin: 0;
  margin-bottom: 20px;
  text-align: center;
  .header--date, .header--time {
    margin: 0;
  }
  .setting--button {
    position: fixed;
    top: 1em;
    right: 1em;
  }
}
</style>
