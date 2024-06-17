<template>
  <section class="moby-dick-quotes-main single-quote single-paragraph">
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
    const paragraphs = await $content('data', { deep: true })
      .where({ slug: { $contains: 'combined-alice-in-wonderland-paragraphs' } })
      .fetch();

    const paragraph = paragraphs.find(t => Number(t.id) === Number(params.id));
    if (!paragraph) {
      return redirect('/404');
    }
    const trimmedContent = paragraph.content.trim();

    return {
      paragraph,
      id: paragraph.id.toString(),
      content: {
        id: paragraph.id,
        identifier: paragraph.id,
        text: trimmedContent,
        type: 'paragraphs',
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
    this.$store.dispatch('changeBookTypeAction', 'alice');
  },
};
</script>
