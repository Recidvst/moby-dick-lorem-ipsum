import Vuex from 'vuex';
import content from './modules/content';

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      content: content
    }
  });
};

export default createStore;
