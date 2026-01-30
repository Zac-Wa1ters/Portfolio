import { typeText } from "./typing.js";

export async function renderTerminalBlock(container, blocks) {
  for (const block of blocks) {
    const el = document.createElement(block.tag);

    if (block.className) el.className = block.className;
    if (block.html) el.innerHTML = block.html;

    container.appendChild(el);

    if (block.text) {
      await typeText(el, block.text, block.speed ?? 30);
    }

    if (block.delay) {
      await new Promise(r => setTimeout(r, block.delay));
    }
  }
}
