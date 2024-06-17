<template>
  <section class="moby-dick-quotes-main single-quote single-title">
    <div class="container">
      <ul class="card-content">
        <Quote v-if="loadState" :id="id" :content="content" :prev-route="prevRoute" />
      </ul>
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
  transition: 'slide-left',
  async asyncData({ params, $content, redirect }) {
    const titles = await $content('data', { deep: true })
      .where({ slug: { $contains: 'moby-dick-or-the-whale-titles' } })
      .fetch();

    const title = titles.find(t => Number(t.id) === Number(params.id));
    if (!title) {
      return redirect('/404');
    }

    const trimmedContent = title.content.trim();

    return {
      title,
      id: title.id.toString(),
      content: {
        id: title.id,
        identifier: title.id,
        text: trimmedContent,
        type: 'titles',
      },
      loadState: true,
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      content: {},
      loadState: false,
      prevRoute: '',
    };
  },
  mounted() {
    this.$store.dispatch('changeBookTypeAction', 'moby-dick');
  },
};
</script>
