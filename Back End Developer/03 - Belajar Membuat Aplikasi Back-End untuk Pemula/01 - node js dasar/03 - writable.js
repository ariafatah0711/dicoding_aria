const fs = require("fs");

const writableStream = fs.createWriteStream("output.txt");

writableStream.write("text 1\n");
writableStream.write("text 2\n");
writableStream.write("text 3\n");

writableStream.end("\nend");
