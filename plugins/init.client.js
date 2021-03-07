export default async function ({ store, app }) {
  // check if spa fallback, by checking if a value in store is empty e.g. if the page hasn't been generated (something on mounted for example)
  if (!store.state.bookType) {
    await app.store.dispatch('nuxtServerInit', app.context);
  }
}
