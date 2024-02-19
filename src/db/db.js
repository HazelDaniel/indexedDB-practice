//open

//succses
//failure
//object store

export const STORE_NAME = "todos";
export const DB_NAME = "todo_db";
export const DB_VERSION = 2;
export const TXN_RWRITE = "readwrite";
export const TXN_READ = "readonly";

import { openDB } from "idb";

export class DB {
  static openDB() {
    return openDB(DB_NAME, DB_VERSION, {
      upgrade: (db, oldVersion, newVersion) => {
        if (oldVersion !== newVersion) {
          db.deleteObjectStore(STORE_NAME);
        }
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("idx_label", "label", { unique: false });

        store.transaction.oncomplete = () => {
          console.log(`store ${STORE_NAME} has been created`);
        };
      },
    });
  }
}
