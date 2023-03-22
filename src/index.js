const http = require("http");

// Controllers
const notFountController = require("./controllers/NotFoundController");
const usersController = require("./controllers/UsersController");

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}/`;

const routes = {
  notFound: notFountController,
  users: usersController,
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, BASE_URL);

  const pathname = url.pathname.replace(/^\/+/g, "");

  const handler = routes[pathname] || routes.notFound;

  return handler({ res, searchParams: url.searchParams });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
