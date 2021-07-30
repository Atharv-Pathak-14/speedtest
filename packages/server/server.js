const fs = require("fs");
const path = require("path");

const Logger = require("./src/logger");
const HttpServer = require("./src/httpServer");

const basePath = process.env.BASE_PATH || "web";
const httpPort = process.env.PORT || 80;
const logger = new Logger();

if (!fs.existsSync(path.join(process.cwd(), "results"))) {
  fs.mkdirSync(path.join(process.cwd(), "results"));
}

process.on("SIGINT", function() {
  process.exit();
});

new HttpServer(basePath, httpPort);
