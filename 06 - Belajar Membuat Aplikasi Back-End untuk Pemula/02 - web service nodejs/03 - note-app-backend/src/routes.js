const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler } = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
    // options: {
    //   cors: {
    //     origin: ["*"],
    //   },
    // },
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteByIdHandler,
  },
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler,
  },
];

module.exports = routes;
