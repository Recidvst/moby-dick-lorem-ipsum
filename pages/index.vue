<template>
  <div>
    <section class="moby-dick-hero hero is-small is-bold has-background-black">
      <div class="hero-body container">
        <WhaleLogo/>
        <h1 class="title is-size-1">
          Moby Dick Lorem Ipsum
        </h1>
        <h2 class="subtitle is-size-3 has-text-white">
          A Lorem Ipsum generator based on Herman Melville's <strong>Moby Dick</strong>
        </h2>
      </div>
    </section>

    <section class="moby-dick-quote box">
      <div class="container">
        <blockquote> 
          <h3 class="is-size-4">{{ quotePara }}</h3> 
        </blockquote>
      </div>
    </section>

    <section class="moby-dick-quotes-main">
      <div class="container">
        <div class="card">

          <footer class="card-footer">
            <a class="button card-footer-item is-size-4"> 
              <div id="content-type-toggle">
                  <span class="toggle-span subtitle " :class="{ disabled: true }"> Paragraphs </span>
                  <label class="switch">
                      <input id="encodeToggle" type="checkbox" @click="toggleContentType($event)">
                      <span class="slider round"></span>
                  </label>		
                  <span class="toggle-span subtitle " :class="{ disabled: false }"> Chapter Titles </span>
              </div>
              </a>

            <a class="card-footer-item">
              <div class="slider-control has-text-centered is-size-5">
                <span class="slider-title subtitle has-text-dark">Show <strong class="has-text-primary">{{ snippetsAmount }}</strong> items</span>
                <div class="level">
                  <span class="slider-labels level-left">1</span>
                  <input class="input slider level-item" type="range" min=1 max=15 v-model.number="snippetsAmount" />
                  <span class="slider-labels level-right">15</span>
                </div>
              </div>
            </a>            

            <a class="button search-button card-footer-item is-size-4 " @click="getParagraphs($event)"> Fetch snippets </a>
          </footer>

          <ul class="card-content">
            <li class="box columns is-12 is-flex is-vcentered" v-for="(paragraphContent, index) in snippetsArray" :key="index">
              <blockquote class="column is-11 quote" v-bind:data-quote="index">
                {{ paragraphContent }}
              </blockquote>         
              <span class="icon bordered copy-to-clipboard has-text-info" v-bind:data-clipboard="index" @click="copyText($event)">
                <i class="fas fa-paste"></i>
              </span>   
            </li>          
          </ul>
          
        </div>
      </div>
    </section>

  </div>
</template>

<script>

import WhaleLogo from '~/components/WhaleLogo.vue';
import { copyToClipboard } from '@/assets/js/utils';

export default {
  components: {
    WhaleLogo
  },
  data () {
    return {
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
        this.$store.commit('changesnippetsAmount',newAmount); 
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
  },  
  mounted() {
    this.$store.dispatch('getOneRandomAction'); 
    this.$store.dispatch('getMultipleRandomAction'); 
  },
}
</script>

<style>
body {
  min-height: 100vh;
  background-color: #f4f4f4;
}
</style>