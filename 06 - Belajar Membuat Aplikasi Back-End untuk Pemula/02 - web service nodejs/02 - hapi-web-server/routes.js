const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      const { name, location, lang } = request.query;
      if (lang == "id") {
        a = "hi";
      } else {
        a = "hello";
      }
      if (name == undefined || location == undefined) {
        return `${a} world`;
      }
      return `${a} ${name} from ${location}`;
    },
  },
  {
    method: "*",
    path: "/",
    handler: (request, h) => {
      return "halaman tidak bisa diakses dengan method";
    },
  },
  {
    method: "GET",
    path: "/about",
    handler: (request, h) => {
      return "about page";
    },
  },
  {
    method: "*",
    path: "/about",
    handler: (request, h) => {
      return "halaman tidak bisa diakses dengan method";
    },
  },
  {
    method: "GET",
    path: "/hello/{name?}",
    handler: (request, h) => {
      const { name = "stranger" } = request.params;
      return `hello ${name}`;
    },
  },
  {
    method: "*",
    path: "/{any*}",
    handler: (request, h) => {
      return "halamn tidak bisa diakses";
    },
  },
  {
    method: "POST",
    path: "/login",
    handler: (request, h) => {
      const { username, password } = request.query;
      return `welcome ${username}`;
    },
  },
  {
    method: "POST",
    path: "/user",
    handler: (request, h) => {
      // return h.response("created").code(201);
      /* detail notation */
      // const response = h.response("success");
      // response.type("text/plain");
      // response.header("Custom-Header", "Some-value");
      // return response;
      /* chained notion  */
      return h.response("success").type("text/plain").header("author", "aria-ganteng");
    },
  },
];

module.exports = routes;

// http://localhost:5000
// http://localhost:5000/about
// http://localhost:5000/test
// http://localhost:5000/?name=aria;location=indo
// http://localhost:5000/?name=aria;location=indo&lang=id
