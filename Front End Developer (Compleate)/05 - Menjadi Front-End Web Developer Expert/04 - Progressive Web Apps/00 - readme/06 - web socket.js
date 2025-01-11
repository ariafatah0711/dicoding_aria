// web socket => komunikasi full duplex yang memungkinkan sebuah web dapat selalu terhubung

// Menghubungkan ke WebSocket
const webSocket = new WebSocket("wss://www.example.com/socketserver");

// Mengirim data ke WebSocket server
webSocket.send("Some text that the server is urgently awaiting!");

// data lebih kompleks
webSocket.onopen = (event) => {
  const data = {
    type: "message",
    text: document.querySelector("#text"),
    date: Date.now(),
  };

  webSocket.send(JSON.stringify(data));
};

// mengirimkan data
const webSocket = new WebSocket("wss://www.example.com/socketserver");

webSocket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};

// menutup web socket
webSocket.onclose = (event) => {
  console.log("WebSocket connection was close");
};
