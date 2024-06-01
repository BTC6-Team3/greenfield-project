const createServer = require("./server");

const server = createServer();
const port = 8080;

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
