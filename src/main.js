console.log("MAIN.JS LOADED")
import { renderRoute } from "./router.js";
import { initTerminal } from "./components/terminal.js";
import { initCursor } from "./components/cursor.js";

document.addEventListener("DOMContentLoaded", () => {
  initTerminal();
  initCursor();
  renderRoute();
});


window.addEventListener("hashchange", renderRoute);
