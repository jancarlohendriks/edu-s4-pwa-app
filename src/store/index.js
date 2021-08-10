import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
		stream: null,
		capturedImage: null,
		profile: null,
		children: [],
		albums: [],
		photos: [],
  },
  mutations: {
		initialiseStore(state) {
			// Check if the ID exists
			if(localStorage.getItem('store')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
		},
		SET_PROFILE (state, payload) {
			state.profile = payload
		},
		SET_CHILDREN (state, payload) {
			state.children = payload
		},
		SET_CAPTURED (state, payload) {
			state.capturedImage = payload
		},
		SET_STREAM (state, payload) {
			state.stream = payload
		},
		SET_NEW_ALBUMS (state, payload) {
			state.albums = payload
		},
		SET_NEW_PHOTO (state, payload) {
			state.photos = payload
		},
  },
})

// Subscribe to store updates
store.subscribe((mutation, state) => {
	// Store the state object as a JSON string
	localStorage.setItem('store', JSON.stringify(state));
});

export default store