<template>
  <transition name="page">
    <section class="moby-dick-quotes-main">
      <div class="container">
        <h1>This is a list of all available paragraph snippets for Alice in Wonderland</h1>
        <button>Back</button>
        <ul v-if="loadState && allParagraphs" class="card-content">
          <Quote
            v-for="(content, index) in allParagraphs"
            :key="index"
            :content="content"
            :index="index"
            book-type="alice"
          />
        </ul>
        <h2 v-if="loadState && allParagraphs.length < 1" class="title is-size-5 has-text-white mt-5">No content found, something's up...</h2>
      </div>
    </section>
  </transition>
</template>

<script>
import Quote from '~/components/quotes/Quote';

export default {
  components: {
    Quote,
  },
  async asyncData({ $content }) {
    const paragraphs = await $content('data', { deep: true })
      .where({ slug: { $contains: 'combined-alice-in-wonderland-paragraphs' } })
      .fetch();

    const allParagraphs = paragraphs.map((quote) => {
      return {
        id: quote.id,
        identifier: quote.id,
        text: quote.content.trim(),
        type: 'paragraphs',
      };
    });

    return {
      allParagraphs,
      loadState: true,
    }
  },
  data() {
    return {
      allParagraphs: [],
      loadState: false,
    };
  },
}
</script>
