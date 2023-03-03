self.addEventListener('install', function (event) {
  self.skipWaiting()
  console.log('Installed', event);
});

self.addEventListener('activate', function (event) {
  console.log('Activated', event);
});

self.addEventListener('push', function (event) {
  console.log('Push message received', event);
});

self.addEventListener('fetch', (e) => {
  if (e.request.method === 'PUT' && e.request.url === 'http://localhost:8000/file') {
    const title = 'Simple Title';
    const options = {
      body: '저장 성공!',
    };

    self.registration.showNotification(title, options);
  }
});
