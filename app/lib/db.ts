import { openDB } from "idb";

export const dbPromise = openDB("portfolioDB", 1, {
  upgrade(db) {
    db.createObjectStore("projects", { keyPath: "id", autoIncrement: true });
  },
});