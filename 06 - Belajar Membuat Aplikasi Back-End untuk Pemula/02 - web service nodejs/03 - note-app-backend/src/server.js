const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: 8000,
    host: "127.0.0.1",
  });

  await server.start();
  console.log(`server berjalan pada ${server.info.uri}`);
};

init();
