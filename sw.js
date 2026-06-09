/* Zoya Asthma — service worker
   Handles add-to-home install and reminder notification clicks.
   Scheduled (TimestampTrigger) notifications are created from the page;
   this worker just needs to exist and route taps back into the app. */

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "./";
  event.waitUntil(
    (async () => {
      const all = await clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const c of all) {
        if ("focus" in c) {
          try { await c.focus(); return; } catch (e) {}
        }
      }
      if (clients.openWindow) await clients.openWindow(url);
    })()
  );
});
