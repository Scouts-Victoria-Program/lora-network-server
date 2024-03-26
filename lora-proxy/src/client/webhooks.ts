import { GetWebhookCalls } from "../server/types/api";
import { addTableRow, tryFormatJSON } from "./util";

export function webhooksHtml() {
  return `
    <div id="webhooks">
      <h2>Webhook Call Log</h2>
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

export async function webhooksPoller() {
  const res = await fetch(
    `/api/webhooks${cursorId ? "?from=" + cursorId : ""}`
  );
  const data = (await res.json()) as GetWebhookCalls;

  cursorId = data.nextFromId;

  for (const webhook of data.webhooks) {
    addTableRow("#webhooks table tbody", [
      webhook.datetime,
      "<pre>" + tryFormatJSON(webhook.request) + "</pre>",
      "<pre>" + tryFormatJSON(webhook.response) + "</pre>",
      String(webhook.statusCode),
      webhook.statusText,
    ]);
  }
}
