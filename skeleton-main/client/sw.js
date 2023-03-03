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
  if (e.request.method === 'PUT' && e.request.url.split('localhost:8000')[1] === '/file') {
    const title = '저장';
    const options = {
      body: '저장 성공',
    };

    self.registration.showNotification(title, options);
  }
});
