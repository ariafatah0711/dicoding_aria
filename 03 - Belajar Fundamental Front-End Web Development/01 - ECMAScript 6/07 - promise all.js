const arabicaOrder = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Kopi Arabica selesai!");
    }, 4000);
  });
};

const robustaOrder = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Kopi Robusta selesai!");
    }, 2000);
  });
};

const librericaOrder = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Kopi Librerica selesai!");
    }, 3000);
  });
};

let promises = [arabicaOrder, robustaOrder, librericaOrder];
Promise.all(promises).then((resolvedValue) => {
  console.log(resolvedValue);
});

promises = [arabicaOrder(), robustaOrder(), librericaOrder()];
Promise.all(promises).then((resolvedValue) => {
  console.log(resolvedValue);
});
