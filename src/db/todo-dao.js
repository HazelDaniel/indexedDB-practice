import { DB, STORE_NAME, TXN_READ, TXN_RWRITE } from "./db";

export class TodoDao {
  async add(todo) {
    const db = await DB.openDB();
    const store = db
      .transaction([STORE_NAME], TXN_RWRITE)
      .objectStore(STORE_NAME);
    try {
      let resKey = await store.add(todo);
      return store.get(resKey);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getAll(label) {
    const db = await DB.openDB();
    const store = db.transaction([STORE_NAME]).objectStore(STORE_NAME);
    console.log("label is : ", label);

    try {
      if (label) {
        const res = store.index("idx_label").getAll(label);
        return res;
      }
      return store.getAll();
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async getLabels() {
    const db = await DB.openDB();
    const store = db
      .transaction([STORE_NAME], TXN_READ)
      .objectStore(STORE_NAME);
    let cursor = await store
      .index("idx_label")
      .openKeyCursor(null, "nextunique");
    const labels = [];
    while (cursor) {
      labels.push(cursor.key);
      cursor = await cursor.continue();
    }

    return labels;
  }

  async get(key) {
    const db = await DB.openDB();
    const store = db.transaction([STORE_NAME]).objectStore(STORE_NAME);

    try {
      return store.get(key);
    } catch (err) {
      return null;
    }
  }

  async delete(key) {
    const db = await DB.openDB();
    const store = db
      .transaction([STORE_NAME], TXN_RWRITE)
      .objectStore(STORE_NAME);

    return store.delete(key);
  }

  async update(todo) {
    const db = await DB.openDB();
    const store = db
      .transaction([STORE_NAME], TXN_RWRITE)
      .objectStore(STORE_NAME);

    return store.put(todo);
  }
}
