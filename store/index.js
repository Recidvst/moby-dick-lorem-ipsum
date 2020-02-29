import axios from 'axios';
import { setFetchHeaders } from "../assets/js/utils";
import { truncateText } from "../assets/js/utils";
const APIURL = process.env.APIURL;
const APITOKEN = process.env.APITOKEN;

export const state = () => ({
	loadState: false,
	snippetsArray: ['...'],
	snippetsAmount: 5,
	contentType: "paragraphs",
	bookType: "",
	token: APITOKEN
});

export const mutations = {
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
    } else {
      state.bookType = 'moby-dick'; // toggle if not passed
    }
	},
};

export const actions = {
	// fetch multiple paragraphs/titles
	getMultipleRandomAction({ commit, state }, type, count) {
		commit("updateLoadState", false);
		let getCount = count || state.snippetsAmount; // amount requested
		let bookType = 'moby-dick';
		if (type !== undefined) {
			bookType = type;
		} else if (state.bookType !== '') {
			bookType = state.bookType; // fallback
		}
		axios.get(`${APIURL}/${state.contentType}/${bookType}/random/${getCount}`, {
			type: "cors",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Origin": "*",
				"x-access-token": APITOKEN
			}
		})
		.then(function(response) {
			return response.data;
		})
		.then(data => {
			let newItems = [];
			for (let item in data) {
        let trimmedPara = truncateText(data[item].content, 1250).trim();
				newItems.push({
          id: data[item]._id,
          text: trimmedPara,
          type: state.contentType,
        });
			}
			commit("updateLoadState", true);
			commit("updateParagraphs", [newItems]); // trigger the mutation once data fetched
		})
		.catch(function(err) {
			console.warn(err); // eslint-disable-line
		});
	},
	changeContentTypeAction({ commit }, type) {
		commit("changeContentType", type);
	},
	changeBookTypeAction({ commit }, type) {
		commit("changeBookType", type);
	},
	changeSnippetsAmountAction({ commit }, amount) {
		commit("changesnippetsAmount", amount);
	},
};
