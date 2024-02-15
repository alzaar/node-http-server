import { IncomingMessage } from "http";
import * as url from "url";
import { BlogPostData, Blog } from "../types/index";

let counter = 1;

class Counter {
  private static instance: Counter;

  constructor() {
    if (Counter.instance) {
      throw new Error("You can only create one instance!");
    }
    Counter.instance = this;
  }

  getInstance(): Counter {
    return this;
  }

  getCount() {
    return counter.toString();
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const COUNTER = Object.freeze(new Counter());

export const handleRequestBody = (req: IncomingMessage): unknown => {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => resolve(JSON.parse(body)));

    req.on("error", (error) => reject(error));
  });
};

export const createBlog = (data: any): Blog => {
  const blog: Blog = {
    id: COUNTER.getCount(),
    created_at: Date.now(),
    updated_at: null,
    ...data,
  };

  COUNTER.increment();

  return blog;
};

export const updateBlog = (
  updatedBlogData: Blog,
  originalBlog: Blog[]
): Blog => {
  return {
    ...originalBlog[0],
    ...updatedBlogData,
  };
};

export const getBlogID = (req: IncomingMessage) => {
  const parsedUrl = url.parse(req.req.url);
  const pathSegments = parsedUrl.pathname.split("/");
  const blogID = pathSegments[2];
  if (!blogID) throw new Error("Blog ID is required!");
  return blogID;
};
