import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import HabitRoutes from "./api/routes/habits.js";
import BetRoutes from "./api/routes/bets.js";
import UserRoutes from "./api/routes/user.js";

// 每日刷新
import { CronJob } from 'cron';
import { resetDailyStatus } from "./api/utils/resetDailyStatus.js"; // 實現重置簽到狀態的邏輯

import { env } from "./api/utils/env.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"], // 指定包含路由定义的文件路径
};

const swaggerSpec = swaggerJSDoc(options);
// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/habit", HabitRoutes);
app.use("/api/bet", BetRoutes);
app.use("/api/user", UserRoutes);

// Test function for entry point
app.get("/", (req, res) => {
  res.status(200).send("Vercel up and running.")
})


// Connect to MongoDB
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(env.MONGO_URL, mongooseOptions)
  .then(async () => {
    app.listen(env.PORT, () =>
      console.log(`Server running on port http://localhost:${env.PORT}`)
    );
    // If the connection is successful, we will see this message in the console.
    console.log("Connected to MongoDB");
    const resetDaily = new CronJob(
      '0 0 * * *', // resets daily at 0 am
      await resetDailyStatus(), // onTick: run the designated function
      () => console.log(`It's now ${new Date().toString}, status reset completed.`), // onComplete
      true, // start
      'Asia/Taipei'
    )
    resetDaily.start() // just make sure that it runs.
    console.log("Daily reset scheduled.")
  })
  .catch((error) => {
    // Catch any errors that occurred while starting the server
    console.log("Something went wrong.");
    console.log(error.message);
  });
