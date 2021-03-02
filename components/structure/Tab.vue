<template>
  <div
    :class="['tab control-tab tab--side button search-button card-footer-item', `tab--${bookType}`]"
    @click.prevent="toggleBookType($event)"
  >
    <h2 v-html="text" />
    <div class="corner-ribbon shadow">
      <span>New!</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      contentType: (state) => state.contentType,
      bookType: (state) => state.bookType,
    }),
    // text
    text() {
      if (this.bookType === "alice") {
        return "Back to Moby Dipsum";
      }
      return "Check out Alice in Dipsum-land";
    },
  },
  methods: {
    toggleBookType() {
      if (this.bookType === "moby-dick") {
        this.$router.push({
          name: "alice",
        });
      } else {
        this.$router.push({
          name: "index",
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/css/variables.scss";

.tab {
  position: relative;
  display: block;
  width: auto;
  height: auto;
  background: $ocean-dark;
  color: white;
  border-radius: 2px;
  border-width: 2px;
  border-color: $ocean;
  border: none;
  white-space: normal;
  word-break: break-word;
  padding-right: 50px; // space for ribbon
  z-index: 4;

  * {
    color: white;
    font-size: 1.25rem;
  }
  &:hover {
    cursor: pointer;

    * {
      color: white;
    }
  }

  // fixed tab on desktop, relative button on mobile
  @media (min-width: 998px) {
    position: fixed;
    left: 0%;
    bottom: 0%;
    transform: translate(0, 0);
  }
}

// only show when linking to alice
.tab--moby-dick {
  .corner-ribbon {
    display: block;
  }
}
.corner-ribbon {
  display: none;
  position: absolute;
  right: -10px;
  top: -10px;
  z-index: 2;
  overflow: hidden;
  width: 75px;
  height: 75px;
  text-align: right;

  > span {
    color: #ffffff;
    text-align: center;
    font-size: 12px;
    font-weight: normal;
    line-height: 20px;
    transform: rotate(45deg);
    width: 100px;
    display: block;
    background: $ocean;
    background: linear-gradient($ocean 0%, $ocean 100%);
    box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
    position: absolute;
    top: 19px;
    right: -21px;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 100%;
      z-index: -1;
      border-left: 3px solid $ocean-dark;
      border-right: 3px solid transparent;
      border-bottom: 3px solid transparent;
      border-top: 3px solid $ocean-dark;
    }
    &::after {
      content: "";
      position: absolute;
      right: 0%;
      top: 100%;
      z-index: -1;
      border-right: 3px solid $ocean-dark;
      border-left: 3px solid transparent;
      border-bottom: 3px solid transparent;
      border-top: 3px solid $ocean-dark;
    }
  }
}
</style>
