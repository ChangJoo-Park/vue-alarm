<template lang="pug">
  div
    el-button(type="default", @click="closeSetting") 닫기
</template>

<script>
export default {
  props: [],
  components: {},
  data () {
    return {}
  },
  methods: {
    closeSetting: function () {
      this.$router.go(-1)
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
</style>
