import { configHtml } from "./configuration";
import { downLinkHtml } from "./downLink";
import { eventsHtml, eventsPoller } from "./events";
import { webhooksHtml, webhooksPoller } from "./webhooks";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>LoRa Proxy</h1>
    <div style="display: flex;">
      ${configHtml()}
      ${downLinkHtml()}
    </div>
    <div style="display: flex;">
      ${eventsHtml()}
      ${webhooksHtml()}
    </div>
  </div>
`;

function poll(fn: () => any, interval: number) {
  setInterval(fn, interval);
  fn();
}

poll(webhooksPoller, 5000);
poll(eventsPoller, 5000);
