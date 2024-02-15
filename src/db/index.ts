import { Blog, DB } from "../types/index";

let blogs: Blog[] = [];

const db: DB = {
  list: () => blogs,
  add: (blog: Blog) => {
    blogs.push(blog);
  },
  update: (updatedBlog: Blog) => {
    db.remove(updatedBlog.id);
    blogs.push(updatedBlog);
  },
  remove: (blog_id: string) => {
    blogs = blogs.filter((blog) => blog.id !== blog_id);
  },
};

export default db;
