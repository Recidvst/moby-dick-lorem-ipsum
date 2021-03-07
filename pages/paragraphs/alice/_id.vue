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
import axios from 'axios';
import Quote from '~/components/quotes/Quote';
const APIURL = process.env.APIURL;
const APITOKEN = process.env.APITOKEN;

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
  data() {
    return {
      id: this.$route.params.id,
      content: {},
      loadState: false,
    };
  },
  mounted() {
    this.$store.dispatch('changeBookTypeAction', 'alice');
    this.getParagraph();
  },
  methods: {
    // fire action to retrieve the requested paragraph
    async getParagraph(event) {
      // build graphql query
      const query = `query {
        book(name: "alice") {
          paragraphs(_id:"${this.$route.params.id}") {
            _id
            identifier
            content
          },
        },
      }`;
      // run api query
      await axios
        .post(`${APIURL}/graphql`, query, {
          type: 'cors',
          headers: {
            'Content-Type': 'application/graphql',
            'Access-Control-Origin': '*',
            'x-access-token': APITOKEN,
          },
        })
        .then(function (response) {
          if (response.data && response.data.data) {
            return response.data.data;
          }
          return response.data;
        })
        .then((data) => {
          const dataArr = data.book.paragraphs;
          if (dataArr && dataArr.length > 0) {
            const dataObj = dataArr[0];
            const trimmedContent = dataObj.content.trim();
            this.content = {
              id: dataObj._id,
              identifier: dataObj.identifier,
              text: trimmedContent,
              type: 'paragraphs',
            };
            this.loadState = true;
          }
          else {
            this.content = {
              id: -1,
              text: "Whoops, something's gone wrong ... that snippet wasn't found :(",
              type: 'paragraphs',
            };
            this.loadState = true;
          }
        })
        .catch(function (err) {
          console.warn(err); // eslint-disable-line
        });
    },
  },
};
</script>
