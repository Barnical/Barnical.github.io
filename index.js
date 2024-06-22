const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8000;


app.use(express.static(path.join(__dirname)));


let blockedIPs = [];
try {
   const data = fs.readFileSync("users.json", "utf8");
   const json = JSON.parse(data);

   blockedIPs = json.blockedIPs;
} catch {
   console.error("Failed to read users.json");
}

app.use((req, res, next) => {
   const clientIP = req.ip;

   if (blockedIPs.includes(clientIP)) {
      res.status(403)
      res.sendFile(path.join(__dirname, "404.html"));
   } else {
      next();
   }
});

app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "index.html"))
});

app.listen(PORT, () => {
   console.log(`Server running @ :${PORT}`)
});