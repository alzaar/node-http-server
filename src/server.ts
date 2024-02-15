import * as http from "http";
import controller from "./controllers/main-controller";

const server: http.Server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    controller.route(req, res);
  }
);

const PORT = 4000;

server.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
