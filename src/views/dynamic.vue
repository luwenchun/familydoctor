<template>
  <section>
    <iframe v-bind:src="path"/>
  </section>
</template>

<script>
  let Base64 = require('js-base64').Base64;

  export default {
    data () {

      return {
        path:Base64.decode(this.$route.params.path)
      }
    }
  }

</script>

<style scoped>

</style>
