import { openDB } from "idb";

const STORE_NAME = "movies-store";
const OBJECT_STORE_NAME = "movies";

const dbPromise = openDB(STORE_NAME, 1, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
  },
});

const Database = {
  async getMovie(id) {
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllMovies() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putMovie(movie) {
    return (await dbPromise).add(OBJECT_STORE_NAME, movie);
  },
  async updateMovie(movie) {
    return (await dbPromise).put(OBJECT_STORE_NAME, movie);
  },
  async deleteMovie(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default Database;
