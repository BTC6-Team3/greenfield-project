const createServer = require("./server");

const server = createServer();
const port = 3000;

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
