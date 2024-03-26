import { GetEvents } from "../server/types/api";
import { addTableRow, poll, tryFormatJSON } from "./util";

export function eventsHtml() {
  return `
    <div id="events">
      <h2>MQTT Events</h2>
      <span class="tail-status" style="display:none;"></span>
      <table>
        <thead>
          <th>datetime</th>
          <th>data</th>
          <th>topic</th>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  `;
}

let cursorId: number | null = null;

async function eventsPoller() {
  const res = await fetch(`/api/events${cursorId ? "?from=" + cursorId : ""}`);
  const data = (await res.json()) as GetEvents;

  cursorId = data.nextFromId;

  for (const event of data.events) {
    addTableRow("#events table tbody", [
      event.datetime,
      "<pre>" + tryFormatJSON(event.blob) + "</pre>",
      event.topic,
    ]);
  }
}

let failureCounter = 0;
export const eventPollController = poll(async () => {
  try {
    await eventsPoller();
  } catch {
    failureCounter += 1;

    if (failureCounter > 5) {
      eventPollController.stop();

      const tailStatus = document.querySelector<HTMLSpanElement>(
        "#events .tail-status"
      );

      if (tailStatus) {
        tailStatus.innerText = "Live log tailing disabled.";
        tailStatus.style.display = "inline";
      }
    }
  }
}, 5000);
