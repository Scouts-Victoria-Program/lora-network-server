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

export function poll(fn: () => any, time: number) {
  let interval: NodeJS.Timeout | null = null;

  return {
    start() {
      fn();
      interval = setInterval(fn, time);
    },
    stop() {
      if (interval !== null) {
        clearInterval(interval);
      }
    },
  };
}
