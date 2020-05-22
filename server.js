const { createProxyMiddleware } = require("http-proxy-middleware");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const statistics = require("./mocked-apis/statistics.js");
const { setupVaults } = require("./mocked-apis/vaults.js");

server.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

statistics(server);
setupVaults(server);

server.use(createProxyMiddleware({ target: "http://localhost:4242 " }));
server.use(middlewares);
server.use(router);

const port = process.env.PORT || 4243;

server.listen(port, () => {
  console.log(`development server is running at http://localhost:${port}`);
});
