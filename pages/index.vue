<template>
  <div>

    <section class="moby-dick-hero hero is-small is-primary is-bold">
      <div class="hero-body">
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

    <section class="moby-dick-controls">
      <div class="container">
        <div class="card">

          <ul class="card-content">
            <li class="box columns is-multiline" v-for="(paragraphContent, index) in paragraphsArray" :key="index">
              <div class="quote column is-11 is-gapless">
                <blockquote>
                  {{ paragraphContent }}
                </blockquote>
              </div>
              <span class="icon column">
                <i class="fas fa-home"></i>
              </span>
            </li>              
          </ul>

          <footer class="card-footer">
            <button class="button card-footer-item is-size-5"> Clear </button>
            <div class="card-footer-item field">
              <div class="control has-text-centered is-size-5">
                <span>Number Of Paragraphs</span>
                <input class="input is-primary" type="number" v-model.number="parasAmount" />
              </div>
            </div>
            <button class="button card-footer-item is-size-5"> Search </button>
          </footer>
          
        </div>
      </div>
    </section>

  </div>
</template>

<script>

export default {
  components: {
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
  },  
  mounted() {
    console.log('mounted');
    console.log(process.env.APIURL);
    this.$store.dispatch('getOneRandomAction'); 
  },
}
</script>

<style>
body {
  min-height: 100vh;
  background-color: #eee;
}
</style>

