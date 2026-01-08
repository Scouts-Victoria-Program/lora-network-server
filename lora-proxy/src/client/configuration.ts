import { GetConfig, PostConfigWebhook, PostConfigWebhookInput } from "../server/types/api";
import { $ } from "./util";

export function configHtml() {
  return `
    <div id="config">
      <h2>Configuration</h2>

      <h3>Webhook URL</h3>
      <span class="webhook-url">
        <input type="checkbox" id="webhook-url-edit">
        <span class="display">
          <span>Loading..</span>
          <label for="webhook-url-edit">Edit</label>
        </span>
        <span class="edit">
          <input>
          <button class="submit">Update</button>
          <label for="webhook-url-edit">Cancel</label>
        </span>
      </span>

      <h3>MQTT Origin</h3>
      <span class="mqtt-origin">
        <span></span>
      </span>
    </div>
    <style>
    #config .webhook-url #webhook-url-edit,
    #config .webhook-url #webhook-url-edit:checked ~ .display,
    #config .webhook-url #webhook-url-edit:not(:checked) ~ .edit {
      display: none;
    }

    [for="webhook-url-edit"] {
      text-decoration: underline;
    }
    </style>
  `;
}

export async function loadConfig() {
  const res = await fetch(`api/config`);
  const data = (await res.json()) as GetConfig;

  const webhookUrlEl = $("#config .webhook-url");

  const inputEl = $<HTMLInputElement>(webhookUrlEl, ".edit input");
  if (inputEl) {
    inputEl.value = data.config.webhookUrl;
  }

  const displayEl = $(webhookUrlEl, ".display span");
  if (displayEl) {
    displayEl.innerText = data.config.webhookUrl;
  }

  const mqttOriginEl = $("#config .mqtt-origin");
  const mqttOriginSpanEl = $(mqttOriginEl, "span");
  if (mqttOriginSpanEl) {
    mqttOriginSpanEl.innerText = data.config.mqttOrigin;
  }
}

export async function initConfigListeners() {
  const webhookUrlEl = $("#config .webhook-url");

  const buttonEl = $(webhookUrlEl, "button .submit");
  if (!buttonEl) {
    return
  }

  buttonEl.addEventListener('click', async function () {
    if (this.innerText !== "Update") {
      return;
    }

    this.innerHTML = "Updating";

    const inputEl = $<HTMLInputElement>(webhookUrlEl, "input");
    if (!inputEl) {
      return
    }

    const newConfig: PostConfigWebhookInput = {
      webhookUrl: inputEl.value ?? ""
    }

    try {
      const res = await fetch(`api/config/webhook`, {
        method: "post",
        body: JSON.stringify(newConfig),
        headers: {
          'content-type': "application/json"
        }
      });
      const data = (await res.json()) as PostConfigWebhook;
      if (data.success) {
        this.innerHTML = "Update";
      }
    } catch (e) {
      this.innerHTML = "Request Failed";

      setTimeout(() => {
        this.innerHTML = "Update";
      }, 3000);
    }

  })
}
