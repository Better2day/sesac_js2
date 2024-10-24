function asyncOperation1(response, callback) {
  setTimeout(() => {
    console.log("Operation1 completed");
    callback("Response1");
  }, 1000);
}

function asyncOperation2(response, callback) {
  setTimeout(() => {
    console.log("Operation2 completed", response);
    callback("Response2");
  }, 1000);
}

// Callback Hell
asyncOperation1(null, (response1) => {
  asyncOperation2(response1, (response2) => {
    asyncOperation1(response2, (response3) => {
      asyncOperation2(response3, (response4) => {
        console.log("Final Result: ", response4);
      });
    });
  });
});
