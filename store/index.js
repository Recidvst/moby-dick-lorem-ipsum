import { setFetchHeaders } from "../assets/js/utils";
import { truncateText } from "../assets/js/utils";
const APIURL = process.env.APIURL;
const APITOKEN = process.env.APITOKEN;

export const state = () => ({
	snippetsArray: ['...'],
	snippetsAmount: 5,
	contentType: "paragraphs",
	token: APITOKEN
});

export const mutations = {
	updateParagraphs(state, [newParagraphs]) {
		state.snippetsArray = newParagraphs;
	},
	changesnippetsAmount(state, amount) {
		state.snippetsAmount = amount;
	},
	changeContentType(state, cType) {
		state.contentType = cType;
	}
};

export const actions = {
	// fetch multiple paragraphs/titles
	getMultipleRandomAction({ commit, state }, count) {
		let getCount = count || state.snippetsAmount;
		fetch(`${APIURL}/${state.contentType}/random/${getCount}`, {
			method: "GET",
			type: "cors",
			headers: setFetchHeaders(state.token)
		})
		.then(function(response) {
			return response.json();
		})
		.then(data => {
			let newParas = [];
			for (let para in data) {
				let trimmedPara = truncateText(data[para].content, 1250).trim();
				newParas.push(trimmedPara);
			}
			commit("updateParagraphs", [newParas]); // trigger the mutation once data fetched
		})
		.catch(function(err) {
			console.warn(err); // eslint-disable-line
		});
	},
	changeContentTypeAction({ commit }, type) {
		commit("changeContentType", type);
	},
	changeSnippetsAmountAction({ commit }, amount) {
		commit("changesnippetsAmount", amount);
	}
};
