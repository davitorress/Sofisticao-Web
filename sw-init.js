		// PWA - register service worker
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('sw.js').then(function(reg) {
				console.log('teste');
			});
		}