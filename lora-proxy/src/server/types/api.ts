export interface GetEvents {
  events: Event[];
  nextFromId: number;
}

export interface Event {
  id: number;
  datetime: string;
  blob: string;
  topic: string;
}

export interface GetWebhookCalls {
  webhooks: WebhookCall[];
  nextFromId: number;
}

export interface PostWebhookCallRetry {
  webhook: WebhookCall;
  success: boolean;
}

export interface WebhookCall {
  id: number;
  datetime: string;
  request: string;
  response: string;
  statusCode: number;
  statusText: string;
}

export interface GetConfig {
  success: boolean;
  config: {
    webhookUrl: string;
    mqttOrigin: string;
  }
}

export interface PostConfigWebhookInput {
  webhookUrl: string;
}
export interface PostConfigWebhook {
  success: boolean;
}
