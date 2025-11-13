import { LoRaMessage } from "./proxy";

export interface MqttProvider {
  name: string;
  getTopicWildcard: () => string;
  getTopicCommand: (deviceId: string) => string;
  getBrokerUrl: () => string;
  parseMessage: (message: string) => LoRaMessage;
}
