function log(...args) {
  console.log("service-worker:", ...args);
}

// https://github.com/microsoft/TypeScript/issues/14877
((self) => {
  log("hello");

  self.addEventListener("install", (event) => {
    log("install", { event });
    event.waitUntil(self.skipWaiting());
  });

  self.addEventListener("activate", (event) => {
    log("activate", { event });
  });

  self.addEventListener("push", (event) => {
    log("push", { event });

    const message = event.data?.json();
    log("push message", { message });
    event.waitUntil(
      self.registration.showNotification(message.title, {
        body: message.body,
      })
    );
  });

  self.addEventListener("notificationclick", (event) => {
    log("notificationclick", { event });
    self.clients.openWindow("/memory");
  });
  // eslint-disable-next-line no-restricted-globals
})(self);
