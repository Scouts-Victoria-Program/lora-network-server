import { prisma } from "./services/database";
import { MqttManager } from "./services/mqtt/manager";
import { WebhookManager } from "./services/webhook";
import { LoRaMessage } from "./types/proxy";

export async function startLoRaProxy() {
  const webhookManager = new WebhookManager();

  const mqttManager = new MqttManager(MqttManager.SelectProvider());

  mqttManager.onEvent(async (topic, event) => {
    await insertEvent(topic, event);
    await webhookManager.send(event);
  });

  return mqttManager;
}

async function insertEvent(topic: string, event: LoRaMessage) {
  await prisma.event.create({
    data: {
      datetime: new Date(),
      blob: JSON.stringify(event),
      topic: topic,
    },
  });
}
