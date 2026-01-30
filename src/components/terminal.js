import { navigateTo } from "../router.js";

export function initTerminal() {
  document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const input = document.querySelector(".terminal-input");
      if (!input) return;

      const command = input.value.trim().toLowerCase();
      handleCommand(command);
      input.value = "";
    }
  });
}

function handleCommand(cmd) {
  const commands = {
    home: () => navigateTo("/"),
    about: () => navigateTo("/about"),
    projects: () => navigateTo("/projects"),
    contact: () => navigateTo("/contact"),
    help: () => alert("Commands: home, about, projects, contact"),
  };

  commands[cmd]?.();
}
