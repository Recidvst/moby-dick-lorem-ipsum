<template>
  <svg
    id="copyIcon"
    class="copy-icon"
    width="100%"
    height="100%"
    viewBox="0 0 80 63"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve"
    style="
      fill-rule: evenodd;
      clip-rule: evenodd;
      stroke-linejoin: round;
      stroke-miterlimit: 1.41421;
    "
    @click="copyText($event)"
  >
    <path
      d="M79.41,38.62l-2,0l0,21.98l-75.41,0l0,-21.98l-2,0l0,23.98l79.41,0l0,-23.98Z"
      style="fill-rule: nonzero;"
    />
    <path
      d="M38.71,0l0,45.17l-16.25,-16.25l-1.42,1.41l18.67,18.67l18.67,-18.67l-1.42,-1.41l-16.25,16.25l0,-45.17l-2,0Z"
      style="fill-rule: nonzero;"
    />
  </svg>
</template>

<script>
import { copyToClipboard } from '~/assets/js/utils';
export default {
  name: 'CopyIcon',
  methods: {
    // copy text to clipboard
    copyText(e) {
      const target = e.currentTarget;
      const copyTarget = target.parentElement.parentElement;
      if (copyTarget) {
        const textElement = copyTarget.querySelector('.quote');
        if (textElement) {
          const textToCopy = textElement.textContent;
          const strippedTextToCopy = textToCopy.replace(/\s\s+/g, ' ').trim();
          const snippetID = textElement.getAttribute('data-id');
          const snippetType = textElement.getAttribute('data-type');
          const bookType = textElement.getAttribute('data-booktype');
          copyToClipboard(strippedTextToCopy);
          this.$appInsights.trackEvent({
            name: 'copyToClipboard',
            properties: {
              textToCopy: strippedTextToCopy,
              snippetID,
              bookType,
              contentType: snippetType,
            },
          });
          target.classList.add('clicked');
          setTimeout(() => {
            target.classList.remove('clicked');
          }, 1500);
        }
      }
    },
  },
};
</script>
