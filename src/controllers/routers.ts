import { IncomingMessage, ServerResponse, STATUS_CODES } from "http";

import { Blog } from "../types/index";
import db from "../db/index";
import { METHOD, sendResponse, sendError } from "./utils";
import {
  handleRequestBody,
  createBlog,
  updateBlog,
  getBlogID,
} from "../db/utils";

abstract class BasicRouter {
  abstract divert(req: IncomingMessage, res: ServerResponse): void;
}

export class BlogRouter extends BasicRouter {
  req: IncomingMessage;
  res: ServerResponse;

  constructor(req: IncomingMessage, res: ServerResponse) {
    super();
    this.req = req;
    this.res = res;
  }

  divert() {
    if (this.req.method === METHOD.GET) {
      this.fetchBlogs();
    } else if (this.req.method === METHOD.POST) {
      this.createBlog();
    } else if (this.req.method === METHOD.PATCH) {
      this.updateBlog();
    } else if (this.req.method === METHOD.DELETE) {
      this.deleteBlog();
    } else {
      sendError(this.res, 405, {
        message: STATUS_CODES[405],
        error: "true",
        status_code: 405,
      });
    }
  }

  fetchBlogs() {
    sendResponse(this.res, 200, {
      blogs: db.list(),
      error: "false",
      status_code: 200,
      message: STATUS_CODES[200],
    });
  }

  async createBlog() {
    const postData = await handleRequestBody(this.req);
    const postBlog = createBlog(postData);
    db.add(postBlog);
    sendResponse(this.res, 201, {
      blog: postBlog,
      error: "false",
      status_code: 201,
      message: STATUS_CODES[201],
    });
  }

  async updateBlog() {
    const patchData = (await handleRequestBody(this.req)) as Blog;
    const blog_id = getBlogID(this.req);
    const patchBlog = db
      .list()
      .filter((blog) => blog.id.toString() === blog_id);
    const updatedBlog = updateBlog(patchData, patchBlog);

    db.update(updatedBlog);

    sendResponse(this.res, 200, {
      blog: updatedBlog,
      error: "false",
      status_code: 200,
      message: STATUS_CODES[200],
    });
  }

  deleteBlog() {
    const blog_id = getBlogID(this.req);
    db.remove(blog_id);

    sendResponse(this.res, 200, {
      error: "false",
      status_code: 200,
      message: STATUS_CODES[200],
    });
  }
}
