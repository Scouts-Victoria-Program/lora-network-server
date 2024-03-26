import { GetEvents } from "../server/types/api";
import { addTableRow, tryFormatJSON } from "./util";

export function eventsHtml() {
  return `
    <div id="events">
      <h2>MQTT Events</h2>
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

export async function eventsPoller() {
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
