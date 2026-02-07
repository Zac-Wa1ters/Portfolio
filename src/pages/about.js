import { renderTerminalBlock } from "../components/terminalRender.js";

export async function About(container) {
  // Animate header
  await renderTerminalBlock(container, [
    {
      tag: "h1",
      text: "About Me",
      speed: 20
    }
  ]);

  // Layout section
  const section = document.createElement("div");
  section.className = "about-section";

  const img = document.createElement("img");
  img.src = "images/Zac.jpeg";
  img.alt = "Zachary Walters photo";
  img.className = "about-image";

  const text = document.createElement("p");

  section.append(img, text);
  container.appendChild(section);

  // Animate paragraph
  await renderTerminalBlock(text, [
    {
      tag: "span",
      text: `I'm Senior Robotics Technician for Starship Technologies from
Oxford, MS. I’ve spent the past few years working hands-on with
autonomous systems and robotic platforms, ensuring their reliability
and performance in real-world environments. I’m currently expanding
my skill set as a Software Developer Apprentice at Base Camp Coding
Academy. Here, I’m diving into full-stack development, learning to
build responsive applications, manage databases, and write clean,
efficient code in a collaborative, agile environment.`,
      speed: 10
        }
  ]);


}
