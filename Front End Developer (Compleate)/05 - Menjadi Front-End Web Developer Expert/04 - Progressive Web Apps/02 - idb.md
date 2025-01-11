npm install idb

import { openDB } from 'idb';
 
const DATABASE_NAME = 'my-pwa-database';
const OBJECT_STORE_NAME = 'movie';
 
const dbPromise = openDB(DATABASE_NAME, 1, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

CRUD
- get data
    - const movie = (await dbPromise).get(OBJECT_STORE_NAME, id);
    - const movies = (await dbPromise).getAll(OBJECT_STORE_NAME);
  
- Input Data
    - (await dbPromise).add(OBJECT_STORE_NAME, movie);
      ```
      const movie = {
        id: 1,
        title: 'Spiderman',
        description: 'Lorem ipsum dolor sit amet',
      };
      
      (await dbPromise).add(OBJECT_STORE_NAME, movie);
      ```
- update
    - (await dbPromise).put(OBJECT_STORE_NAME, movie);
  
- delete data
    - (await dbPromise).delete(OBJECT_STORE_NAME, id);