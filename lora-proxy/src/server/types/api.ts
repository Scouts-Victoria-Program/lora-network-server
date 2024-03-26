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

export interface WebhookCall {
  id: number;
  datetime: string;
  request: string;
  response: string;
  statusCode: number;
  statusText: string;
}
