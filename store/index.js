import axios from 'axios';
import { cropString } from '../assets/js/utils';

const APIURL = process.env.APIURL;
const APITOKEN = process.env.APITOKEN;

export const state = () => ({
  loadState: false,
  snippetsArray: ['...'],
  snippetsAmount: 5,
  contentType: 'paragraphs',
  bookType: '',
  token: APITOKEN,
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
  getMultipleRandomAction({ commit, state }, type, count) {
    commit('updateLoadState', false);
    const getCount = count || state.snippetsAmount; // amount requested
    let bookType = 'moby-dick';
    if (type !== undefined) {
      bookType = type;
    }
    else if (state.bookType !== '') {
      bookType = state.bookType; // fallback
    }
    // build graphql query
    const query = `query {
      book(name: "${bookType}") {
        ${state.contentType}(count: ${getCount}, random: true) {
          _id
          identifier
          content
        },
      },
		}`;
    // run api query
    axios
      .post(`${APIURL}/graphql`, query, {
        type: 'cors',
        headers: {
          'Content-Type': 'application/graphql',
          'Access-Control-Origin': '*',
          'x-access-token': APITOKEN,
        },
      })
      .then(function (response) {
        if (response.data && response.data.data) {
          return response.data.data;
        }
        return response;
      })
      .then((data) => {
        const dataArr = data.book[state.contentType];
        if (dataArr) {
          const newItems = [];
          for (const item in dataArr) {
            const trimmedPara = cropString(dataArr[item].content, 1500).trim();
            newItems.push({
              id: dataArr[item]._id,
              text: trimmedPara.trim(),
              type: state.contentType,
            });
          }
          commit('updateLoadState', true);
          commit('updateParagraphs', [newItems]); // trigger the mutation once data fetched
        }
      })
      .catch(function (err) {
        console.warn(err); // eslint-disable-line
      });
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
