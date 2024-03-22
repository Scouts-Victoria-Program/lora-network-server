import { LoRaMessage, MqttProvider } from "../types/mqtt.proxy";
import { MqttTTNMessage, MqttTTNMessageUp } from "../types/mqtt.ttn";

interface MqttTTNProviderOptions {
  username: string;
  brokerUrl: string;
}

export class MqttTTNProvider implements MqttProvider {
  options: MqttTTNProviderOptions;

  constructor(options: MqttTTNProviderOptions) {
    this.options = options;
  }

  public getBrokerUrl() {
    return this.options.brokerUrl;
  }

  public getTopicWildcard() {
    return `v3/${this.options.username}/devices/#`;
  }

  public getTopicCommand(deviceId: string) {
    return `v3/${this.options.username}/devices/${deviceId}/TODO`;
  }

  public parseMessage(message: string): LoRaMessage {
    const messageData = JSON.parse(
      message.toString()
    ) as unknown as MqttTTNMessage;

    return this.handleMqttMessage(messageData);
  }

  private handleMqttMessage(message: MqttTTNMessage): LoRaMessage {
    if ("join_accept" in message) {
      return {
        datetime: new Date().toString(),
        deviceId: message.end_device_ids.device_id,
        success: true,
      };
    }

    if ("object" in message) {
      return this.parseUpLinkMessage(message);
    }

    return {
      datetime: message.time,
      deviceId: message.deviceInfo.deviceName,
      success: false,
    };
  }

  private parseUpLinkMessage(message: MqttTTNMessageUp): LoRaMessage {
    const uplink = message.uplink_message.decoded_payload;

    if (!uplink.latitude || !uplink.longitude) {
      console.log(
        `GPS trace missing lat or long ${
          message.end_device_ids.device_id
        } ${JSON.stringify(uplink)}`
      );
      throw new Error(
        `GPS trace missing lat or long ${
          message.end_device_ids.device_id
        } ${JSON.stringify(uplink)}`
      );
    }

    return {
      datetime: message.uplink_message.rx_metadata[0].time,
      deviceId: message.end_device_ids.device_id,
      latitude: uplink.latitude,
      longitude: uplink.longitude,
      battery: uplink.BatV,
      alarmStatus: uplink.ALARM_status,
      ledEnabled: uplink.LON,
      movementDetection: uplink.MD,
      firmware: uplink.FW,
    };
  }
}
