import { moveCursorTo, setTyping } from "./cursor.js";

export async function revealList(container, items, delay = 80) {
  setTyping(true);

  for (const item of items) {
    container.appendChild(item);
    moveCursorTo(item);
    await new Promise(r => setTimeout(r, delay));
  }

  setTyping(false);
}
