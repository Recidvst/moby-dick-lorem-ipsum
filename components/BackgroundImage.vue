<template>
  <!-- <div class="full-background-image parallax" :style="{ 'backgroundImage': 'url(' + `${bgImage}` + '' }"> </div> -->
  <div class="full-background-image"></div>
</template>

<script>
export default {
  data() {
    return {
      bgImage: require("~/static/images/gloomy-ocean.jpg")
    };
  }
};
</script>
