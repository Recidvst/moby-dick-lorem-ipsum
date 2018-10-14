<template>
  <div class="moby-dick-lp-container">
    <link rel="preload" v-bind:href="bgImage" as="image">

    <section class="moby-dick-hero hero is-small is-bold">
      <div class="hero-body container-fluid">
        <div class="header-left">

          <h1 class="subtitle is-size-3">
            A Lorem Ipsum generator using snippets from Herman Melville's <strong>Moby Dick</strong>
          </h1>

          <span class="header-toggle" @click="toggleHeader($event)"> <small> controls X </small> </span>

        </div>
        <div class="header-right controls">
      
            <ul class="type-filter">   
              <label for="checkbox-fetch-paras">
                <input type="radio" name="checkbox-choice" id="checkbox-fetch-paras" value='paragraphs' v-model="filters.choice" checked> 
                Paragraphs
                <br/>
              </label>
              <label for="checkbox-fetch-titles">
                <input type="radio" name="checkbox-choice" id="checkbox-fetch-titles" value='titles' v-model="filters.choice"> 
                Titles
                <br/>
              </label>
            </ul>

            <div class="count-filter">
              <label for="checkbox-amount">
                <input type="number" name="checkbox-choice" id="checkbox-amount" min="1" max="10" value="5" v-model="filters.amount" onkeyup="if(this.value > 10) this.value = 10;"> 
                {{ prettyPrintChoice }}
              </label>
            </div>
     
            <a class="button search-button card-footer-item is-size-4 " id="fetch-button" @click="getParagraphs($event)"> 
              <h2>Fetch</h2> 
            </a>   

        </div>
      </div>
    </section>
  
    <section class="moby-dick-quotes-main">
      <div class="container">
        <ul class="card-content">
          <li class="box columns is-12 is-flex is-vcentered" v-for="(paragraphContent, index) in snippetsArray" :key="index">
            <blockquote class="column is-11 quote" v-bind:data-quote="index">
              {{ paragraphContent }}
            </blockquote>         
            <span class="icon-box" v-bind:data-clipboard="index">
                <scissorsIcon/>
            </span>
          </li>          
        </ul>
      </div>
    </section>

    <a href="https://github.com/Recidvst" title="Recidvst on Github" class="github-link footer-link" target="_blank" rel="noopener"><i class="fab fa-github-square"></i></a>

    <BackgroundImage/>
  </div>
</template>

<script>

import BackgroundImage from '~/components/BackgroundImage.vue';
import WhaleLogo from '~/components/WhaleLogo.vue';
import scissorsIcon from '~/components/scissorsIcon';
import { copyToClipboard } from '@/assets/js/utils';
import { debounce } from '@/assets/js/utils';

export default {
  components: {
    WhaleLogo,
    BackgroundImage,
    scissorsIcon
  },
  data () {
    return {
      bgImage: require('~/static/images/gloomy-ocean.jpg'),
      filters: {
        choice: 'paragraphs',
        amount : 5
      }
    }
  },
  computed: {
    snippetsArray() { // requested quotes from api
      return this.$store.state.snippetsArray
    },
    quotePara() { // example quote 
      return this.$store.state.quoteParagraph
    },
    prettyPrintChoice() {
      return this.filters.choice.charAt(0).toUpperCase() + this.filters.choice.slice(1);
    },
    snippetsAmount: { // update number of paras to fetch
      get: function() { 
        return this.$store.state.snippetsAmount; 
      }, 
      set: function(newAmount){ 
        this.debounceSnippetsAmountInput(newAmount);
      }
    }
  },
  watch: {
    // watch for filter changes and update localstorage
    'filters.choice': function (val) {
      this.updateFilters('choice', val);
    }
  },
  methods: {
    // fire action to retrieve random paragraphs
    getParagraphs(e) {
      this.$store.dispatch('getMultipleRandomAction'); 
    },
    updateFilters(type, val) {
      // toggle choice
      if ( this.filters.choice === 'paragraphs' ) {
        this.$store.commit('changeContentType', 'paragraphs');
      }
      else {
        this.$store.commit('changeContentType', 'titles'); 
      }
      // save in localStorage
      if (process.browser) {
        let filterPrefs = localStorage.getItem('mobyDipsumFilters');
        filterPrefs = JSON.parse(filterPrefs);
        if (filterPrefs && filterPrefs !== '') {
          filterPrefs[type] = val;        
        }
        else {
          filterPrefs = {
            'choice' : 'paragraphs',
            'amount' : 5
          }
          filterPrefs[type] = val;
        }
        localStorage.setItem('mobyDipsumFilters', JSON.stringify(filterPrefs));
      }
    },
    debounceSnippetsAmountInput: debounce(function (newAmount, e) {
      this.$store.commit('changesnippetsAmount',newAmount); 
    }, 250),
    headerHeight() {
      let body = document.querySelector('#__nuxt');
      let headerHeight = document.querySelector('.moby-dick-hero').offsetHeight;
      if ( headerHeight && headerHeight > 0 ) {
        body.style.paddingTop = `${headerHeight - 30}px`;
      }      
    },
    toggleHeader() {
      let headerControls = document.querySelector('.moby-dick-hero .hero-body .controls');
      headerControls.classList.toggle('show-mobile');
    }
  },  
  mounted() {
    this.$store.dispatch('getOneRandomAction'); 
    this.$store.dispatch('getMultipleRandomAction'); 
    // set filters from localstorage
    if (process.browser) {
      let filterPrefs = localStorage.getItem('mobyDipsumFilters');
      if (filterPrefs && filterPrefs !== '') {
        filterPrefs = JSON.parse(filterPrefs);
        if ( filterPrefs.choice && filterPrefs.choice !== '' && this.filters.choice !== filterPrefs.choice) {
          this.filters.choice = filterPrefs.choice;
          if ( this.filters.choice === 'paras' ) {
            this.$store.commit('changeContentType', 'paragraphs');
          }
          else {
            this.$store.commit('changeContentType', 'titles'); 
          }
        }
      }
    }
    // setting heeader height
    let headerHeightFn = debounce( () => {
      this.headerHeight();
    }, 50);
    this.headerHeight();
    window.addEventListener('resize', headerHeightFn);
  },
  created() {
  },
}
</script>