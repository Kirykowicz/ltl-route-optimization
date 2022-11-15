let orders = require('./data');
let buildOptimizedLoads = require('./buildOptimizedLoads');

const renderOutput = (input, time = 30000) => {
  const promise = new Promise((resolve, reject) => {
    resolve(buildOptimizedLoads(input));
  });

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request timed out'));
    }, time);
  });

  return Promise.race([promise, timeoutPromise]).then((res) =>
    console.dir(res, { depth: null })
  );
};

renderOutput(orders, 3000);
