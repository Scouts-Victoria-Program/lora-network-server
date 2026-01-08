import { configHtml, initConfigListeners, loadConfig } from "./configuration";
import { downLinkHtml } from "./downLink";
import { eventPollController, eventsHtml } from "./events";
import { webhookPollController, webhooksHtml } from "./webhooks";
import { styles } from "./styles";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div class="row">
      <div class="header">
        <h1>LoRa Proxy</h1>
        <span class="buttons">
          <a href="/">
            <img src="/assets/home_logo.svg" alt="Home">
            <span>Home</span>
          </a>
          <a href="http://lora-gateway.darends.scouthack.com">
            <img src="/assets/laird_logo.png" alt="LoRa_Gateway">
            <span>Gateway</span>
          </a>
          <a href="http://chirpstack.darends.scouthack.com">
            <img src="/assets/chirpstack_logo.png" alt="Chirpstack">
            <span>Chirpstack</span>
          </a>
          <a href="/proxy/">
            <img src="/assets/proxy_logo.svg" alt="SVStem_LoRa_Proxy">
            <span>Proxy</span>
          </a>
          <a href="/game/">
            <img src="/assets/game_logo.svg" alt="Game">
            <span>Game</span>
          </a>
        </span>
      </div>
    </div>
    <div class="row">
      ${eventsHtml()}
      ${webhooksHtml()}
      <div>
        ${configHtml()}
        ${downLinkHtml()}
      </div>
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
