<template>
  <div class="container">
    <h1>An error occurred</h1>
    <nuxt-link to="/">Back to site</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error']
}

</script>