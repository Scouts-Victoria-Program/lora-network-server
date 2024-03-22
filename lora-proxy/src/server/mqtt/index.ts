import { MqttClient, connect } from "mqtt";
import { LoRaMessage, MqttProvider } from "../types/mqtt.proxy";

export class MqttManager {
  client: MqttClient;
  provider: MqttProvider;

  constructor(provider: MqttProvider) {
    this.provider = provider;

    // create a client
    this.client = connect(this.provider.getBrokerUrl());

    // Connect to the MQTT server provided by a LoRa Network Server.
    this.client.on("connect", () => this.handleMqttConnect());

    // Output errors to stdout.
    this.client.on("error", (e) => console.error(e));

    // Handle messages from subscribed topics.
    this.client.on("message", (topic: string, message: Buffer) =>
      this.handleMqttMessage(topic, message)
    );
  }

  private async handleMqttConnect() {
    // Subscribe to the device topics.
    this.client.subscribe(this.provider.getTopicWildcard(), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Connected to MQTT`);
        console.log(
          `Subscribed to topics: ${this.provider.getTopicWildcard()}`
        );
      }
    });
  }

  private async handleMqttMessage(topic: string, message: Buffer) {
    console.log(`MQTT message received:`, topic, message.toString());

    const data = this.provider.parseMessage(message.toString());

    this.emitEvent(data);
  }

  private emitEvent(uplinkMessage: LoRaMessage) {
    for (const fn of this.onEventFns) {
      fn(uplinkMessage);
    }
  }

  onEventFns: ((uplinkMessage: LoRaMessage) => void)[] = [];

  onEvent(fn: (uplinkMessage: LoRaMessage) => void) {
    this.onEventFns.push(fn);
  }

  sendDownlink(requestBody: { deviceId: string; data: string }) {
    const buff = Buffer.from(requestBody.data);
    const base64data = buff.toString("base64");

    this.client.publish(
      this.provider.getTopicCommand(requestBody.deviceId),
      base64data
    );
  }
}
