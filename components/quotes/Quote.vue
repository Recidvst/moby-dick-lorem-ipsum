<template>
  <li class="box columns is-12 is-flex is-vcentered">
    <blockquote class="column is-11 quote" :data-id="content.id" :data-type="content.type">{{ content.text }}</blockquote>
    <div class="icon-box" :data-clipboard="index">
      <copyIcon/>
      <span class="copy-notif">copied!</span>
      <span v-if="!this.paramOptions.id && allowViewSingle" class="view-icon" @click.prevent="goToSnippet($event)"><linkIcon/></span>
    </div>
    <router-link v-if="prevRoute != 'none'" :to="prevRoute" tag="a" class="go-back">Go back</router-link>
  </li>
</template>

<script>
import copyIcon from "~/components/icons/copyIcon";
import linkIcon from "~/components/icons/linkIcon";

export default {
  components: {
    copyIcon,
    linkIcon,
  },
  computed: {
    paramOptions() {
      return this.$route.params;
    },
  },
  methods: {
    goToSnippet(e) {
      let target = e.currentTarget;
      let parent = target.parentElement.parentElement;
      if (parent) {
        let snippetID = parent.querySelector(`.quote`).getAttribute('data-id');
        let snippetType = parent.querySelector(`.quote`).getAttribute('data-type');
        if (snippetID && snippetType) {
          this.$router.push({
            path: `/${snippetType}/${this.bookType}/${snippetID}`,
          })
        }
      }
    },
  },
  props: {
    content: {
      type: Object,
      default: function () {
        return {}
      }
    },
    bookType: {
      type: String,
      default: 'moby-dick'
    },
    id: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 1
    },
    prevRoute: {
      type: String,
      default: 'none'
    },
    allowViewSingle: {
      type: Boolean,
      default: true
    }
  }
};
</script>
