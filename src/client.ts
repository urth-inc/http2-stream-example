// https://stackoverflow.com/a/67845680

import http2 from "http2";

// Ignore certificate error
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

let x = 0;

// Creating and initializing client
const client = http2.connect("https://localhost:8000");
console.log("Client connected");

const msg1 = "message 1";

const req = client.request({
  ":method": "POST",
  ":path": "/",
  "Content-Type": "text/plain",
});

req.on("response", (responseHeaders, flags) => {
  console.log("status : " + responseHeaders[":status"]);
});

req.write(msg1);

req.on("data", (data) => {
  console.log("Received: %s ", data.toString());

  req.write(`[client] ${x.toString()}`);
  x = x + 1;
  if (x > 10) {
    req.close();
  }
});

req.on("end", () => {
  client.close(() => {
    console.log("client closed");
  });
});

req.on("error", (error) => {
  console.log(error);
});
