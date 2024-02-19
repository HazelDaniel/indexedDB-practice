//open

//succses
//failure
//object store

export const STORE_NAME = "todos";
export const DB_NAME = "todo_db";
export const DB_VERSION = 1;
export const TXN_RWRITE = "readwrite";
export const TXN_READ = "read";

export class DB {
  static openDB(callBack) {
    return new Promise((res, rej) => {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (err) => {
        rej(new Error("error opening database. please grant permission"));
      };
      request.onsuccess = (event) => {
        const db = event.target.result;
        res(db);
      };
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });

        store.transaction.onComplete = () => {
          console.log(`store ${STORE_NAME} has been created`);
        };
      };
    });
  }
}
