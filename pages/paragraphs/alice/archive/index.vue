<template>
  <transition name="page">
    <section class="moby-dick-quotes-main">
      <div class="container">
        <h1>This is a list of all available paragraph snippets for Alice in Wonderland</h1>
        <h2>Click the 'load more' button to load the next ten or hit 'back' to go back to viewing random snippets</h2>
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
        <button @click="fetchNextPage">Load more</button>
      </div>
    </section>
  </transition>
</template>

<script>
import axios from 'axios';
import Quote from '~/components/quotes/Quote';

export default {
  components: {
    Quote,
  },
  async asyncData( { $config: { APIURL } } ) {

    // build graphql query
    const query = `query {
      book(name: "alice") {
        totalParagraphCount,
        paragraphs(count: 10, skip: 0) {
          _id
          identifier
          content
        },
      },
    }`;
    // run api query
    const response = await axios
      .post(`${APIURL}/graphql`, query, {
        type: 'cors',
        headers: {
          'Content-Type': 'application/graphql',
          'Access-Control-Origin': '*',
          'x-access-token': process.env.APITOKEN,
        },
      }).catch(function (err) {
        console.warn(err); // eslint-disable-line
      });

    const data = response.data.data || response.data;

    const allParagraphs = data.book.paragraphs.map((quote) => {
      return {
        id: quote._id,
        identifier: quote.identifier,
        text: quote.content.trim(),
        type: 'paragraphs',
      };
    });

    return { allParagraphs }
  },
  data() {
    return {
      loadState: false,
    }
  },
  watch: {
    allParagraphs(val) {
      this.loadState = true;
    },
  },
  mounted() {
    this.loadState = true;
  },
  methods: {
    fetchNextPage() {
      console.log('fetchNextPage');
      // move data fetch logic to here - call once on load and then again on each pagination request, using method
      // export the function from a helper function
      // scroll to bottom when loaded
    },
  },
}
</script>
