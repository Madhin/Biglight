const http = require('http')
const fs = require('fs')

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'application/javascript' })
  fs.createReadStream('indexTest1.js').pipe(res)
  fs.createReadStream('indexTest2.js').pipe(res)
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
