export const delay = (ms, shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Simulated API failure'));
      } else {
        resolve();
      }
    }, ms);
  });
};