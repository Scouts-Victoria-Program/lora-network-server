import { Prisma, WebhookCall } from "@prisma/client";
import { prisma } from "./database";

interface WebhookManagerOptions {
  target: string;
}

export class WebhookManager {
  options: WebhookManagerOptions;
  constructor() {
    const webhookTarget = process.env.WEBHOOK_TARGET;
    if (!webhookTarget) {
      throw new Error(`Missing value for WEBHOOK_TARGET`);
    }

    this.options = {
      target: webhookTarget,
    };
  }

  async send(eventData: unknown): Promise<WebhookCall> {
    try {
      const response = await fetch(this.options.target, {
        method: "post",
        body: JSON.stringify(eventData),
      });

      const result = await response.text();

      return await this.record({
        req: JSON.stringify(eventData),
        res: result,
        status: response.status,
        statusText: response.statusText,
      });
    } catch (e) {
      const error = e as Error & { cause?: string };
      console.error("Error:", error);

      return await this.record({
        req: JSON.stringify(eventData),
        res: error.toString() + error.cause,
        status: 500,
        statusText: error.toString(),
      });
    }
  }

  async resend(webhookId: number): Promise<WebhookCall> {
    const webhook = await prisma.webhookCall.findUniqueOrThrow({
      where: {
        id: webhookId,
      },
    });

    const originalReqData = JSON.parse(webhook.request as string);

    if (!("type" in originalReqData)) {
      originalReqData.type = "up";
    }

    return await this.send(originalReqData);
  }

  private async record(data: {
    req: string;
    res: string;
    status: number;
    statusText: string;
  }): Promise<WebhookCall> {
    console.log("webhook call: request:", data.req);
    console.log("webhook call: response:", data.res);
    console.log("webhook call: status:", data.status);
    console.log("webhook call: statusText:", data.statusText);

    return await prisma.webhookCall.create({
      data: {
        datetime: new Date(),
        request: data.req,
        response: data.res,
        statusCode: data.status,
        statusText: data.statusText,
      },
    });
  }
}
