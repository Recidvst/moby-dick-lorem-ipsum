<template>
  <transition name="page">
    <section class="moby-dick-quotes-main">
      <div class="container">
        <ul v-if="loadState && allParagraphs" class="card-content">
          <Quote
            v-for="(content, index) in allParagraphs"
            :key="index"
            :content="content"
            :index="index"
            book-type="alice"
          />
        </ul>
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
  async asyncData(env) {

    // build graphql query
    const query = `query {
      book(name: "alice") {
        paragraphs(count: 0) {
          _id
          identifier
          content
        },
      },
    }`;
    // run api query
    const response = await axios
      .post(`${env.$config.APIURL}/graphql`, query, {
        type: 'cors',
        headers: {
          'Content-Type': 'application/graphql',
          'Access-Control-Origin': '*',
          'x-access-token': env.$config.APITOKEN,
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
}
</script>
