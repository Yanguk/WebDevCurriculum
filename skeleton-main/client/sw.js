self.addEventListener('install', function (event) {
  console.log('Installed', event);
});

self.addEventListener('activate', function (event) {
  console.log('Activated', event);
});

self.addEventListener('push', function (event) {
  console.log('Push message received', event);
  // TODO
});

self.addEventListener('fetch', (e) => {
  // console.log('fetching:', e.request);
  if (e.request.method === 'PUT' && e.request.url === 'http://localhost:8000/file') {
    const title = 'Simple Title';
    const options = {
      body: '저장 성공!',
    };

    self.registration.showNotification(title, options);
  }
});

// self.addEventListener('message', event => {
//   console.log('저 쪽 테이블에서 보내신 겁니다 -> ', event);
// });

// console.log(self.navigator.onLine);
