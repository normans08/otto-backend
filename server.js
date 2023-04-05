import express from "express";
import mongoose from "mongoose";
import router from "./src/routes/index.js";
const app = express();

// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

app.use(express.json());
app.use("/api", router);
app.listen(8800, () => {
  console.log("Backend server is running!");
});
