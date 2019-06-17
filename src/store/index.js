import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		rssItem: {}
	},
	mutations: {
		setRssItem(state, payload) {
			state.login = false;
			state.rssItem = payload.rssItem
			console.log("Vuex.Store set rssItem   ", state.rssItem)
		}
	}
})
export default store
