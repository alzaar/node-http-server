import { IncomingMessage, ServerResponse, METHODS } from "http";
import { BlogMessage, Message, HTTP_METHODS } from "../types/index";
import { BlogRouter } from "./routers";

export const sendResponse = (
  res: ServerResponse,
  statusCode: number,
  message: BlogMessage
) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(handleMessage(message));
};

export const sendError = (
  res: ServerResponse,
  statusCode: number,
  message: Message
) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(handleMessage(message));
};

export const handleMessage = (message: BlogMessage) => {
  return JSON.stringify(message);
};

export const getRouter = (
  req: IncomingMessage,
  res: ServerResponse
): BlogRouter | null => {
  if (req.url.includes("/blogs")) {
    return new BlogRouter(req, res);
  } else {
    return null;
  }
};

export const METHOD: Record<string, string> = METHODS.reduce<HTTP_METHODS>(
  (acc, str) => {
    acc[str] = str;
    return acc;
  },
  {}
);
