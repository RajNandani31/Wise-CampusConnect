import { db } from "./db";

export async function saveRequestOffline(url, payload) {
  await db.requests.add({ url, payload });
}
