<template lang="pug">
  div.no--alarms
    img.no--alarms--image(src="../../assets/images/NoAlarmImage.svg")
    p.no--alarms--text 알람이 하나도 없습니다
</template>

<script>
export default {
  props: [],
  components: {},
  data () {
    return {}
  },
  methods: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
.no--alarms {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .no--alarms--image {
    width: 150px;
    height: auto;
  }
  .no--alarms--text {
    color: #BFBFBF;
    text-align: center;
  }
}
</style>
