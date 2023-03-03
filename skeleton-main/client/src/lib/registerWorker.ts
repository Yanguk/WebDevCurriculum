if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then(() => console.log('서비스 워커 등록'))
      .catch((err) => console.log(err));
  });

  // window.addEventListener('load', () => {
  //   navigator.serviceWorker.register('/sw.js', { scope: '/' });
  // });

  Notification.requestPermission((result) => {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          tag: 'vibration-sample',
        });
      });
    }
  });
}

export default {};
