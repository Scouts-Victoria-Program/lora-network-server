import { GetWebhookCalls, PostWebhookCallRetry } from "../server/types/api";
import { addTableRow, poll, tryFormatJSON } from "./util";

export function webhooksHtml() {
  return `
    <div id="webhooks">
      <h2>Webhook Call Log</h2>
      <span class="tail-status" style="display:none;"></span>
      <table>
        <thead>
            <th>datetime</th>
            <th>req</th>
            <th>res</th>
            <th>status</th>
            <th>status text</th>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  `;
}

let cursorId: number | null = null;
async function webhooksPoller() {
  const res = await fetch(
    `/api/webhooks${cursorId ? "?from=" + cursorId : ""}`
  );
  const data = (await res.json()) as GetWebhookCalls;

  cursorId = data.nextFromId;

  for (const webhook of data.webhooks) {
    const webhookId = webhook.id;
    addTableRow("#webhooks table tbody", [
      webhook.datetime,
      "<pre>" + tryFormatJSON(webhook.request) + "</pre>",
      "<pre>" + tryFormatJSON(webhook.response) + "</pre>",
      String(webhook.statusCode),
      webhook.statusText,
      {
        text: "Resend",
        onClick: async (el, _event) => {
          if (el.innerText !== "Resend") {
            return;
          }

          el.innerHTML = "Resending";

          try {
            const res = await fetch(`/api/webhooks/${webhookId}/resend`, {
              method: "post",
            });
            const data = (await res.json()) as PostWebhookCallRetry;
            if (data.success && data.webhook.statusCode === 200) {
              el.innerHTML = "Resent";
            } else {
              el.innerHTML = "Webhook Failed";
            }
          } catch (e) {
            el.innerHTML = "Request Failed";
          }

          setTimeout(() => {
            el.innerHTML = "Resend";
          }, 3000);
        },
      },
    ]);
  }
}

let failureCounter = 0;
export const webhookPollController = poll(async () => {
  try {
    await webhooksPoller();
  } catch {
    failureCounter += 1;

    if (failureCounter > 5) {
      webhookPollController.stop();

      const tailStatus = document.querySelector<HTMLSpanElement>(
        "#webhooks .tail-status"
      );

      if (tailStatus) {
        tailStatus.innerText = "Live log tailing disabled.";
        tailStatus.style.display = "inline";
      }
    }
  }
}, 5000);
