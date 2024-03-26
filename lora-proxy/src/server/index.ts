import ViteExpress from "vite-express";
import { createApiApp } from "./services/api";
import { startLoRaProxy } from "./lora-proxy";

const mqttManager = await startLoRaProxy();
const app = createApiApp(mqttManager);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
