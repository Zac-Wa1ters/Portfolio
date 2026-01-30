let cursor;

export function initCursor() {
  cursor = document.getElementById("terminal-cursor");
  cursor.classList.add("blink");
}

export function setTyping(isTyping) {
  if (!cursor) return;
  cursor.classList.toggle("blink", !isTyping);
}

export function moveCursorTo(el) {
  if (!cursor || !el) return;

  // Find the last text node
  let textNode = null;

  for (let i = el.childNodes.length - 1; i >= 0; i--) {
    const node = el.childNodes[i];
    if (node.nodeType === Node.TEXT_NODE && node.textContent.length) {
      textNode = node;
      break;
    }
  }

  // Fallback if text node not found yet
  if (!textNode) {
    const rect = el.getBoundingClientRect();
    cursor.style.left = `${rect.left + window.scrollX}px`;
    cursor.style.top = `${rect.top + window.scrollY}px`;
    return;
  }

  // Create caret-accurate range
  const range = document.createRange();
  range.setStart(textNode, textNode.length);
  range.setEnd(textNode, textNode.length);

  const rects = range.getClientRects();
  if (!rects.length) return;

  const caretRect = rects[rects.length - 1];

  // Match font size of the element being typed
  const computed = window.getComputedStyle(el);
  cursor.style.fontSize = computed.fontSize;

  // Position cursor exactly at caret
  cursor.style.left = `${caretRect.right + window.scrollX}px`;
  cursor.style.top = `${caretRect.top + window.scrollY}px`;
}
