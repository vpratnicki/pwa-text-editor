import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method that accepts some content and adds it to the database
export const putDb = async (content) => { 
  console.log('PUT to the database');

  // Create a connection to the IndexedDB database and the version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the store and data privileges.
  const tx = jateDb.transaction('jate', "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .put() method to get all data in the database.
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('data saved to the database', result);
};

// Method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the IndexedDB database and the version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the store and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
