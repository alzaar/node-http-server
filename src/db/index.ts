import { Blog } from "../types/index";

let blogs: Blog[] = [];

const db = {
  list: () => blogs,
  add: (blog: Blog): void => {
    blogs.push(blog);
  },
  update: (updatedBlog: Blog): void => {
    db.remove(updatedBlog.id);
    blogs.push(updatedBlog);
  },
  remove: (blog_id: string) => {
    blogs = blogs.filter((blog) => blog.id !== blog_id);
  },
};

export default db;
