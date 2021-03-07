export default function ({ query, enablePreview }) {
  if (query.preview) {
    console.log('Nuxt preview mode active'); // eslint-disable-line
    enablePreview();
  }
}
