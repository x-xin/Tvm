<template>
  <div class="header">
    <img src="https://dummyimage.com/1080x720" v-bind:alt="msg" width="100%">
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      msg: 'This is img size'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
