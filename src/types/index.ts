import { IncomingMessage, ServerResponse } from "http";

export type Blog = {
  id: string;
  title: string;
  text: string;
  created_at: number;
  updated_at: number | null;
};
export interface Message {
  message: string;
  status_code: number;
  error: string;
}
export interface BlogMessage extends Message {
  blogs?: Blog[];
  blog?: Blog;
}

export type BlogPostData = {
  title: string;
  text: string;
};

export type HTTP_METHODS = {
  [key: string]: string;
};
export type Controller = {
  route: (req: IncomingMessage, res: ServerResponse) => void;
};
