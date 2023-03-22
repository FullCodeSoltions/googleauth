const express = require("express");
const server = express();
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");
const hpp = require("hpp");
const http = require("http");
const config = require("./commons/config");

server.use(helmet());
server.use(cookieParser());
server.use(compression({
    level: 5
}));
server.use(express.json({ limit: "64mb" }));
server.use(express.urlencoded({
    extended: true
}), hpp());

function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }

    res.status(500);
    res.send((err && err.message) || 'Internal server error')
}

server.disable("x-powered-by");

server.use(function (req, res, next) {
    next();
});

const setupRoutes = contextPath => {
    server.use(`${contextPath}/status`, (req, res) => {
        const packageJSON = require("../../package.json");

        res.send({
          STATUS: "UP",
          version: packageJSON.version
        })
    });
    
    server.use(`/rest/v1/auth/brokers`, require("./modules/brokers/router/BrokerRouter"));

    server.use(errorHandler);
}

const createServer = () => {
    http.createServer({}, server).listen(config.server.PORT,() => {
        console.log('http server started on port::', config.server.PORT);
    });
}

module.exports = {
    server,
    setupRoutes,
    createServer
};
