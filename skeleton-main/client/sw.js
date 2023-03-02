console.log('Started', self);

self.addEventListener('install', function (event) {
  self.skipWaiting();
  console.log('Installed', event);
});

self.addEventListener('activate', function (event) {
  console.log('Activated', event);
});

self.addEventListener('push', function(event) {
  console.log('Push message received', event);
  // TODO
});

self.addEventListener('fetch', (e) => {
  console.log('fetching:', e);

  var title = 'Simple Title';
  var options = {
    body: '리퀘스트 날렸어요',
  };

  // self.showNotification(title, options);
  // self.registration.showNotification(title, options);
});

// self.addEventListener('message', event => {
//   console.log('저 쪽 테이블에서 보내신 겁니다 -> ', event);
// });

// console.log(self.navigator.onLine);
