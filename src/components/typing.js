import { setTyping, moveCursorTo } from "./cursor.js";

export async function typeText(el, text, speed = 25) {
  el.textContent = "";
  setTyping(true);

  for (const char of text) {
    el.textContent += char;
    moveCursorTo(el);
    await new Promise(r => setTimeout(r, speed));
  }

  setTyping(false);
}
