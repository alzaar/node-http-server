
const sendResponse = (res, statusCode, message) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" })
  res.end(handleMessage(message))
}

const sendError = (res, statusCode, message) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" })
  res.end(handleMessage(message))
}

const handleMessage = (message) => {
  return JSON.stringify(message)
}

module.exports = {
  handleMessage,
  sendResponse,
  sendError
}
