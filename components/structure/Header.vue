<template>
  <header class="moby-dick-hero hero is-small is-bold">
    <div class="hero-body container-fluid">
      <div class="header-left">
        <h1 class="title is-size-3" v-html="title" />
        <h2 class="title is-size-4" v-html="subtitle" />

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
      <div v-if="menuToggled && allowMenu" class="header-right controls">
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

        <Tab />
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import Tab from '~/components/structure/Tab.vue';
import { debounce } from '~/assets/js/utils';

export default {
  components: {
    Tab,
  },
  data() {
    return {
      filters: {
        choice: 'paragraphs',
        amount: 5,
      },
      menuToggled: true,
      allowMenu: true,
    };
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
    // headings
    title() {
      if (this.bookType === 'alice') {
        return 'Alice in Dipsum-land';
      }
      return 'Moby Dipsum';
    },
    subtitle() {
      if (this.bookType === 'alice') {
        return "A Lorem Ipsum generator using snippets from Lewis Carroll's <br/><strong>Alice's Adventures in Wonderland and Through the Looking Glass</strong>";
      }
      return "A Lorem Ipsum generator using snippets from Herman Melville's <strong>Moby Dick</strong>";
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
      if (newRoute.params.id) {
        this.allowMenu = false;
      }
      else {
        this.allowMenu = true;
      }
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
    // don't show header controls on single snippet pages
    if (this.$route.params.id) {
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
          body.style.paddingTop = `${headerHeight - 30}px`;
        }
      }, 1);
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
    getContent(e) {
      this.$emit('getContent');
    },
  },
};
</script>
