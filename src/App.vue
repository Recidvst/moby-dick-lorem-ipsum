<template>
  <div id="app">
    <h1> {{ pageTitle }} </h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'SnippetDisplay',
  data: {
  },
  data: function () {
  return {
    pageTitle: 'Moby Dick Lorem Ipsum Generator'
    }
  }
};
</script>

Moby Dick Lorem Ipsum Generator
