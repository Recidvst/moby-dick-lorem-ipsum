<template>
  <section class="moby-dick-quotes-main alice">
    <div class="container">
      <ul v-if="loadState" class="card-content">
        <Quote
          v-for="(content, index) in snippetsArray"
          :key="index"
          :content="content"
          :index="index"
          book-type="alice"
        />
      </ul>
      <h2 v-if="loadState && snippetsArray.length < 1" class="title is-size-5 has-text-white mt-5">No content found, something's up...</h2>
    </div>
  </section>
</template>

<script>
import Quote from '~/components/quotes/Quote';

export default {
  components: {
    Quote,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path) {
        vm.prevRoute = from.path;
      }
    });
  },
  transition: 'slide-right',
  data() {
    return {
      faviconPath: require('@/assets/icons/alice/favicon.png'),
      prevRoute: '',
    };
  },
  computed: {
    loadState() {
      // data back?
      return this.$store.state.loadState;
    },
    snippetsArray() {
      // requested quotes from api
      return this.$store.state.snippetsArray;
    },
  },
  created() {
    this.$store.dispatch('changeBookTypeAction', 'alice');
  },
  mounted() {
    // get first items
    this.$store.dispatch('getMultipleRandomAction', 'alice');
    this.updateFavicon();
  },
  methods: {
    updateFavicon() {
      // swithes between icons (moby dick and alice)
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = this.faviconPath;
      document.getElementsByTagName('head')[0].appendChild(link);
    },
  },
};
</script>
