## server
port (number) : jalur yang digunakan untuk mengakses HTTP server.
hostname (string) : nama domain yang digunakan oleh HTTP server.
backlog (number) : maksimal koneksi yang dapat ditunda (pending) pada HTTP server.
listeningListener (function) : callback yang akan terpanggil ketika HTTP server sedang bekerja (listening).

const requestListener = (request, response) => {
    const method = request.method;
};

const requestListener = (request, response) => {
    const { method } = request;
 
    if(method === 'GET') {
        // response ketika GET
    }
 
    if(method === 'POST') {
        // response ketika POST
    }
 
    // Anda bisa mengevaluasi tipe method lainnya
};

const requestListener = (request, response) => {
    let body = [];
 
    request.on('data', (chunk) => {
        body.push(chunk);
    });
 
    request.on('end', () => {
        body = Buffer.concat(body).toString();
    });
};

## routing request
if (url === "/") {
    if (method === "GET") {
        response.end("<h1>Ini adalah homepage</h1>");
    } else {
        response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
    }
} else if (url === "/about") {
    if (method === "GET") {
        response.end("<h1>Halo! Ini adalah halaman about</h1>");
    } else if (method === "POST") {
        let body = [];

        request.on("data", (chunk) => {
        body.push(chunk);
        });

        request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
        });
    } else {
        response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
    }
} else {
    response.end("<h1>Halaman tidak ditemukan!</h1>");
}

## response status
const requestListener = (request, response) => {
    response.statusCode = 404;
 
    // 404 defaultnya adalah 'not found'
    response.statusMessage = 'User is not found';
};

## response header
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
};

response.setHeader('Content-Type', 'application/json');
response.setHeader('Powered-By', 'Node.js');

## response body


## web framework
