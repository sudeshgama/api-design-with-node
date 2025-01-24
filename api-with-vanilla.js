import http from "http";

const server = http.createServer(async (req, res) => {
  console.log(req, res);
  if (req.url === "/" && req.method === "GET") {
    res.end();
  }
});

server.listen(3001, () => {
  console.log(`server is on http://localhost:3001`);
});
