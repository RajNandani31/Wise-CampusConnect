import { db } from "./db";

export async function retryQueuedRequests() {
  const queued = await db.requests.toArray();

  for (const req of queued) {
    try {
      await fetch(req.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.payload),
      });
      await db.requests.delete(req.id);
    } catch (err) {
      console.warn("Retry failed, will try again later");
    }
  }
}
