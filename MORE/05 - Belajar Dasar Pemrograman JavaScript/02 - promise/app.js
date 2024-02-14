// Promise.all => mengeksekusi banyak Promise secara paralel
let promise1 = new Promise((resolve) => setTimeout(() => resolve(1), 1000));
let promise2 = new Promise((resolve) => setTimeout(() => resolve(2), 2000));
let promise3 = new Promise((resolve) => setTimeout(() => resolve(3), 3000));

Promise.all([promise1, promise2, promise3]).then((values) =>
  console.log(values)
); // [1, 2, 3] setelah 3 detik

// Promise.race => mengembalikan nilai Promise yang prosesnya paling cepat
promise1 = new Promise((resolve) => setTimeout(() => resolve(1), 1000));
promise2 = new Promise((resolve) => setTimeout(() => resolve(2), 2000));
promise3 = new Promise((resolve) => setTimeout(() => resolve(3), 3000));

Promise.race([promise1, promise2, promise3]).then((value) =>
  console.log(value)
); // 1 setelah 1 detik

// Promise.allSettled => mengembalikan seluruh hasil dari Promise yang dieksekusi dalam bentuk array of object dengan format berikut.
/*
{
    status: 'fulfilled' | 'rejected',
    value: 'value of the Promise',
    reason: 'error of the Promise',
}
*/

promise1 = new Promise((resolve) => setTimeout(() => resolve(1), 1000));
promise2 = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error("Error")), 2000)
);
promise3 = new Promise((resolve) => setTimeout(() => resolve(3), 3000));

Promise.allSettled([promise1, promise2, promise3]).then((results) =>
  console.log(results)
);
// [{status: "fulfilled", value: 1}, {status: "rejected", reason: Error}, {status: "fulfilled", value: 3}] setelah 3 detik

// Promise.any =>  mengembalikan nilai tercepat yang berstatus fulfilled.
// fulfilled sample
const promiseResolve1 = new Promise((resolve, reject) =>
  setTimeout(() => resolve("1"), 1000)
);
const promiseResolve2 = new Promise((resolve, reject) =>
  setTimeout(() => resolve("2"), 2000)
);
const promiseResolve3 = new Promise((resolve, reject) =>
  setTimeout(() => resolve("3"), 3000)
);

Promise.any([promiseResolve1, promiseResolve2, promiseResolve3])
  .then((value) => console.log(value)) // 1
  .catch((error) => console.log(error.message));

// rejected sample
const promiseReject1 = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error("1")), 1000)
);
const promiseReject2 = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error("2")), 2000)
);
const promiseReject3 = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error("3")), 3000)
);

Promise.any([promiseReject1, promiseReject2, promiseReject3])
  .then((value) => console.log(value))
  .catch((error) => console.log(error.message)); // All Promises were rejected
