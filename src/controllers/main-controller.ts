import { IncomingMessage, STATUS_CODES, ServerResponse } from "http";

import { Controller } from "../types/index";
import { sendError, getRouter } from "./utils";

const controller: Controller = {
  route: (req: IncomingMessage, res: ServerResponse) => {
    const router = getRouter(req, res);

    if (!router) {
      sendError(res, 404, {
        message: STATUS_CODES[404],
        status_code: 404,
        error: "true",
      });
    }

    router.divert();
  },
};

export default controller;
