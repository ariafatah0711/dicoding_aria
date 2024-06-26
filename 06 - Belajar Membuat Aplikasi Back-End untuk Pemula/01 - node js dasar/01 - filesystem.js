const fs = require("fs");

const fileReadCallback = (error, data) => {
  if (error) {
    console.log("gagal membuka berkas");
  }
  console.log(data);
};

fs.readFile("todo.txt", "utf-8", fileReadCallback);

// atau

// const fs = require("fs");

const data = fs.readFileSync("todo.txt", "UTF-8");
console.log(data, "\n");

// path dinamis
// path.resolve(__dirname, "../01 - node js dasar");
