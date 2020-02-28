<template>
  <div :class="['full-background-image', type]"></div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'moby-dick'
    },
  }
};
</script>
