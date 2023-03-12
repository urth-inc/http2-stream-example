// https://stackoverflow.com/a/67845680

import http2 from "http2";
import readline from "readline";

// Ignore certificate error
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const buffer: Array<String> = [];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

// Creating and initializing client
const client = http2.connect("https://localhost:8000");
console.log("Client connected");

const req = client.request({
  ":method": "POST",
  ":path": "/",
  "Content-Type": "text/plain",
});

rl.on("line", (input) => {
  req.write(input);
});

req.on("response", (responseHeaders, flags) => {
  console.log("status : " + responseHeaders[":status"]);
});

req.on("data", (data) => {
  console.log("Received: %s ", data.toString());
});

req.on("end", () => {
  client.close(() => {
    console.log("client closed");
  });
});

req.on("error", (error) => {
  console.log(error);
});
