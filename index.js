import express from "express";
import controllers from "./src/controllers/index.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(controllers);

const server = app.listen(PORT, () => {
  console.debug("Listen on port " + PORT);
});

export default server;
