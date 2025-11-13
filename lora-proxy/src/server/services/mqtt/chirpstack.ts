import { MqttProvider } from "../../types/mqtt";
import {
  MqttChirpStackMessage,
  MqttChirpStackMessageUp,
} from "../../types/mqtt.chirpstack";
import { LoRaMessage } from "../../types/proxy";

interface MqttChirpStackProviderOptions {
  applicationId: string;
  brokerUrl: string;
}

export class MqttChirpStackProvider implements MqttProvider {
  name = 'ChirpStack';
  options: MqttChirpStackProviderOptions;

  constructor(options: MqttChirpStackProviderOptions) {
    this.options = options;
  }

  public getBrokerUrl() {
    return this.options.brokerUrl;
  }

  public getTopicWildcard() {
    return `application/${this.options.applicationId}/device/+/event/up`;
  }

  public getTopicCommand(deviceId: string) {
    return `application/${this.options.applicationId}/device/${deviceId}/command/down`;
  }

  public parseMessage(message: string): LoRaMessage {
    const messageData = JSON.parse(
      message.toString()
    ) as unknown as MqttChirpStackMessage;

    return this.handleMqttMessage(messageData);
  }

  private handleMqttMessage(message: MqttChirpStackMessage): LoRaMessage {
    if ("TODO" in message) {
      return {
        datetime: message.time,
        deviceId: message.deviceInfo.deviceName,
        type: "join",
        success: true,
      };
    }

    if ("object" in message) {
      return this.parseUpLinkMessage(message);
    }

    return {
      datetime: message.time,
      deviceId: message.deviceInfo.deviceName,
      type: "join",
      success: false,
    };
  }

  private parseUpLinkMessage(message: MqttChirpStackMessageUp): LoRaMessage {
    const uplink = message.object;

    if (!uplink.latitude || !uplink.longitude) {
      console.log(
        `GPS trace missing lat or long ${
          message.deviceInfo.deviceName
        } ${JSON.stringify(uplink)}`
      );
      // throw new Error(
      //   `GPS trace missing lat or long ${
      //     message.deviceInfo.deviceName
      //   } ${JSON.stringify(uplink)}`
      // );
    }

    return {
      type: "up",
      datetime: message.time,
      deviceId: message.deviceInfo.deviceName,
      latitude: uplink.latitude ?? 0,
      longitude: uplink.longitude ?? 0,
      battery: uplink.BatV,
      alarmStatus: uplink.ALARM_status,
      ledEnabled: uplink.LON,
      movementDetection: uplink.MD,
      firmware: uplink.FW,
    };
  }
}
