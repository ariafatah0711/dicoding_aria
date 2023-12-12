const getCoffee = (seed) => {
  return new Promise((resolve, reject) => {
    const seeds = seed;

    setTimeout(() => {
      if (seeds >= 10) {
        resolve("Coffee di dapatkan!");
      } else {
        reject("Biji Coffee habis!");
      }
    }, 1000);
  });
};

/* kode ini hanya bisa jika resolve(dan akan error ketika dia reject) */
// function makeCoffee() {
//   getCoffee(100).then((coffee) => {
//     console.log(coffee);
//   });
// }

// async function makeCoffee(seed) {
//   const coffee = await getCoffee(seed); // akan mendapatkan value ketika sudah selesai
//   // menghentikan proses pembacaan kode selanjutnya sampai fungsi getCoffee()
//   // mengembalikan nilai promise resolve.
//   console.log(coffee);
// }

async function makeCoffee(seed) {
  try {
    const coffee = await getCoffee(seed);
    console.log(coffee);
  } catch (rejectedReason) {
    console.log(rejectedReason);
  }
}

makeCoffee(1);
