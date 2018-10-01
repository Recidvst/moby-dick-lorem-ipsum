<template>
  <div class="moby-dick-lp-container">
    <link rel="preload" href="`${bgImage}`" as="image">

    <section class="moby-dick-hero hero is-small is-bold">
      <div class="hero-body container-fluid">
        <WhaleLogo/>
        <h1 class="subtitle is-size-3">
          A Lorem Ipsum generator based on Herman Melville's <strong>Moby Dick</strong>
        </h1>
      </div>
    </section>

    <aside class="sidebar">
      <div class="sidebar-controls">
        <a class="button search-button card-footer-item is-size-4 " id="fetch-button" @click="getParagraphs($event)"> 
          <h2>Fetch...</h2> 
        </a>
        <div id="content-type-toggle">
            <span class="toggle-span  is-size-5 " :class="{ disabled: true }">Paragraphs</span>
            <label class="switch">
                <input id="encodeToggle " type="checkbox" @click="toggleContentType($event)">
                <span class="slider round"></span>
            </label>		
            <span class="toggle-span  is-size-5 " :class="{ disabled: false }">Titles</span>
        </div>
        <div class="slider-control has-text-centered is-size-5">
          <span class="slider-title has-text-dark">Show <strong class="has-text-primary">{{ snippetsAmount }}</strong> items</span>
          <div class="level">
            <span class="slider-labels level-left">1</span>
            <input class="input slider level-item" type="range" min=1 max=10 v-model.number="snippetsAmount" />
            <span class="slider-labels level-right">10</span>
          </div>
        </div>  
      </div>        
    </aside>
  
    <section class="moby-dick-quotes-main">
      <div class="container">
        <ul class="card-content">
          <li class="box columns is-12 is-flex is-vcentered" v-for="(paragraphContent, index) in snippetsArray" :key="index">
            <blockquote class="column is-11 quote" v-bind:data-quote="index">
              {{ paragraphContent }}
            </blockquote>         
            <span class="icon bordered copy-to-clipboard" v-bind:data-clipboard="index" @click="copyText($event)">
              <i class="fas fa-paste"></i>
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

import WhaleLogo from '~/components/WhaleLogo.vue';
import BackgroundImage from '~/components/BackgroundImage.vue';
import { copyToClipboard } from '@/assets/js/utils';
import { debounce } from '@/assets/js/utils';

export default {
  components: {
    WhaleLogo,
    BackgroundImage
  },
  data () {
    return {
      bgImage: require('~/static/images/gloomy-ocean.jpg')
    }
  },
  computed: {
    snippetsArray() { // requested quotes from api
      return this.$store.state.snippetsArray
    },
    quotePara() { // example quote 
      return this.$store.state.quoteParagraph
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
  methods: {
    // copy text to clipboard
    copyText(e) {
      let quoteIndex = e.target.parentElement.dataset.clipboard;
      if (quoteIndex) {
        let quoteToCopy = document.querySelector(`[data-quote='${quoteIndex}'`).textContent;
        if (quoteToCopy) {
          copyToClipboard(quoteToCopy.trim());
        }
      }
    },
    // fire action to retrieve random paragraphs
    getParagraphs(e) {
      this.$store.dispatch('getMultipleRandomAction'); 
    },
    // switch between paras and titles
    toggleContentType(e) {
      if ( e.target.checked ) {
        this.$store.commit('changeContentType', 'titles');
      }
      else {
        this.$store.commit('changeContentType', 'paragraphs'); 
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
    }
  },  
  mounted() {
    this.$store.dispatch('getOneRandomAction'); 
    this.$store.dispatch('getMultipleRandomAction'); 
    let headerHeightFn = debounce( () => {
      this.headerHeight();
    }, 50);
    this.headerHeight();
    window.addEventListener('resize', headerHeightFn);
  },
}
</script>