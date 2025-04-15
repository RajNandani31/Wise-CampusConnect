import Dexie from "dexie";

export const db = new Dexie("OfflineRequestsDB");

db.version(1).stores({
  requests: "++id, url, payload",
});
