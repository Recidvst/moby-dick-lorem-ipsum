import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    key: "vuex",
    paths: ["loadState", "snippetsArray", "snippetsAmount", "contentType", "bookType", "token"],
  })(store);
};
