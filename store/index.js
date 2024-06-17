import { cropString } from '~/assets/js/utils';

export const state = () => ({
  loadState: false,
  snippetsArray: ['...'],
  snippetsAmount: 5,
  contentType: 'paragraphs',
  bookType: '',
  stateRandomNumber: null,
});

export const mutations = {
  updateStateRandomNumber(state, number) {
    state.stateRandomNumber = number;
  },
  updateLoadState(state, bool) {
    state.loadState = bool;
  },
  updateParagraphs(state, [newParagraphs]) {
    state.snippetsArray = newParagraphs;
  },
  changesnippetsAmount(state, amount) {
    state.snippetsAmount = amount;
  },
  changeContentType(state, cType) {
    state.contentType = cType;
  },
  changeBookType(state, bType) {
    if (bType && bType !== '') {
      state.bookType = bType;
    }
    else {
      state.bookType = 'moby-dick'; // toggle if not passed
    }
  },
};

export const actions = {
  // fetch multiple paragraphs/titles
  async getMultipleRandomAction({ commit, state }, bookType = 'moby-dick', count) {
    commit('updateLoadState', false);
    const getCount = count || state.snippetsAmount; // amount requested

    let contentLocationPrefix = 'moby-dick-or-the-whale';
    let contentLocationSuffix = '-paragraphs';

    if (state.contentType === 'titles') {
      contentLocationSuffix = '-titles';
    }
    if (bookType === 'alice') {
      contentLocationPrefix = 'combined-alice-in-wonderland';
    }

    const content = await this.$content('data', { deep: true })
      .where({ slug: { $contains: `${contentLocationPrefix}${contentLocationSuffix}` } })
      .fetch();

    const randomContent = content.sort(() => 0.5 - Math.random()).slice(0, getCount);

    const newItems = [];
    for (const item in randomContent) {
      const trimmedPara = cropString(randomContent[item].content, 1500).trim();
      newItems.push({
        id: randomContent[item].id,
        identifier: randomContent[item].id,
        text: trimmedPara.trim(),
        type: state.contentType,
      });
    }
    commit('updateLoadState', true);
    commit('updateParagraphs', [newItems]); // trigger the mutation once data fetched
  },
  changeContentTypeAction({ commit }, type) {
    commit('changeContentType', type);
  },
  changeBookTypeAction({ commit }, type) {
    commit('changeBookType', type);
  },
  changeSnippetsAmountAction({ commit }, amount) {
    commit('changesnippetsAmount', amount);
  },
  nuxtServerInit ({ commit }) {
    commit('updateStateRandomNumber', Math.random())
  },
};
