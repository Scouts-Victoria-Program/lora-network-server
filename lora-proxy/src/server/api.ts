import express from "express";
import { MqttManager } from "./mqtt";

export function createApiApp(mqttManager: MqttManager) {
  const app = express();

  app.get("/api/events", (_, res) => {
    res.json({ hello: "world", date: new Date() });
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
