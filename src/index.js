import https from "https";
import http from "http";
import fs from "fs";
import app from "./app";

// const options = {
//   key: fs.readFileSync("./localhost-key.pem"), // Replace with the path to your key
//   cert: fs.readFileSync("./localhost.pem"), // Replace with the path to your certificate
// };

// app.use((req, res) => {
//   res.send("<h1>Consumer Connect API Works!</h1>");
// });

const port = 3000;

// Use this when you dont have local certificate
http.createServer(app).listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

// Use this when you have a local certificate for https
// https.createServer(options, app).listen(port, () => {
//   console.log(`Server listening on https://localhost:${port}`);
// });
