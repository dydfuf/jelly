/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
self.addEventListener("push", event => {
  console.log("[Service Worker] Push Received.", event.data.text());
  const {
    title,
    body
  } = event.data.json();
  event.waitUntil(self.registration.showNotification(title, {
    body
  }));
});
self.addEventListener("notificationclick", event => {
  console.log("[Service Worker] notificationclick");
  clients.openWindow(event.notification.data.link);
});
self.addEventListener("install", () => {
  console.log("[Service Worker] install");
  self.skipWaiting();
});
/******/ })()
;