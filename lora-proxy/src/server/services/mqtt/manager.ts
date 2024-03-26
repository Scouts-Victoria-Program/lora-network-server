import { MqttClient, connect } from "mqtt";
import { MqttProvider } from "../../types/mqtt";
import { LoRaMessage } from "../../types/proxy";
import { MqttChirpStackProvider } from "./chirpstack";
import { MqttTTNProvider } from "./ttn";

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

  public static SelectProvider(): MqttProvider {
    const providers = {
      chirpstack: MqttChirpStackProvider,
      ttn: MqttTTNProvider,
    };

    const brokerType = process.env.MQTT_BROKER_TYPE;
    if (!brokerType) {
      throw new Error(`Missing value for MQTT_BROKER_TYPE`);
    }

    if (!Object.keys(providers).includes(brokerType)) {
      throw new Error(
        `MQTT_BROKER_TYPE is not a valid value. Allowed values [${Object.keys(
          providers
        )}], used ${brokerType}`
      );
    }

    const brokerUrl = process.env.MQTT_BROKER_HOST;
    if (!brokerUrl) {
      throw new Error(`Missing value for MQTT_BROKER_HOST`);
    }

    const appId = process.env.MQTT_APP_ID;
    if (!appId) {
      throw new Error(`Missing value for MQTT_APP_ID`);
    }

    if (brokerType === "ttn") {
      return new MqttTTNProvider({
        brokerUrl,
        username: appId,
      });
    } else if (brokerType === "chirpstack") {
      return new MqttChirpStackProvider({
        brokerUrl: `mqtt://${brokerUrl}`,
        applicationId: appId,
      });
    } else {
      throw new Error(`Failed to select MQTT provider`);
    }
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

    this.emitEvent(topic, data);
  }

  private emitEvent(topic: string, uplinkMessage: LoRaMessage) {
    for (const fn of this.onEventFns) {
      fn(topic, uplinkMessage);
    }
  }

  onEventFns: ((topic: string, uplinkMessage: LoRaMessage) => void)[] = [];

  onEvent(fn: (topic: string, uplinkMessage: LoRaMessage) => void) {
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
