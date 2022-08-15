<template>
  <div class="home">
    <hero/>
    <div class="container search">
      <input 
        type="text" 
        placeholder="Search"
        v-model.lazy="searchInput"
        @keyup.enter="$fetch"
      />
      <button 
        class="button"
        @click="clearSearch" 
        v-show="searchInput" 
      >
        Clear Search
      </button>
    </div>
    <loading v-if="$fetchState.pending"/>
    <div v-else class="container movies">
      <!-- searched movies -->
      <div v-if="searchInput !== '' " id="movie-grid" class="movies-grid"
      >
        <div 
          class="movie"
          v-for="(movie, index) in this.searchedMovies" 
          :key="index"
        >
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              alt="movie-img"
            />
            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>
          <div class="info">
            <p class="title">
              {{ movie.title.slice(0, 25) }}
              <span v-if="movie.title.length > 25">...</span>
            </p>
            <p class="release">
              Released:
              {{
                new Date(movie.release_date).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              }}
            </p>
            <nuxt-link
              class="button button-light"
              :to="{
                name: 'movies-movieid',
                params: { movieid: movie.id },
              }"
            >
              Get More Info
            </nuxt-link>
          </div>
        </div>
      </div>
      <!-- now streaming -->
      <div v-else id="movie-grid" class="movies-grid">
        <div 
          class="movie" 
          v-for="(movie, index) in this.movies" 
          :key="index"
        >
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              alt="movie-img"
            />
            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>
          <div class="info">
            <p class="title">
              {{ movie.title.slice(0, 25) }}
              <span v-if="movie.title.length > 25">...</span>
            </p>
            <p class="release">
              Released:
              {{
                new Date(movie.release_date).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              }}
            </p>
            <nuxt-link
              class="button button-light"
              :to="{
                name: 'movies-movieid',
                params: { movieid: movie.id },
              }"
            >
              Get More Info
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


export default {
  components: {},
  name: 'IndexPage',
  computed: {
    ...mapGetters({
      movies:'movies/MOVIES',
      searchedMovies:'movies/SEARCHED_MOVIES'
  })
  },
  props: {},
  head() {
    return {
      title: 'Move App - Latest Streaming Movie info',
      meta: [
        {
          hid: 'desc',
          name: 'description',
          content: 'Get all the latest streaming movies in theaters & online'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'movies, stream, streaming'
        }
      ]
    }
  },
  data: () => ({
    searchInput: ''
  }),
  async fetch() {
    if(this.searchInput === '') {
      await this.getMovies()
      return
    }
    await this.searchMovies(this.searchInput)
  },
  fetchDelay: 1200,
  methods: { 
    ...mapActions({
      getMovies:'movies/GET_MOVIES',
      searchMovies: 'movies/SEARCH_MOVIES'
    }),
    clearSearch() {
      this.searchInput = ''
    }
  },
}
</script>

<style lang="scss" scoped>
.home {
  .loading {
    padding-top: 120px;
    align-items: flex-start;
  }
  .search {
    display: flex;
    padding: 32px 16px;
    input {
      max-width: 350px;
      width: 100%;
      padding: 12px 6px;
      font-size: 14px;
      border: none;
      &:focus {
        outline: none;
      }
    }
    .button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .movies {
    padding: 32px 16px;
    .movies-grid {
      display: grid;
      column-gap: 32px;
      row-gap: 64px;
      grid-template-columns: 1fr;
      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 750px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
      }
      .movie {
        position: relative;
        display: flex;
        flex-direction: column;
        .movie-img {
          position: relative;
          overflow: hidden;

          img {
            display: block;
            width: 100%;
            height: 100%;
          }
          .review {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background-color: #c92502;
            color: #fff;
            border-radius: 0 0 16px 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          .overview {
            line-height: 1.5;
            position: absolute;
            bottom: 0;
            background-color: rgba(201, 38, 2, 0.9);
            padding: 12px;
            color: #fff;
            transform: translateY(100%);
            transition: 0.3s ease-in-out all;
          }
          &:hover {
            .overview {
              transform: translateY(0);
            }
          }
        }
        .info {
          margin-top: auto;
          .title {
            margin-top: 8px;
            color: #fff;
            font-size: 20px;
          }
          .release {
            margin-top: 8px;
            color: #c9c9c9;
          }
          .button {
            margin-top: 8px;
          }
        }
      }
    }
  }
}
</style>

