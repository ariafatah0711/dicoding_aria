// console.log("aria");
const Hapi = require("@hapi/hapi");
const routes = require("./routes.js");

const init = async () => {
  const server = Hapi.server({
    port: 8000,
    // host: "127.0.0.1",
    host: "192.168.80.177",
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
