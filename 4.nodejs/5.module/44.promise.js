const myPromise = new Promise((resolve, reject) => {
  // 비동기 작업을 수행해서
  // 성공하면 resolve(), 실패하면 reject()를 호출해준다.
});

myPromise
    .then((result) => {
    // 성공했을 때
    })
    .catch((error) => {
    // 실패했을 때
    });

function asyncOperation1(response, callback) {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Operation1 completed', response);
        resolve("Response1");
    }, 1000);
    });
}

function asyncOperation2(response, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Operation2 completed", response);
      resolve("Response2");
    }, 1000);
  });
}


asyncOperation1()
  .then((response1) => asyncOperation2(response1))
  .then((response2) => asyncOperation1(response2))
  .then((response3) => asyncOperation2(response3))
  .then((response4) => {
    console.log("Final Result: ", response4);
  })
  .catch((error) => {
    console.error("에러 발생: ", error);
  });
  
/*     
	try {
		console.log('');
	} catch (error) {
		console.error('');
	}
 */
/* 
async function executeOperations() {
    try {
        const response1 = await asyncOperation1(null);
        const response2 = await asyncOperation2(response1);
        const response3 = await asyncOperation1(response2);
        const response4 = await asyncOperation2(response3);
        console.log("Final response: ", response4);
    } catch (error) {
        console.error("에러 발생: ", error);
    }
}

executeOperations();
 */