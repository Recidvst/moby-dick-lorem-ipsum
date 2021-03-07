<template>
  <main class="moby-dick-lp-container">
    <Header @getContent="getContent" />

    <nuxt />

    <Footer />

    <Tab />

    <BackgroundImage />
  </main>
</template>

<script>
import Header from '~/components/structure/Header.vue';
import Footer from '~/components/structure/Footer.vue';
import Tab from '~/components/structure/Tab.vue';
import BackgroundImage from '~/components/images/BackgroundImage.vue';

export default {
  components: {
    Header,
    Footer,
    BackgroundImage,
    Tab,
  },
  methods: {
    // fire action to retrieve random paragraphs
    getContent(e) {
      this.$store.dispatch('getMultipleRandomAction');
    },
  },
};
</script>
