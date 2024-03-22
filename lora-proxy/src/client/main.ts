document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>LoRa Proxy</h1>
    <div id="webhooks">
      <h2>Webhook definitions</h2>
    </div>
    <div id="events">
      <h2>Events</h2>
      <table>
        <thead>
          <th>header</th>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
`;



setInterval(pollForEvents, 5000)
pollForEvents()


async function pollForEvents() {
  const res = await fetch('/api/events')
  const data = await res.json()

  console.log(data)

  const tableBody = document.querySelector<HTMLDivElement>("#events table tbody")

  if (!tableBody) {
    return;
  }

  const newTr = document.createElement("tr")
  const newTd = document.createElement("td")
  const newPre = document.createElement("pre")

  newPre.innerText = JSON.stringify(data)

  newTd.appendChild(newPre)
  newTr.appendChild(newTd)

  tableBody.prepend(newTr)
}
