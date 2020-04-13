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
      await axios.get(`${APIURL}/paragraphs/alice/${this.$route.params.id}`, {
        type: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Origin": "*",
          "x-access-token": APITOKEN
        }
      })
      .then(function(response) {
        return response.data;
      })
      .then(data => {
        let trimmedContent = truncateText(data.content, 1250).trim();
        this.content = {
          id: data._id,
          text: trimmedContent,
          type: 'paragraphs',
        };
        this.loadState = true;
      })
      .catch(function(err) {
        console.warn(err); // eslint-disable-line
      });
    }
  },
  mounted() {
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
