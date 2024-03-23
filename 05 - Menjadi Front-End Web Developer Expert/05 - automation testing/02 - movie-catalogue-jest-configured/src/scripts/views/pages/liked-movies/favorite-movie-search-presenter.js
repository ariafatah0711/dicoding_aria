class FavoriteMovieSearchPresenter {
  constructor({ favoriteMovies, view }) {
    this._favoriteMovies = favoriteMovies;
    this._view = view; // Pastikan view sudah disetel dengan benar
    this._listenToSearchRequestByUser();
    this._latestQuery = ""; // initialize latestQuery
  }

  _listenToSearchRequestByUser() {
    if (!this._view) {
      throw new Error("View is not defined!");
    }

    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchMovies(latestQuery);
    });
  }

  async _searchMovies(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundMovies;
    if (this._latestQuery.length > 0) {
      foundMovies = await this._favoriteMovies.searchMovies(this._latestQuery);
    } else {
      foundMovies = await this._favoriteMovies.getAllMovies();
    }

    this._showFoundMovies(foundMovies);
  }

  _showFoundMovies(foundMovies) {
    if (!this._view) {
      throw new Error("View is not defined!");
    }

    this._view.showMovies(foundMovies);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteMovieSearchPresenter;
