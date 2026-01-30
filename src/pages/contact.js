import { renderTerminalBlock } from "../components/terminalRender.js";
import { revealList } from "../components/terminalReveal.js";

export async function Contact(container) {
  await renderTerminalBlock(container, [
    { tag: "h1", text: "Contact Me", speed: 20 }
  ]);

  const grid = document.createElement("div");
  grid.className = "contact_container";
  container.appendChild(grid);

  const contacts = [
    ["mail.png", "E-Mail", "mailto:zwalters@basecampcodingacademy.org"],
    ["linkedin.png", "LinkedIn", "https://linkedin.com/in/zachary-s-walters/"],
    ["github.png", "Github", "https://github.com/Zac-Wa1ters/"],
    ["resume.png", "Resume", "https://drive.google.com/file/d/1RLPPCl1DkI31NC0CtqlGg5_UMaEG60bB/view?usp=sharing"],
  ];

  const figures = contacts.map(([img, label, link]) => {
    const figure = document.createElement("figure");

    figure.innerHTML = `
      <a href="${link}" target="_blank">
        <img src="images/${img}" alt="${label}" class="logos" />
        <figcaption><h3>${label}</h3></figcaption>
      </a>
    `;

    return figure;
  });

  await revealList(grid, figures, 160);

}
