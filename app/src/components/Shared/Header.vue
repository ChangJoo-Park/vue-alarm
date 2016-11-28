<template lang="pug">
  div.header
    h2.header--date {{nowDate}}
    h3.header--time {{nowTime}}
</template>

<script>
export default {
  props: ['nowDate', 'nowTime']
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
}
</style>
