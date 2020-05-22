const fs = require("fs");
const path = require("path");

module.exports = function (server) {
  server.get("/api/1/statistics/renderer", (req, res) => {
    const parentDir = path.resolve(path.resolve(__dirname, ".."), "..");
    const premium = path.join(parentDir, "premium-components");
    const dist = path.join(premium, "dist");
    const contents = fs.readdirSync(dist);
    let latest = 0;
    let latestFile = "";
    for (let i = 0; i < contents.length; i++) {
      const file = path.join(dist, contents[i]);
      const stats = fs.statSync(file);
      const fileTime = stats.mtime.getUTCSeconds();
      if (fileTime > latest) {
        latest = fileTime;
        latestFile = file;
      }
    }

    let result = "";
    if (latestFile) {
      result = fs.readFileSync(latestFile, "utf8");
    }
    console.log(latestFile);

    res.jsonp({
      result,
      message: "",
    });
  });
};
