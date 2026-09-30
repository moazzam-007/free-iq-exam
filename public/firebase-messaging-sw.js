// Firebase Cloud Messaging Service Worker for freeiqexam.com
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCPK5DXNJ1Vuoi0lLFLO-GXIXOrrqYo62U",
  authDomain: "freeiqexam.firebaseapp.com",
  projectId: "freeiqexam",
  storageBucket: "freeiqexam.firebasestorage.app",
  messagingSenderId: "461140068366",
  appId: "1:461140068366:web:87a82bd3135ec05e5a545f"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message: ', payload);
  
  const title = (payload.notification && payload.notification.title) || (payload.data && payload.data.title) || 'Free IQ Exam';
  const body = (payload.notification && payload.notification.body) || (payload.data && payload.data.body) || 'A new IQ test challenge is ready for you!';
  const icon = (payload.notification && payload.notification.icon) || '/favicon.svg';
  const image = (payload.notification && payload.notification.image) || (payload.data && payload.data.image) || null;
  const clickAction = (payload.fcmOptions && payload.fcmOptions.link) || (payload.data && payload.data.url) || '/';

  const notificationOptions = {
    body: body,
    icon: icon,
    image: image,
    badge: '/favicon-squircle.svg',
    data: {
      url: clickAction
    }
  };

  return self.registration.showNotification(title, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
