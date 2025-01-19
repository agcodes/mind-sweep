self.onmessage = e => {
   const imageData = [];
   
    
    console.log("on message");
    self.postMessage(imageData, [imageData]);
  };
  