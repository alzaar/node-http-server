const url = require("url");
const { STATUS_CODES } = require("http");

const { sendResponse, sendError } = require("./utils");
const db = require("../db/blog.js");
const {
  handleRequestBody,
  createBlog,
  updateBlog,
  getBlogID,
} = require("../db/utils.js");

const METHODS = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

const controller = {};

controller.route = (req, res) => {
  if (req.url === "/greeting") {
    controller.handleGreeting(req, res);
  } else if (req.url.includes("/blogs")) {
    controller.handleBlogs(req, res);
  } else {
    sendResponse(res, 404, {
      message: STATUS_CODES[404],
      status_code: 404,
      error: true,
    });
  }
};

controller.handleGreeting = (req, res) => {
  switch (req.method) {
    case METHODS.GET:
      sendResponse(res, 200, "Hello");
      break;
    default:
      sendError(res, 405, {
        message: STATUS_CODES[405],
        error: true,
        status_code: 405,
      });
  }
};

controller.handleBlogs = async (req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathSegments = parsedUrl.pathname.split("/");
  if (req.method === METHODS.GET && req.url === "/blogs") {
    sendResponse(res, 200, {
      blogs: db.list(),
      error: false,
      status_code: 200,
      message: STATUS_CODES[200],
    });
  } else if (req.method === METHODS.POST && req.url == "/blogs") {
    const postData = await handleRequestBody(req);
    const postBlog = createBlog(postData);
    db.add(postBlog);
    sendResponse(res, 201, {
      blog: postBlog,
      error: false,
      status_code: 201,
      message: STATUS_CODES[201],
    });
  } else if (
    req.method === METHODS.PATCH &&
    pathSegments[1] === "blogs" &&
    !isNaN(parseInt(pathSegments[2], 10))
  ) {
    const patchData = await handleRequestBody(req);
    const blog_id = getBlogID(req);
    const patchBlog = db
      .list()
      .filter((blog) => blog.id.toString() === blog_id);
    const updatedBlog = updateBlog(patchData, patchBlog);

    db.update(updatedBlog);
    sendResponse(res, 200, {
      blog: updatedBlog,
      error: false,
      status_code: 200,
      message: STATUS_CODES[200],
    });
  } else if (
    req.method === METHODS.DELETE &&
    pathSegments[1] === "blogs" &&
    !isNaN(parseInt(pathSegments[2], 10))
  ) {
    const blog_id = getBlogID(req);
    db.remove(blog_id);
    sendResponse(res, 200, {
      error: false,
      status_code: 200,
      message: STATUS_CODES[200],
    });
  } else {
    sendError(res, 405, {
      message: STATUS_CODES[405],
      error: true,
      status_code: 405,
    });
  }
};

module.exports = controller;
