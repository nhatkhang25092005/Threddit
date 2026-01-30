export const delay = (ms, shouldFail = false, status = 500) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject({
          isAxiosError: true,
          response: {
            status,
            data: {
              message: 'Internal Server Error',
            },
          },
        });
      } else {
        resolve({
          status: 200,
          data: {},
        });
      }
    }, ms);
  });
};
