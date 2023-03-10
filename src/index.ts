// https://stackoverflow.com/a/67845680

import http2 from "http2";
import fs from "fs";

// Private key and public certificate for access
const options = {
  key: fs.readFileSync("./keys/privkey.pem"),
  cert: fs.readFileSync("./keys/cert.pem"),
};

// Creating and initializing server
const server = http2.createSecureServer(options);

server.on("error", (error) => {
  console.log("Error: " + error);
});

server.on("stream", (stream, requestHeaders) => {
  stream.respond({
    ":status": 200,
    "content-type": "text/plain",
  });

  stream.on("data", (data) => {
    const message = data.toString();
    console.log("Received: " + message);
    const responseMessage = `[server] ${message}`;
    stream.write(responseMessage); // echo received data back
  });

  stream.on("close", () => {
    console.log("stream closed");
  });

  stream.on("end", () => {
    console.log("stream end");
  });
});

server.listen(8000);
