import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
        quoteParagraph : "All that most maddens and torments; all that stirs up the lees of things; all truth with malice in it; all that cracks the sinews and cakes the brain; all the subtle demonisms of life and thought; all evil, to crazy Ahab, were visibly personified, and made practically assailable in Moby Dick. He piled upon the whale's white hump the sum of all the general rage and hate felt by his whole race from Adam down; and then, as if his chest had been a mortar, he burst his hot heart's shell upon it.",
        paragraphsArray : ['Panting and snorting like a mad battle steed that has lost its rider, the masterless ocean overruns the globe.', 'Panting and snorting like a mad battle steed that has lost its rider, the masterless ocean overruns the globe.','Panting and snorting like a mad battle steed that has lost its rider, the masterless ocean overruns the globe.','Panting and snorting like a mad battle steed that has lost its rider, the masterless ocean overruns the globe.','Panting and snorting like a mad battle steed that has lost its rider, the masterless ocean overruns the globe.'],
        parasAmount : 3
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
    }
  })
}

export default createStore