self.onmessage = function(event) {
    // Handle messages and perform background tasks
    console.log('Background task started:', event.data);
    self.postMessage('Background task completed');
};
