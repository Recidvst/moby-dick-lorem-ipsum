<template>
  <div class="moby-dick-lp-container">

    <nuxt/>

    <a
      href="https://github.com/Recidvst"
      title="Recidvst on Github"
      class="github-link footer-link"
      target="_blank"
      rel="noopener"
    >
      <i class="fab fa-github-square"></i>
    </a>

    <BackgroundImage/>
  </div>
</template>

<script>
import BackgroundImage from "~/components/BackgroundImage.vue";

export default {
  components: {
    BackgroundImage,
  },
  data() {
    return {
    };
  },
};
</script>
