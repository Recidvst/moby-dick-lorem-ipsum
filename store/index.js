import Vuex from 'vuex'
import { setFetchHeaders } from '@/assets/js/utils';
import { truncateText } from '@/assets/js/utils';
import { APIURL }  from '@/static/config'; // get api endpoint
import { APITOKEN }  from '@/static/config'; // get api token

const createStore = () => {
  return new Vuex.Store({
    state: {
        quoteParagraph : "...",
        paragraphsArray : ['Panting and snorting like a mad battle steed that has lost its rider, the masterless ocean overruns the globe.', 'Panting and snorting like a mad battle steed that has lost its rider, the masterless ocean overruns the globe.','Panting and snorting like a mad battle steed that has lost its rider, the masterless ocean overruns the globe.','Panting and snorting like a mad battle steed that has lost its rider, the masterless ocean overruns the globe.','Panting and snorting like a mad battle steed that has lost its rider, the masterless ocean overruns the globe.'],
        parasAmount : 3,
        token: APITOKEN()
    },
    mutations: {
        updateParagraphs (state, [newParagraphs]) {
            state.paragraphsArray = newParagraphs;
        },
        changeParasAmount (state, amount) {
            state.parasAmount = amount;
        },
        randomiseQuoteParagraph (state, newPara) {
            state.quoteParagraph = newPara;
        }
    },
    actions: {        
        // fetch the client list from the external source
        getOneRandomAction ({ commit, state }) {
            fetch(`${APIURL()}/paragraphs/random`, {
                method: 'GET',
                type: 'cors',
                headers: setFetchHeaders(state.token)
            }).then(function(response) {
                return response.json();
            }).then( (data) => {
                console.warn(data);
                let printData = data[0].content;
                printData = truncateText(printData, 1500);
                commit('randomiseQuoteParagraph', printData); // trigger the mutation once data fetched
            }).catch(function(err) {
                console.warn(err);
                commit('randomiseQuoteParagraph', "All that most maddens and torments; all that stirs up the lees of things; all truth with malice in it; all that cracks the sinews and cakes the brain; all the subtle demonisms of life and thought; all evil, to crazy Ahab, were visibly personified, and made practically assailable in Moby Dick. He piled upon the whale's white hump the sum of all the general rage and hate felt by his whole race from Adam down; and then, as if his chest had been a mortar, he burst his hot heart's shell upon it."); // reset to a default if failed
            });
        },
    }
  })
}

export default createStore