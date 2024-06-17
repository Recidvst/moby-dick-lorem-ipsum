<template>
  <section class="moby-dick-quotes-main moby-dick 404">
    <div class="container">
      <h1 class="title is-size-4 has-text-white">Page or content not found</h1>
      <br>
      <nuxt-link to="/" class="is-size-5 has-text-info is-underlined">Go back to homepage</nuxt-link>
    </div>
  </section>
</template>
<script>
export default {
  layout: 'default',
  created() {
    this.$store.dispatch('changeBookTypeAction', 'moby-dick');
  },
}
</script>
