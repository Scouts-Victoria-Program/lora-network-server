import { MqttManager } from "./mqtt";
import { MqttChirpStackProvider } from "./mqtt/chirpstack";
import { WebhookManager } from "./webhook";

export async function startLoRaProxy() {
  const webhookManager = new WebhookManager({
    target: "http://game/",
  });

  const mqttManager = new MqttManager(
    new MqttChirpStackProvider({
      applicationId: "d5acf6a8-2d95-4550-91da-bf2d1ff466a3",
      brokerUrl: `mqtt://mosquitto`,
    })
  );

  mqttManager.onEvent(async (event) => {
    // await insertEvent(event);
    await webhookManager.send(event);
  });

  return mqttManager;
}
