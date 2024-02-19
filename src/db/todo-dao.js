import { DB, STORE_NAME, TXN_RWRITE } from "./db";


export class TodoDao {
  async add(todo) {
    const db = await DB.openDB();

    return new Promise((resolve, reject) => {
      const store = db
        .transaction([STORE_NAME], TXN_RWRITE)
        .objectStore(STORE_NAME);
      const request = store.add(todo);

      request.onsuccess = () => {
        const todoKey = request.result;
        this.get(todoKey).then((todo) => {
          resolve(todo);
        });
      };

      request.onerror = (err) => {
        reject(new Error(`an error occurred : ${err}`));
      };
    });
  }

  async getAll() {
    const db = await DB.openDB();

    return new Promise((resolve, reject) => {
      const store = db.transaction([STORE_NAME]).objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => {
        const todos = request.result;
        resolve(todos);
      };
      request.onerror = (err) => {
        reject(`error fetching todos : ${err}`);
      };
    });
  }

  async get(key) {
    const db = await DB.openDB();

    return new Promise((resolve, reject) => {
      const store = db.transaction([STORE_NAME]).objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        const todo = request.result;
        resolve(todo);
      };
      request.onerror = (err) => {
        reject(new Error(`an error occurred : ${err}`));
      };
    });
  }
}
