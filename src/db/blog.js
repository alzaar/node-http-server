const db = {};

let blogs = [];

db.list = () => blogs;

db.add = (blog) => blogs.push(blog);

db.update = (updatedBlog) => {
  db.remove(updatedBlog.id);
  blogs.push(updatedBlog);
};

db.remove = (blog_id) => {
  blogs = blogs.filter((blog) => blog.id.toString() !== blog_id);
};

module.exports = db;
