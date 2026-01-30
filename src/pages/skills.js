import { renderTerminalBlock } from "../components/terminalRender.js";
import { revealList } from "../components/terminalReveal.js";

export async function Skills(container) {
  await renderTerminalBlock(container, [
    { tag: "h1", text: "My Skills", speed: 20 }
  ]);

  const grid = document.createElement("div");
  grid.className = "logos_container";
  container.appendChild(grid);

  const skills = [
    ["html.png", "HTML"],
    ["css.png", "CSS"],
    ["python.png", "Python"],
    ["vscode.png", "VS Code"],
    ["git.png", "GitHub"],
    ["java.png", "Java"],
    ["react.png", "React"],
    ["sql.png", "SQL"],
    ["springboot.png", "Spring Boot"],
    ["django.png", "Django"],
  ];

  const figures = skills.map(([imgFile, label]) => {
    const figure = document.createElement("figure");

    figure.innerHTML = `
      <img src="images/${imgFile}" alt="${label}" class="logos" />
      <figcaption><h3>${label}</h3></figcaption>
    `;

    return figure;
  });

  await revealList(grid, figures, 160);

}

