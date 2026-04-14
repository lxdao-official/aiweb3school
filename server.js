const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || 3000);
const rootDir = path.join(__dirname, "dist");

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".map", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

function sendFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = contentTypes.get(ext) || "application/octet-stream";

  const stream = fs.createReadStream(filePath);
  stream.on("error", () => {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error");
  });

  res.writeHead(200, { "Content-Type": contentType });
  stream.pipe(res);
}

function resolvePath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split("?")[0]);
  const normalizedPath = path.posix.normalize(decodedPath);
  const safePath = normalizedPath.replace(/^\/+/, "").replace(/^(\.\.(\/|\\|$))+/, "");
  const requestedPath = safePath === "" ? "index.html" : safePath;
  const absolutePath = path.join(rootDir, requestedPath);

  if (!absolutePath.startsWith(rootDir)) {
    return null;
  }

  return absolutePath;
}

const server = http.createServer((req, res) => {
  if (!req.url) {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Bad Request");
    return;
  }

  const filePath = resolvePath(req.url);
  if (!filePath) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (error, stats) => {
    if (!error && stats.isFile()) {
      sendFile(filePath, res);
      return;
    }

    const fallbackPath = path.join(rootDir, "index.html");
    fs.stat(fallbackPath, (fallbackError, fallbackStats) => {
      if (!fallbackError && fallbackStats.isFile()) {
        sendFile(fallbackPath, res);
        return;
      }

      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
    });
  });
});

server.listen(port, host, () => {
  console.log(`Static site server listening on http://${host}:${port}`);
});
