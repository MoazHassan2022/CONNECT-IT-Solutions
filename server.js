const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const dbConnect = require("./db-connection/connection");
dotenv.config({ path: "./config.env" });

dbConnect();

const app = require("./app");

// START SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`App is running on port ${port}...`)
);

process.on("unhandledRejection", (err) => {
  console.log(`${err.name}. ${err.message}`);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.log(`${err.name}. ${err.message}`);
  server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED, Shutting down...");
  server.close(() => console.log("Process terminated!"));
});
