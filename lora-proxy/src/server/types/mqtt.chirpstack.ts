export interface MqttChirpStackMessageJoin {
  deduplicationId: string;
  time: string;
  deviceInfo: {
    tenantId: string;
    tenantName: string;
    applicationId: string;
    applicationName: string;
    deviceProfileId: string;
    deviceProfileName: string;
    deviceName: string;
    devEui: string;
    deviceClassEnabled: string;
    tags: string[];
  };
  TODO: string;
}

export interface MqttChirpStackMessageUp {
  deduplicationId: string;
  time: string;
  deviceInfo: {
    tenantId: string;
    tenantName: string;
    applicationId: string;
    applicationName: string;
    deviceProfileId: string;
    deviceProfileName: string;
    deviceName: string;
    devEui: string;
    deviceClassEnabled: string;
    tags: string[];
  };
  devAddr: string;
  adr: boolean;
  dr: number;
  fCnt: number;
  fPort: number;
  confirmed: boolean;
  data: string;
  object: {
    latitude?: number;
    longitude?: number;
    BatV: number;
    ALARM_status: boolean;
    MD: "Disable" | "Move" | "Collide" | "User";
    LON: boolean;
    FW: number;
  };
  rxInfo: {
    gatewayId: string;
    uplinkId: number;
    nsTime: Date;
    rssi: number;
    snr: number;
    location: {
      latitude: number;
      longitude: number;
    };
    context: string;
    metadata: {
      region_config_id: string;
      region_common_name: string;
    };
    crcStatus: string;
  }[];
  txInfo: {
    frequency: number;
    modulation: {
      lora: {
        bandwidth: number;
        spreadingFactor: number;
        codeRate: string;
      };
    };
  };
}

export type MqttChirpStackMessage =
  | MqttChirpStackMessageJoin
  | MqttChirpStackMessageUp;
