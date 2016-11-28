<template lang="pug">
  el-button.setting--button(type="default", icon="setting", size="mini", @click="showSetting")
</template>

<script>
export default {
  props: [],
  components: {},
  data () {
    return {}
  },
  methods: {
    showSetting: function () {
      this.$router.push({name: 'setting-show'})
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
  .setting--button {
    position: fixed;
    top: 1em;
    right: 1em;
  }
</style>
