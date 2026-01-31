const DB_NAME = 'beep-local-backend';
const DB_VERSION = 1;

export const STORE_NAMES = {
  USERS: 'users',
  PROJECTS: 'projects',
  FILES: 'files',
};

let dbPromise = null;

const openDatabase = () => {
  if (dbPromise) {
    return dbPromise;
  }

  dbPromise = new Promise((resolve, reject) => {
    const indexedDBGlobal = globalThis.indexedDB;
    if (!indexedDBGlobal) {
      reject(new Error('IndexedDB is not supported in this environment'));
      return;
    }

    const request = indexedDBGlobal.open(DB_NAME, DB_VERSION);

    request.addEventListener('upgradeneeded', (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(STORE_NAMES.USERS)) {
        const userStore = db.createObjectStore(STORE_NAMES.USERS, { keyPath: 'id' });
        userStore.createIndex('email', 'email', { unique: true });
        userStore.createIndex('username', 'username', { unique: true });
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.PROJECTS)) {
        const projectStore = db.createObjectStore(STORE_NAMES.PROJECTS, { keyPath: 'id' });
        projectStore.createIndex('ownerId', 'ownerId', { unique: false });
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.FILES)) {
        const fileStore = db.createObjectStore(STORE_NAMES.FILES, { keyPath: 'id' });
        fileStore.createIndex('projectId', 'projectId', { unique: false });
      }
    });

    request.addEventListener('success', () => resolve(request.result));
    request.addEventListener('error', () => reject(request.error));
  });

  return dbPromise;
};

const requestPromise = (request) => new Promise((resolve, reject) => {
  request.addEventListener('success', () => resolve(request.result));
  request.addEventListener('error', () => reject(request.error));
});

const runRequest = async (storeName, mode, callback) => {
  const db = await openDatabase();
  const tx = db.transaction(storeName, mode);
  const store = tx.objectStore(storeName);
  const request = callback(store);

  return requestPromise(request);
};

export const addRecord = (storeName, value) => runRequest(storeName, 'readwrite', (store) => store.add(value));

export const putRecord = (storeName, value) => runRequest(storeName, 'readwrite', (store) => store.put(value));

export const getRecord = (storeName, key) => runRequest(storeName, 'readonly', (store) => store.get(key));

export const getByIndex = (storeName, indexName, value) => runRequest(
  storeName,
  'readonly',
  (store) => store.index(indexName).get(value),
);

export const getAllByIndex = (storeName, indexName, value) => runRequest(
  storeName,
  'readonly',
  (store) => store.index(indexName).getAll(value),
);

export const getAllRecords = (storeName) => runRequest(storeName, 'readonly', (store) => store.getAll());
