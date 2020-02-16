<template>
  <section class="moby-dick-quotes-main moby-dick">
    <div class="container">

      <ul class="card-content">
        <Quote
          v-if="loadState"
          v-for="(content, index) in snippetsArray"
          :key="index"
          :content="content"
          :index="index"
          :prevRoute="prevRoute"
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
