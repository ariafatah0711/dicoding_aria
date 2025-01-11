import FavoriteMovieIdb from "../../data/favorite-movie-idb";
import { createMovieItemTemplate } from "../templates/template-creator";
import FavoriteMovieView from "../pages/liked-movies/favorite-movie-view";
import FavoriteMovieShowPresenter from "./liked-movies/favorite-movie-show-presenter";
import FavoriteMovieSearchPresenter from "./liked-movies/favorite-movie-search-presenter";

const view = new FavoriteMovieView();

const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteMovieShowPresenter({ view, favoriteMovies: FavoriteMovieIdb });
    new FavoriteMovieSearchPresenter({ view, favoriteMovies: FavoriteMovieIdb });
  },
};

export default Like;
