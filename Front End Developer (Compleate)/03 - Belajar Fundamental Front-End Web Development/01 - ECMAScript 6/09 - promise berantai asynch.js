/* ------------------------------------------- ------------------------------------------- */
const state = {
  isCoffeMakerCoffeMakerReady: true,
  seedStock: {
    arabica: 250,
    robusta: 60,
    liberica: 80,
  },
};
const getSeeds = (type, miligrams) => {
  return new Promise((resolve, reject) => {
    if (state.seedStock[type] >= miligrams) {
      state.seedStock[type] -= miligrams;
      resolve("biji kopi didapatkan");
    } else {
      reject("maaf stock kopi habis");
    }
  });
};
const makeCoffee = (seed) => {
  return new Promise((resolve, reject) => {
    if (state.isCoffeMakerCoffeMakerReady) {
      resolve("kopi berhasil dibuat");
    } else {
      reject("maaf mesin tidak dapat digunakan");
    }
  });
};
const servingToTable = (coffee) => {
  return new Promise((resolve) => {
    resolve("pesanan kopi sudah selesai");
  });
};
/* ------------------------------------------- ------------------------------------------- */

/* menggunakan.then; */

function reserveACoffee(type, miligrams) {
  getSeeds(type, miligrams)
    .then(makeCoffee)
    .then(servingToTable)
    .then((resolvedValue) => {
      console.log(resolvedValue);
    })
    .catch((rejectedReason) => {
      console.log(rejectedReason);
    });
}

reserveACoffee("liberica", 50);
reserveACoffee("liberica", 50);

/* menggunakan asynch */

async function reserveACoffee(type, miligrams) {
  try {
    const seeds = await getSeeds(type, miligrams);
    const coffee = await makeCoffee(seeds);
    const result = await servingToTable(coffee);
    console.log(result);
  } catch (rejectedReason) {
    console.log(rejectedReason);
  }
}

reserveACoffee("arabica", 150);
