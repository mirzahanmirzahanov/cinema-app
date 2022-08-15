import axios from 'axios'

export const state = () => ({
	movies: [],
	searchedMovies: []
})

export const mutations = {
	SET_MOVIES(state, result) {
		result.data.results.forEach((movie) => {
			state.movies.push(movie)
		})
	},
	SET_SEARCHED_MOVIES(state, result) {
		state.searchedMovies = []
		result.data.results.forEach((movie) => {
			state.searchedMovies.push(movie)
		})
	}
}

export const actions = {
	async GET_MOVIES({ commit }) {
		const data = axios.get(
			'https://api.themoviedb.org/3/movie/now_playing?api_key=56744e1a7026891464b1b3f169387682&language=en-US&page=1'
		);

		const result = await data
		commit('SET_MOVIES', result)
	},
	async SEARCH_MOVIES({ commit }, searchInput) {
		const data = axios.get(
			`https://api.themoviedb.org/3/search/movie?api_key=56744e1a7026891464b1b3f169387682&language=en-US&page=1&query=${searchInput}`
		)

		const result = await data
		commit('SET_SEARCHED_MOVIES', result)
	}
}

export const getters = {
	MOVIES(state) {
		return state.movies
	},
	SEARCHED_MOVIES(state) {
		return state.searchedMovies
	},
}