const corsAnywhere = require("cors-anywhere");

const corsServer = corsAnywhere.createServer({
  originWhitelist: process.env.CORSANYWHERE_WHITELIST
    ? process.env.CORSANYWHERE_WHITELIST.split(",")
    : [],
  requireHeader: ["origin", "x-requested-with"],
  removeHeaders: ["cookie", "cookie2"],
});

exports.handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    corsServer.emit("request", event, context);
    resolve({
      statusCode: 200,
      body: "CORS Anywhere proxy is running.",
    });
  });
};
