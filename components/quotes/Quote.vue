<template>
  <li class="box columns is-12 is-flex is-vcentered">
    <blockquote class="column is-11 quote" :data-id="content.id" :data-type="content.type">
      {{ content.text }}
    </blockquote>
    <div class="icon-box" :data-clipboard="index">
      <copyIcon />
      <span class="copy-notif">copied!</span>
      <span
        v-if="!paramOptions.id && allowViewSingle"
        class="view-icon"
        @click.prevent="goToSnippet($event)"
        ><linkIcon
      /></span>
    </div>
    <router-link v-if="prevRoute != 'none'" :to="prevRoute" tag="a" class="go-back search-button"
      >Go back</router-link
    >
    <faIcon :icon="['fas', 'quote-left']" class="left-quote-mark" />
    <faIcon :icon="['fas', 'quote-right']" class="right-quote-mark" />
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
  props: {
    content: {
      type: Object,
      default() {
        return {};
      },
    },
    bookType: {
      type: String,
      default: "moby-dick",
    },
    id: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
      default: 1,
    },
    prevRoute: {
      type: String,
      default: "none",
    },
    allowViewSingle: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    paramOptions() {
      return this.$route.params;
    },
  },
  methods: {
    goToSnippet(e) {
      const target = e.currentTarget;
      const parent = target.parentElement.parentElement;
      if (parent) {
        const snippetID = parent.querySelector(".quote").getAttribute("data-id");
        const snippetType = parent.querySelector(".quote").getAttribute("data-type");
        if (snippetID && snippetType) {
          this.$router.push({
            path: `/${snippetType}/${this.bookType}/${snippetID}`,
          });
        }
      }
    },
  },
};
</script>
