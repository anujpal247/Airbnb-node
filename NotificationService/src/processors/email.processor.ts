import { Job, Worker } from "bullmq";

import { getRedisConnObj } from "../config/redis.config";
import { NotificationDto } from "../dto/notification.dto";
import { MAILER_QUEUE } from "../queues/email.queue";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import { renderMailTemplate } from "../templates/handler";
import { sendEmail } from "../services/mailer.service";
import logger from "../config/logger.config";

export const setupMailerWorker = () => {
  const mailWorker = new Worker<NotificationDto>(
    MAILER_QUEUE, // name of queue
    async (job: Job) => {
      // subscribers(worker)(processor)
      if (job.name !== MAILER_PAYLOAD) {
        throw new Error("Invalid Job name");
      }

      const payload = job.data;
      console.log(`processing email for ${JSON.stringify(payload)}`);

      const emailContent = await renderMailTemplate(
        payload.templateId,
        payload.params
      );

      await sendEmail(payload.to, payload.subject, emailContent);

      logger.info(
        `Email sent to ${payload.to} with subject ${payload.subject}`
      );
    },
    {
      connection: getRedisConnObj(),
    }
  );

  mailWorker.on("failed", () => {
    console.log("Email processing failed!!");
  });

  mailWorker.on("completed", () => {
    console.log("Email processing completed successfully!");
  });
};
