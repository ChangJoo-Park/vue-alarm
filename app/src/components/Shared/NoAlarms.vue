<template lang="pug">
  div.no--alarms
    img.no--alarms--image(src="../../assets/images/NoAlarmImage.svg")
    p.no--alarms--text {{ $t("message.noAlarm") }}
</template>

<script>
export default {
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
