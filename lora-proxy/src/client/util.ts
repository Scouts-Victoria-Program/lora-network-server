interface Cell {
  text?: string;
  onClick?: (el: HTMLElement, ev: MouseEvent) => void;
}

export function addTableRow(tbodySelector: string, cells: (string | Cell)[]) {
  const tableBody = document.querySelector<HTMLDivElement>(tbodySelector);

  if (!tableBody) {
    return;
  }

  const newTr = document.createElement("tr");
  for (const cell of cells) {
    const newTd = document.createElement("td");
    if (typeof cell === "string") {
      newTd.innerHTML = cell;
    } else {
      if (cell.onClick) {
        newTd.addEventListener("click", function (event) {
          cell.onClick?.(this, event);
        });
      }
      newTd.innerHTML = cell.text ?? "";
    }
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
