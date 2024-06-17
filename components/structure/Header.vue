<template>
  <header class="moby-dick-hero hero is-small is-bold">
    <div class="hero-body container-fluid">
      <div class="header-left">
        <h1 v-dompurify-html="title" class="title is-size-3" />
        <h2 v-if="tagline" class="title is-size-4">
          <nuxt-content :document="tagline" />
        </h2>

        <a
          v-if="allowMenu"
          href="javascript:void(0);"
          title="toggle controls"
          class="header-toggle button plain-button"
          @click="toggleHeader($event)"
        >
          <span v-if="menuToggled">Close Controls</span>
          <span v-if="!menuToggled">Open Controls</span>
        </a>
      </div>
      <div v-if="menuToggled && allowMenu && !isArchive" class="header-right controls">
        <ul class="type-filter">
          <label for="checkbox-fetch-paras">
            <input
              id="checkbox-fetch-paras"
              v-model="filters.choice"
              type="radio"
              name="checkbox-choice"
              value="paragraphs"
              checked
            >
            Paragraphs
            <br>
          </label>
          <label for="checkbox-fetch-titles">
            <input
              id="checkbox-fetch-titles"
              v-model="filters.choice"
              type="radio"
              name="checkbox-choice"
              value="titles"
            >
            Titles
            <br>
          </label>
        </ul>

        <div class="count-filter">
          <label for="checkbox-amount">
            <input
              id="checkbox-amount"
              v-model="filters.amount"
              type="number"
              name="checkbox-choice"
              min="1"
              max="10"
              value="5"
              @keyup="maxAmount($event)"
            >
            {{ prettyPrintChoice }}
          </label>
        </div>

        <a
          id="fetch-button"
          class="button search-button card-footer-item is-size-4"
          @click="getContent($event)"
        >
          <h2>Refresh Text</h2>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import { debounce } from '~/assets/js/utils';

export default {
  data() {
    return {
      filters: {
        choice: 'paragraphs',
        amount: 5,
      },
      menuToggled: true,
      allowMenu: true,
      title: null,
      tagline: null,
    };
  },
  async fetch() {
    const taglineType = (this.$route.name === 'index' || this.$route.name === 'moby-dick') ? 'moby-dick' : 'alice';
    this.tagline = await this.$content('tagline', `${taglineType}`).fetch();
  },
  computed: {
    ...mapState({
      bookType: state => state.bookType,
    }),
    paramOptions() {
      return this.$route.params;
    },
    prettyPrintChoice() {
      return this.filters.choice.charAt(0).toUpperCase() + this.filters.choice.slice(1);
    },
    isArchive() {
      return this.$route.path.includes('archive');
    },
  },
  watch: {
    // watch for filter changes and update localstorage
    'filters.choice'(val) {
      this.updateFilters('choice', val);
      if (this.filters.choice === 'paragraphs') {
        this.$store.dispatch('changeContentTypeAction', 'paragraphs');
      }
      else if (this.filters.choice === 'titles') {
        this.$store.dispatch('changeContentTypeAction', 'titles');
      }
      this.$store.dispatch('getMultipleRandomAction');
    },
    'filters.amount'(val) {
      this.updateFilters('amount', val);
      this.$store.dispatch('changeSnippetsAmountAction', val);
      this.$store.dispatch('getMultipleRandomAction');
    },
    $route(newRoute, oldRoute) {
      if (newRoute.params.id || newRoute.name.includes('archive')) {
        this.allowMenu = false;
      }
      else {
        this.allowMenu = true;
      }
      this.setTitleByRoute(this.$route);
      this.$fetch();
      // trigger
      this.headerHeight();
    },
  },
  beforeMount() {
    // set filters from localstorage
    if (process.browser) {
      let filterPrefs = localStorage.getItem('mobyDipsumFilters');
      if (filterPrefs && filterPrefs !== '') {
        filterPrefs = JSON.parse(filterPrefs);
        if (
          filterPrefs.choice &&
          filterPrefs.choice !== '' &&
          this.filters.choice !== filterPrefs.choice
        ) {
          this.filters.choice = filterPrefs.choice;
          if (this.filters.choice === 'paras') {
            this.$store.dispatch('changeContentTypeAction', 'paragraphs');
          }
          else {
            this.$store.dispatch('changeContentTypeAction', 'titles');
          }
        }
        if (
          filterPrefs.amount &&
          filterPrefs.amount !== '' &&
          this.filters.amount !== filterPrefs.amount
        ) {
          this.filters.amount = filterPrefs.amount;
          this.$store.dispatch('changeSnippetsAmountAction', filterPrefs.amount);
        }
      }
    }
  },
  mounted() {
    // don't show header controls on single snippet pages or archive pages
    if (this.$route.params.id || this.$route.name.includes('archive')) {
      this.allowMenu = false;
    }
    else {
      this.allowMenu = true;
    }
    // setting header height
    const headerHeightFn = debounce(() => {
      this.headerHeight();
    }, 50);
    // on mobile, set header to be closed by default
    const menuCheckFn = debounce(() => {
      if (window.matchMedia('(max-width: 997px)').matches) {
        this.menuToggled = false;
      }
      else {
        this.menuToggled = true;
      }
    }, 50);
    // trigger
    this.headerHeight();
    menuCheckFn();
    // listeners
    window.addEventListener('resize', () => {
      headerHeightFn();
      menuCheckFn();
    });
    window.addEventListener('orientationchange', () => {
      headerHeightFn();
      menuCheckFn();
    });
  },
  created() {
    this.setTitleByRoute(this.$route);
  },
  methods: {
    updateFilters(type, val) {
      // save in localStorage
      if (process.browser) {
        let filterPrefs = localStorage.getItem('mobyDipsumFilters');
        filterPrefs = JSON.parse(filterPrefs);
        if (filterPrefs && filterPrefs !== '') {
          filterPrefs[type] = val;
        }
        else {
          filterPrefs = {
            choice: 'paragraphs',
            amount: 5,
          };
          filterPrefs[type] = val;
        }
        localStorage.setItem('mobyDipsumFilters', JSON.stringify(filterPrefs));
      }
    },
    maxAmount(e) {
      if (e.target.value > 10) {
        this.filters.amount = 10;
        e.target.value = this.filters.amount;
      }
    },
    headerHeight() {
      setTimeout(() => {
        const body = document.querySelector('#__nuxt');
        let headerHeight = document.querySelector('.moby-dick-hero').offsetHeight;
        if (window.matchMedia('(max-width: 997px)').matches) {
          headerHeight = document.querySelector('.moby-dick-hero .header-left').offsetHeight + 30;
        }
        if (headerHeight && headerHeight > 0) {
          body.style.paddingTop = `${headerHeight}px`;
        }
      }, 500);
    },
    toggleHeader() {
      const headerControls = document.querySelector('.moby-dick-hero .hero-body .controls');
      const controlsToggle = document.querySelector('.moby-dick-hero .hero-body .header-toggle');
      if (headerControls) {
        headerControls.classList.toggle('show-mobile');
      }
      if (controlsToggle) {
        controlsToggle.classList.toggle('active');
      }
      this.menuToggled = !this.menuToggled;
      this.headerHeight();
    },
    setTitleByRoute(route) {
      if (route.name) {
        this.title = (route.name === 'index' || route.name === 'moby-dick') ? 'Moby Dipsum' : 'Alice in Dipsum-land';
      }
    },
    getContent() {
      this.$emit('getContent');
    },
  },
};
</script>
