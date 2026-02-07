import { renderTerminalBlock } from "../components/terminalRender.js";

export async function Home(container) {
  await renderTerminalBlock(container, [
    {
      tag: "h1",
      text: "Zachary Walters",
      speed: 20,
    },
    {
      tag: "p",
      text: "Senior Robotics Technician | Software Developer Apprentice",
      delay: 150,
    },
    {
      tag: "p",
      text: "Use the navbar to get to know me and what I can do.",
      delay: 150,
    },
  ]);


}
