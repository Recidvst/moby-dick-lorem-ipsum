<template>
  <div>
    <section class="moby-dick-hero hero is-small is-primary is-bold">
      <div class="hero-body">
        <WhaleLogo/>
        <div class="container">
          <h1 class="title is-size-1">
            Moby Dick Lorem Ipsum
          </h1>
          <h2 class="subtitle is-size-3">
            A Lorem Ipsum generator based on Herman Melville's <strong>Moby Dick</strong>
          </h2>
        </div>
      </div>
    </section>

    <section class="moby-dick-quote hero is-dark">
      <div class="hero-body">
        <div class="container">
          <blockquote> 
            <h3 class="is-size-4">{{ quotePara }}</h3> 
          </blockquote>
        </div>
      </div>
    </section>

    <section class="moby-dick-quotes-main">
      <div class="container">
        <div class="card">

          <footer class="card-footer">
            <a class="button card-footer-item is-size-5"> Refresh </a>

            <a class="card-footer-item">
              <div class="slider-control has-text-centered is-size-5">
                <span class="slider-title subtitle has-text-dark">Show <strong class="has-text-success is-size-4">{{ parasAmount }}</strong> paragraphs</span>
                <div class="level">
                  <span class="slider-labels level-left">1</span>
                  <input class="input slider level-item" type="range" min=1 max=10 v-model.number="parasAmount" />
                  <span class="slider-labels level-right">10</span>
                </div>
              </div>
            </a>
            
            <a class="button card-footer-item is-size-5" @click="getParagraphs($event)"> Search </a>
          </footer>

          <ul class="card-content">
            <li class="box columns is-12 is-flex is-vcentered" v-for="(paragraphContent, index) in paragraphsArray" :key="index">
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
    paragraphsArray() { // requested quotes from api
      return this.$store.state.paragraphsArray
    },
    quotePara() { // example quote 
      return this.$store.state.quoteParagraph
    },
    parasAmount: { // update number of paras to fetch
      get: function() { 
        return this.$store.state.parasAmount; 
      }, 
      set: function(newAmount){ 
        this.$store.commit('changeParasAmount',newAmount); 
      }
    }
  },
  methods: {
    // copy text to clipboard
    copyText(e) {
      let quoteIndex = e.target.parentElement.dataset.clipboard;
      if (quoteIndex) {
        let quoteToCopy = document.querySelector(`[data-quote='${quoteIndex}'`).textContent;
        console.log(quoteToCopy);
        if (quoteToCopy) {
          copyToClipboard(quoteToCopy.trim());
        }
      }
    },
    // fire action to retrieve random paragraphs
    getParagraphs(e) {
      this.$store.dispatch('getMultipleRandomAction'); 
    }
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