interface WebhookManagerOptions {
  target: string;
}

export class WebhookManager {
  options: WebhookManagerOptions;
  constructor(options: WebhookManagerOptions) {
    this.options = options;
  }

  async send(eventData: unknown): Promise<void> {
    try {
      const response = await fetch(this.options.target, {
        method: "post",
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const result = await response.text();
        console.log("Success:", response.headers);
        console.log("Success:", response.status);
        console.log("Success:", response.statusText);
        console.log("Success:", result);
        throw new Error("Network response was not OK");
      }

      const result = await response.json();
      console.log("Success:", response.status);
      console.log("Success:", response.statusText);
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
