<template>
  <section class="moby-dick-quotes-main single-quote single-paragraph">
    <div class="container">

      <ul class="card-content">
        <Quote
          v-if="loadState"
          :content="content"
          :id="id"
          :prevRoute="prevRoute"
        />
      </ul>

    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { truncateText } from "../../../assets/js/utils";
import Quote from "~/components/quotes/Quote";
import copyIcon from "~/components/icons/copyIcon";
const APIURL = process.env.APIURL;
const APITOKEN = process.env.APITOKEN;

export default {
  transition: 'slide-left',
  components: {
    Quote,
    copyIcon,
  },
  data() {
    return {
      id: this.$route.params.id,
      content: {},
      loadState: false
    }
  },
  methods: {
    // fire action to retrieve the requested paragraph
    getParagraph: async function (event) {
      // build graphql query
      const query = `query {
        book(name: "moby-dick") {
          paragraphs(_id:"${this.$route.params.id}") {
            _id
            identifier
            content
          },
        },
      }`;
      // run api query
      axios.post(`${APIURL}/graphql`, query, {
        type: "cors",
        headers: {
          "Content-Type": "application/graphql",
          "Access-Control-Origin": "*",
          "x-access-token": APITOKEN
        }
      })
      .then(function(response) {
        if (response.data && response.data.data) {
          return response.data.data;
        }
        return response.data;
      })
      .then(data => {
        const dataArr = data.book.paragraphs;
        if (dataArr && dataArr.length > 0) {
          const dataObj = dataArr[0];
          let trimmedContent = truncateText(dataObj.content, 1250).trim();
          this.content = {
            id: dataObj._id,
            text: trimmedContent,
            type: 'paragraphs',
          };
          this.loadState = true;
        }
        else {
          this.content = {
            id: -1,
            text: 'Whoops, something\'s gone wrong ... that snippet wasn\'t found :(',
            type: 'paragraphs',
          };
          this.loadState = true;
        }
      })
      .catch(function(err) {
        console.warn(err); // eslint-disable-line
      });
    }
  },
  mounted() {
    this.$store.dispatch("changeBookTypeAction", 'moby-dick');
    this.getParagraph();
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
