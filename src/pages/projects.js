import { renderTerminalBlock } from "../components/terminalRender.js";

function measureFinalHeight(descWrap, buildFinalNode) {
  const ghost = buildFinalNode();
  ghost.style.position = "absolute";
  ghost.style.visibility = "hidden";
  ghost.style.pointerEvents = "none";
  ghost.style.left = "-9999px";
  ghost.style.top = "0";

  const width =
    descWrap.getBoundingClientRect().width || descWrap.clientWidth || 600;
  ghost.style.width = `${width}px`;

  document.body.appendChild(ghost);
  const h = ghost.getBoundingClientRect().height;
  ghost.remove();

  return h;
}

export async function Projects(container) {
  await renderTerminalBlock(container, [{ tag: "h1", text: "Projects" }]);

  const wrapper = document.createElement("div");
  wrapper.className = "projects_container";
  container.appendChild(wrapper);

  const projects = [
    {
      name: "Idno Simulator",
      url: "https://github.com/Zac-Wa1ters/Idno-Care",
      desc: {
        before:
        `In this Python based project I worked on a team with two other
people to program a game based taking care of little a fictional
creature called an Idno. You named your Idno and had to make sure
all their needs were met. I helped with the logic and lay out the dataclasses as well debugged. `,
        linkText: "View Screenshots.",
        linkUrl: "https://drive.google.com/drive/folders/1qJUH3TMjYAVpIcJX4Gjo9j2zhHJaWT0h?usp=sharing"
      }
    },
    {
      name: "ShelfLife",
      url: "https://github.com/evalynope/ShelfLife",
      desc: {
        before:
          "ShelfLife is a group React project. We created a webapp using CRUD that allows users to create an account, search book titles via a public API, and add to their To Be Read(TBR) shelf. They can mark titles as finished and leave reviews for others to see. I programmed the API functions and debugged. ",
        linkText: "Demo the app here.",
        linkUrl: "https://evalynope.github.io/ShelfLife/",
        // after is optional
      },
    },
    {
      name: "CosplayHouse",
      url: "https://github.com/Zac-Wa1ters/cosplay-hub",
      desc: {
        before: `CosplayHouse is a solo project built using the Django framework.
Through CRUD principles CosplayHouse allows a user to create an account and profile to
showcase their Cosplays, create tutorials, do event planning, and follow other users. `,
        linkText: "View screenshots",
        linkUrl:
          "https://drive.google.com/drive/folders/11DZTk9VPKKVUiWTLr3RsGcWwE2czKQhP?usp=sharing",
        after: ".",
      },
    },
  ];

  for (const project of projects) {
    const name = document.createElement("div");
    name.className = "project_name";
    name.innerHTML = `<a href="${project.url}" target="_blank" rel="noopener noreferrer">${project.name}</a>`;

    const descWrap = document.createElement("div");
    descWrap.className = "project_desc";

    // Append first so width is real
    wrapper.append(name, descWrap);

    // ---- Case 1: string description ----
    if (typeof project.desc === "string") {
      const h = measureFinalHeight(descWrap, () => {
        const d = document.createElement("div");
        d.className = "project_desc";
        const p = document.createElement("p");
        p.textContent = project.desc;
        d.appendChild(p);
        return d;
      });

      descWrap.style.minHeight = `${h}px`;

      await renderTerminalBlock(descWrap, [
        { tag: "p", text: project.desc, speed: 3 },
      ]);
      continue;
    }

    // ---- Case 2: object description with inline link + optional after ----
    const afterText = project.desc.after ?? "";

    // Reserve final height INCLUDING after text
    const h = measureFinalHeight(descWrap, () => {
      const d = document.createElement("div");
      d.className = "project_desc";
      const p = document.createElement("p");

      p.append(project.desc.before);

      const a = document.createElement("a");
      a.href = project.desc.linkUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = project.desc.linkText;

      p.append(a);
      if (afterText) p.append(afterText);

      d.appendChild(p);
      return d;
    });

    descWrap.style.minHeight = `${h}px`;

    // Render typed + link + typed after
    const p = document.createElement("p");
    descWrap.appendChild(p);

    await renderTerminalBlock(p, [
      { tag: "span", text: project.desc.before, speed: 3 },
    ]);

    const link = document.createElement("a");
    link.href = project.desc.linkUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = project.desc.linkText;
    p.appendChild(link);

    if (afterText) {
      await renderTerminalBlock(p, [
        { tag: "span", text: afterText, speed: 3 },
      ]);
    }
  }
}
