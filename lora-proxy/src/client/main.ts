import { configHtml, initConfigListeners, loadConfig } from "./configuration";
import { downLinkHtml } from "./downLink";
import { eventPollController, eventsHtml } from "./events";
import { webhookPollController, webhooksHtml } from "./webhooks";
import { styles } from "./styles";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div class="row">
      <div>
        <h1>LoRa Proxy</h1>
      </div>
    </div>
    <div class="row">
      ${configHtml()}
      ${downLinkHtml()}
    </div>
    <div class="row">
      ${eventsHtml()}
      ${webhooksHtml()}
    </div>
  </div>
  <style>
    ${styles}
  </style>
`;

webhookPollController.start();
eventPollController.start();

loadConfig();
initConfigListeners();
