<template>
  <div class="moby-dick-lp-container">
    <!-- <link rel="preload" v-bind:href="bgImage" as="image"> -->
    <section class="moby-dick-hero hero is-small is-bold">
      <div class="hero-body container-fluid">
        <div class="header-left">
          <h1 class="title is-size-3">
            A Lorem Ipsum generator using snippets from Herman Melville's
            <strong>Moby Dick</strong>
          </h1>

          <span class="header-toggle" @click="toggleHeader($event)">
            <small>controls
              <menuIcon/>
            </small>
          </span>
        </div>
        <div class="header-right controls">
          <ul class="type-filter">
            <label for="checkbox-fetch-paras">
              <input
                type="radio"
                name="checkbox-choice"
                id="checkbox-fetch-paras"
                value="paragraphs"
                v-model="filters.choice"
                checked
              >
              Paragraphs
              <br>
            </label>
            <label for="checkbox-fetch-titles">
              <input
                type="radio"
                name="checkbox-choice"
                id="checkbox-fetch-titles"
                value="titles"
                v-model="filters.choice"
              >
              Titles
              <br>
            </label>
          </ul>

          <div class="count-filter">
            <label for="checkbox-amount">
              <input
                type="number"
                name="checkbox-choice"
                id="checkbox-amount"
                min="1"
                max="10"
                value="5"
                v-model="filters.amount"
                v-on:keyup="maxAmount($event)"
              >
              {{ prettyPrintChoice }}
            </label>
          </div>

          <a
            class="button search-button card-footer-item is-size-4"
            id="fetch-button"
            @click="getParagraphs($event)"
          >
            <h2>Fetch</h2>
          </a>
        </div>
      </div>
    </section>

    <section class="moby-dick-quotes-main">
      <div class="container">
        <ul class="card-content">
          <li
            class="box columns is-12 is-flex is-vcentered"
            v-for="(paragraphContent, index) in snippetsArray"
            :key="index"
          >
            <blockquote class="column is-11 quote" v-bind:data-quote="index">{{ paragraphContent }}</blockquote>
            <span class="icon-box" v-bind:data-clipboard="index">
              <copyIcon/>
            </span>
          </li>
        </ul>
      </div>
    </section>

    <a
      href="https://github.com/Recidvst"
      title="Recidvst on Github"
      class="github-link footer-link"
      target="_blank"
      rel="noopener"
    >
      <i class="fab fa-github-square"></i>
    </a>

    <BackgroundImage/>
  </div>
</template>

<script>
import BackgroundImage from "~/components/BackgroundImage.vue";
import copyIcon from "~/components/copyIcon";
import menuIcon from "~/components/menuIcon";
import { copyToClipboard } from "../assets/js/utils";
import { debounce } from "../assets/js/utils";
import { parallax } from "../assets/js/utils";

export default {
  components: {
    BackgroundImage,
    copyIcon,
    menuIcon
  },
  data() {
    return {
      bgImage: require("~/static/images/gloomy-ocean.jpg"),
      filters: {
        choice: "paragraphs",
        amount: 5
      }
    };
  },
  computed: {
    snippetsArray() {
      // requested quotes from api
      return this.$store.state.snippetsArray;
    },
    prettyPrintChoice() {
      return (
        this.filters.choice.charAt(0).toUpperCase() +
        this.filters.choice.slice(1)
      );
    }
  },
  watch: {
    // watch for filter changes and update localstorage
    "filters.choice": function(val) {
      this.updateFilters("choice", val);
      if (this.filters.choice === "paragraphs") {
        this.$store.commit("changeContentType", "paragraphs");
      } else if (this.filters.choice === "titles") {
        this.$store.commit("changeContentType", "titles");
      }
      this.$store.dispatch("getMultipleRandomAction");
    },
    "filters.amount": function(val) {
      this.updateFilters("amount", val);
      this.$store.commit("changesnippetsAmount", val);
      this.$store.dispatch("getMultipleRandomAction");
    }
  },
  methods: {
    // fire action to retrieve random paragraphs
    getParagraphs(e) {
      this.$store.dispatch("getMultipleRandomAction");
    },
    updateFilters(type, val) {
      // save in localStorage
      if (process.browser) {
        let filterPrefs = localStorage.getItem("mobyDipsumFilters");
        filterPrefs = JSON.parse(filterPrefs);
        if (filterPrefs && filterPrefs !== "") {
          filterPrefs[type] = val;
        } else {
          filterPrefs = {
            choice: "paragraphs",
            amount: 5
          };
          filterPrefs[type] = val;
        }
        localStorage.setItem("mobyDipsumFilters", JSON.stringify(filterPrefs));
      }
    },
    maxAmount(e) {
      if (e.target.value > 10) {
        this.filters.amount = 10;
        e.target.value = this.filters.amount;
      }
    },
    headerHeight() {
      let body = document.querySelector("#__nuxt");
      let headerHeight = document.querySelector(".moby-dick-hero").offsetHeight;
      if (headerHeight && headerHeight > 0) {
        body.style.paddingTop = `${headerHeight - 30}px`;
      }
    },
    toggleHeader() {
      let headerControls = document.querySelector(
        ".moby-dick-hero .hero-body .controls"
      );
      let controlsToggle = document.querySelector(
        ".moby-dick-hero .hero-body .header-toggle"
      );
      if (headerControls) {
        headerControls.classList.toggle("show-mobile");
      }
      if (controlsToggle) {
        controlsToggle.classList.toggle("active");
      }
    }
  },
  beforeMount() {
    // set filters from localstorage
    if (process.browser) {
      let filterPrefs = localStorage.getItem("mobyDipsumFilters");
      if (filterPrefs && filterPrefs !== "") {
        filterPrefs = JSON.parse(filterPrefs);
        if (
          filterPrefs.choice &&
          filterPrefs.choice !== "" &&
          this.filters.choice !== filterPrefs.choice
        ) {
          this.filters.choice = filterPrefs.choice;
          if (this.filters.choice === "paras") {
            this.$store.commit("changeContentType", "paragraphs");
          } else {
            this.$store.commit("changeContentType", "titles");
          }
        }
        if (
          filterPrefs.amount &&
          filterPrefs.amount !== "" &&
          this.filters.amount !== filterPrefs.amount
        ) {
          this.filters.amount = filterPrefs.amount;
          this.$store.commit("changesnippetsAmount", filterPrefs.amount);
        }
      }
    }
  },
  mounted() {
    // get first items
    this.$store.dispatch("getMultipleRandomAction");

    // setting header height
    let headerHeightFn = debounce(() => {
      this.headerHeight();
    }, 50);
    this.headerHeight();
    window.addEventListener("resize", headerHeightFn);

    parallax();
  }
};
</script>
