<template>
  <section class="moby-dick-quotes-main">
    <div class="container">

      <ul class="card-content">
        <Quote
          v-if="loadState"
          v-for="(content, index) in snippetsArray"
          :key="index"
          :content="content"
          :index="index"
          prevRoute="none"
        />
      </ul>

    </div>
  </section>
</template>

<script>
import Quote from "~/components/quotes/Quote";

export default {
  components: {
    Quote,
  },
  data() {
    return {
      prevRoute: '/'
    }
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
  // methods: {
  //   // TODO: update the favicon when changing between alice and moby dick
  //   updateFavicon() {
  //     // (function() {
  //     //     var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  //     //     link.type = 'image/x-icon';
  //     //     link.rel = 'shortcut icon';
  //     //     link.href = 'http://www.stackoverflow.com/favicon.ico';
  //     //     document.getElementsByTagName('head')[0].appendChild(link);
  //     // })();
  //   },
  // },
  mounted() {
		// get first items
    this.$store.dispatch("getMultipleRandomAction", 'moby-dick');
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path) {
        vm.prevRoute = from.path;
      }
    })
  },
};
</script>
