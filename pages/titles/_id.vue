<template>
  <div class="moby-dick-lp-container">
    <h1>This is the title id: {{id}}</h1>
  </div>
</template>

<script>

export default {
  data() {
  return {
      id: this.$route.params.id
    }
  },
};
</script>
