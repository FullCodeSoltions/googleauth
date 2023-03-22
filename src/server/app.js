const config = require("./commons/config");

const CONTEXT_PATH = `/${config.contextPath}`;
const { server, setupRoutes, createServer } = require("./server")

setupRoutes(CONTEXT_PATH);

createServer();

module.exports = server;
