import { configHtml } from "./configuration";
import { downLinkHtml } from "./downLink";
import { eventsHtml, eventsPoller } from "./events";
import { webhooksHtml, webhooksPoller } from "./webhooks";
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

function poll(fn: () => any, interval: number) {
  setInterval(fn, interval);
  fn();
}

poll(webhooksPoller, 5000);
poll(eventsPoller, 5000);
