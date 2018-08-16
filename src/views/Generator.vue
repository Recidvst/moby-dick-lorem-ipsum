<template>
  <div class="main">
    <Controls />
    <br />
    <SnippetDisplay />
  </div>
</template>

<script>
import Controls from '@/components/Controls.vue';
import SnippetDisplay from '@/components/SnippetDisplay.vue';

export default {
  name: 'generator',
  components: {
    Controls,
    SnippetDisplay
  },
};
</script>
