import express from "express";
import { serverConfig } from "./config";
import v1Router from "./routers/v1/index.router";
import v2Router from "./routers/v2/index.router";
import {
  appErrorHandler,
  genericErrorHandler,
} from "./middlewares/error.middleware";
import logger from "./config/logger.config";
import { attachCorrelationIdMiddleware } from "./middlewares/correlation.middleware";
import { addEmailToQueue } from "./producers/email.producer";
// import { redisClient } from "./config/redis.config";
const app = express();

app.use(express.json());

/**
 * Registering all the routers and their corresponding routes with out app server object.
 */

app.use(attachCorrelationIdMiddleware);
app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);

/**
 * Add the error handler middleware
 */

app.use(appErrorHandler);
app.use(genericErrorHandler);

app.listen(serverConfig.PORT, async () => {
  logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
  logger.info(`Press Ctrl+C to stop the server.`);

  // redisClient.set("name", "Anuj");

  // const res = await redisClient.get("name");
  // console.log(res);

  for (let i = 0; i < 10; i++) {
    addEmailToQueue({
      to: "ag141020@gmail.com",
      subject: `Welcome message ${i}`,
      templateId: "welcome",
      params: {
        name: "Gupta Jii",
        appname: "Booking App",
      },
    });
  }
});
