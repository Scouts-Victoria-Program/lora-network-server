import ViteExpress from "vite-express";
import { createApiApp } from "./services/api";
import { startLoRaProxy } from "./lora-proxy";

const { mqttManager, webhookManager } = await startLoRaProxy();
const app = createApiApp(mqttManager, webhookManager);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
