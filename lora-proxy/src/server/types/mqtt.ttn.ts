export interface MqttTTNMessageJoin {
  end_device_ids: {
    device_id: string;
    application_ids: {
      application_id: string;
    };
    dev_eui: string;
    join_eui: string;
    dev_addr: string;
  };
  correlation_ids: string[];
  join_accept: {
    session_key_id: string;
  };
}

export interface MqttTTNMessageUp {
  end_device_ids: {
    device_id: string;
    application_ids: {
      application_id: string;
    };
    dev_eui: string;
    join_eui: string;
    dev_addr: string;
  };
  correlation_ids: string[];
  uplink_message: {
    session_key_id: string;
    f_port: number;
    frm_payload: string;
    decoded_payload: {
      ALARM_status: boolean;
      BatV: number;
      FW: number;
      LON: boolean;
      MD: "Disable" | "Move" | "Collide" | "User";
      latitude: number;
      longitude: number;
    };
    rx_metadata: {
      gateway_ids: {
        gateway_id: string;
        eui: string;
      };
      time: string;
      timestamp: number;
      rssi: number;
      snr: number;
      uplink_token: string;
    }[];
    settings: {
      data_rate: {
        lora: {
          bandwidth: number;
          spreading_factor: number;
        };
      };
      coding_rate: string;
      frequency: string;
      gateway_channel_index: number;
      device_channel_index: number;
    };
  };
}

export type MqttTTNMessage = MqttTTNMessageJoin | MqttTTNMessageUp;
