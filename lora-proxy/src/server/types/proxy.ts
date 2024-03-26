export type LoRaMessage = {
  deviceId: string;
  datetime: string;
  topic: string;
} & (LoRaMessageJoin | LoRaMessageUp);

interface LoRaMessageJoin {
  success: boolean;
}

interface LoRaMessageUp {
  latitude: number;
  longitude: number;
  battery: number;
  alarmStatus: boolean;
  ledEnabled: boolean;
  movementDetection: "Disable" | "Move" | "Collide" | "User";
  firmware: number;
}

const commandList = {
  transmissionInterval: {
    at: "TDC",
    prefix: 0x01,
    unit: "seconds",
  },
  alarmInterval: {
    at: "ACE",
    prefix: 0xb1,
    unit: "seconds",
  },
  exitAlarm: {
    at: "-",
    prefix: 0x01,
    unit: "boolean",
  },
  keepAliveInterval: {
    at: "KAT",
    prefix: 0xa9,
    unit: "seconds",
  },
  movementDetectMode: {
    at: "MD",
    prefix: 0xa5,
    unit: "enum",
    values: ["Disable", "Move", "Collide", "Customized"],
  },
  gpsFixTimeMax: {
    at: "FTIME",
    prefix: 0xaa,
    unit: "seconds",
  },
  gpsNavigationMode: {
    at: "NMEA886",
    prefix: 0xab,
    unit: "enum",
    values: [
      "Default",
      "Normal",
      "Fitness",
      "Aviation",
      "Balloon",
      "Stationary",
    ],
  },
};

type Downlink = Record<keyof typeof commandList, string | number>;

const DownlinkCommands: Downlink = {
  transmissionInterval: "",
  alarmInterval: "",
  exitAlarm: "",
  keepAliveInterval: "",
  movementDetectMode: "",
  gpsFixTimeMax: "",
  gpsNavigationMode: "",
};
