/* Detect if we're in a worker or not */
var isWorker = false;
try {
  document;
} catch (e){
  isWorker = true;
}

if (isWorker){
  if (!self.Worker){
    self.Worker = function(path){

    };
    Worker.prototype = {
      onerror: null,
      onmessage: null,
      postMessage: function(message){

      },
      terminate: function(){

      },
      addEventListener: function(type, listener, useCapture){

      },
      removeEventListener: function(type, listener, useCapture){

      },
      dispatchEvent: function(event){

      }
    };
  }
}

/* Hijack Worker */
var allWorkers = {};
var oldWorker = Worker;
var messageRecieved = function(event){

};
Worker = function(path){
  if (this.constructor !== Worker){
    throw new TypeError("Failed to construct 'Worker': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
  }
  var newWorker = new oldWorker(path);
  newWorker.addEventListener("message", messageRecieved);
  
  allWorkers[path] = newWorker;

  return newWorker;
}