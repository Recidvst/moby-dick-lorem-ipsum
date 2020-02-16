<template>
  <section class="moby-dick-quotes-main single-quote single-paragraph">
    <div class="container">
      <ul class="card-content">
        <li class="box columns is-12 is-flex is-vcentered">
          <blockquote class="column is-11 quote" :data-id="content.id" :data-type="content.type" :data-quote="id">{{ content.text }}</blockquote>
          <span class="icon-box" :data-clipboard="id">
            <copyIcon/>
          </span>
          <router-link to="/" tag="a" class="go-back">Go back</router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { setFetchHeaders } from "../../assets/js/utils";
import { truncateText } from "../../assets/js/utils";
import copyIcon from "~/components/icons/copyIcon";
const APIURL = process.env.APIURL;
const APITOKEN = process.env.APITOKEN;

export default {
  components: {
    copyIcon,
  },
  data() {
    return {
      id: this.$route.params.id,
      content: '',
    }
  },
  methods: {
    // fire action to retrieve the requested paragraph
    getParagraph: async function (event) {
      await axios.get(`${APIURL}/paragraphs/${this.$route.params.id}`, {
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
        }
      })
      .catch(function(err) {
        console.warn(err); // eslint-disable-line
      });
    }
  },
  mounted() {
    this.getParagraph();
  }
};
</script>
