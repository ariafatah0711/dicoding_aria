// Notifikasi membantu untuk menarik ulang pengguna untuk mengunjungi kembali website kita. Dengan adanya service worker dan Notification API

const requestPermission = async () => {
  // meminta ijin memunculkan notification
  const result = await Notification.requestPermission();

  if (result === "denied") {
    console.log("Fitur Notification tidak diijinkan");
    return;
  }
  if (result === "default") {
    console.log("Pengguna Menutup kotak dialog permintaan ijin");
    return;
  }

  console.log("Fitur notification diijinkan");
};

requestPermission();

// cek fitur notification
if ("Notification" in window) {
  requestPermission();
}

// menampilkan notification
navigator.serviceWorker.ready.then((registration) => {
  const title = "Judul Notifikasi";
  const options = { body: "Ini merupakan konten dari notifikasi" };

  registration.showNotification(title, options);
});
