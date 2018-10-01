<template>
  <div class="full-background-image" :style="{ 'backgroundImage': 'url(' + `${bgImage}` + '' }"> </div>
</template>

<script>
export default {
  data () {
    return {
      bgImage: require('~/static/images/gloomy-ocean.jpg')
    }
  }
}
</script>