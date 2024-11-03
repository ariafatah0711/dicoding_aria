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
];

module.exports = routes;

// http://localhost:5000
// http://localhost:5000/about
// http://localhost:5000/test
// http://localhost:5000/?name=aria&location=indo
// http://localhost:5000/?name=aria&location=indo&lang=id
