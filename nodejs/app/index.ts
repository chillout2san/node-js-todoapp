import http from "http";

const server = http.createServer((req, res) => {
  res.end("hogehogeだよ");
});

server.listen(8000);
