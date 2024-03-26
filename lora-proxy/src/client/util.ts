export function addTableRow(tbodySelector: string, cells: string[]) {
  const tableBody = document.querySelector<HTMLDivElement>(tbodySelector);

  if (!tableBody) {
    return;
  }

  const newTr = document.createElement("tr");
  for (const cell of cells) {
    const newTd = document.createElement("td");
    newTd.innerHTML = cell;
    newTr.appendChild(newTd);
  }

  tableBody.prepend(newTr);
}

export function tryFormatJSON(probablyJSON: string): string {
  try {
    return JSON.stringify(JSON.parse(probablyJSON), null, 2);
  } catch {
    return probablyJSON;
  }
}
