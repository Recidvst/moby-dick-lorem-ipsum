<template>
  <div :class="['full-background-image', bookType]" />
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      bookType: state => state.bookType,
    }),
  },
};
</script>
