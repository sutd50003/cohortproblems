function asyncCounter() {
  var count = 0;
  return new Promise((resolve, reject) => {
    resolve(count);
  });
}

function incr(count) { 
  console.log(count);
  return new Promise((resolve, reject) => {
    resolve(++count);
  });
}
let counter = asyncCounter();

counter.then(incr).then(incr).then(incr);

// same as 
var count = 0; //  
new Promise((resolve, reject) => { // [[PromiseState]]: resolved
  resolve(count);}) // [[PromiseResult]]
  .then(incr) // [[PromiseFulfillReaction]][[Handler]]
  .then(incr) // [[PromiseFulfillReaction]][[Handler]]
  .then(incr); // [[PromiseFulfillReaction]][[Handler]]



