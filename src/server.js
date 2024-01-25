const http = require("http")
const controller = require("./controllers/main-controller.js")


const server = http.createServer((req, res) => {
  // Request and response handling
  controller.route(req, res)
})

const PORT = 4000

server.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))

