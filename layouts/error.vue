<template>
  <main class="moby-dick-lp-container">
    <div class="content-wrapper">
      <h1 v-if="error.statusCode === 404">Page not found</h1>
      <div v-else style="margin-bottom: 15px;">
        <strong>An error occurred</strong><br>
        <span>{{ error.message }}</span>
      </div><br>
      <nuxt-link to="/">Go back to homepage</nuxt-link>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
