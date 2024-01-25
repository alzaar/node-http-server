const url = require("url");
let instance;
let counter = 1;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const COUNTER = Object.freeze(new Counter());

const handleRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => resolve(JSON.parse(body)));

    req.on("error", (error) => reject(error));
  });
};

const createBlog = (data) => {
  const blog = {
    id: COUNTER.getCount(),
    created_at: Date.now(),
    updated_at: null,
    ...data,
  };

  COUNTER.increment();

  return blog;
};

const updateBlog = (updatedBlogData, originalBlog) => {
  return {
    ...originalBlog[0],
    ...updatedBlogData,
  };
};

const getBlogID = (req) => {
  const parsedUrl = url.parse(req.url);
  const pathSegments = parsedUrl.pathname.split("/");
  const blogID = pathSegments[2];
  if (!blogID) throw new Error("Blog ID is required!");
  return blogID;
};

module.exports = {
  handleRequestBody,
  createBlog,
  updateBlog,
  getBlogID,
};
