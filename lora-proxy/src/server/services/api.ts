import express from "express";
import { MqttManager } from "./mqtt/manager";
import { prisma } from "./database";
import { Event, GetEvents, GetWebhookCalls, WebhookCall } from "../types/api";

export function createApiApp(mqttManager: MqttManager) {
  const app = express();

  app.get("/api/events", async (req, res) => {
    const fromId = req.query.from ? Number(req.query.from) : undefined;

    let events = [];
    if (fromId) {
      events = await prisma.event.findMany({
        orderBy: {
          datetime: "asc",
        },
        cursor: {
          id: fromId,
        },
        skip: 1,
        take: 50,
      });
    } else {
      events = await prisma.event.findMany({
        orderBy: {
          datetime: "desc",
        },

        take: 5,
      });

      events = events.reverse();
    }

    const nextFromId =
      events.length > 0 ? events[events.length - 1]?.id ?? fromId : fromId;

    const response: GetEvents = {
      events: events.map(
        (event): Event => ({
          id: event.id,
          datetime: event.datetime.toISOString(),
          blob: event.blob?.toString() ?? "",
          topic: event.topic,
        })
      ),
      nextFromId: nextFromId ?? 0,
    };
    res.json(response);
  });

  app.get("/api/webhooks", async (req, res) => {
    const fromId = req.query.from ? Number(req.query.from) : undefined;

    let webhooks = [];
    if (fromId) {
      webhooks = await prisma.webhookCall.findMany({
        orderBy: {
          datetime: "asc",
        },
        cursor: {
          id: fromId,
        },
        skip: 1,
        take: 50,
      });
    } else {
      webhooks = await prisma.webhookCall.findMany({
        orderBy: {
          datetime: "desc",
        },

        take: 5,
      });

      webhooks = webhooks.reverse();
    }

    const nextFromId =
      webhooks.length > 0
        ? webhooks[webhooks.length - 1]?.id ?? fromId
        : fromId;

    const response: GetWebhookCalls = {
      webhooks: webhooks.map(
        (webhook): WebhookCall => ({
          id: webhook.id,
          datetime: webhook.datetime.toISOString(),
          request: webhook.request?.toString() ?? "",
          response: webhook.response?.toString() ?? "",
          statusCode: webhook.statusCode,
          statusText: webhook.statusText,
        })
      ),
      nextFromId: nextFromId ?? 0,
    };
    res.json(response);
  });

  app.post("/api/device", (req, res) => {
    const data = JSON.parse(req.body);

    mqttManager.sendDownlink({
      deviceId: data.deviceId,
    });

    res.json({ success: true });
  });

  return app;
}
