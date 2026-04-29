import { renderTerminalBlock } from "../components/terminalRender.js";

function measureFinalHeight(descriptionWrapper, buildFinalNode) {
  const ghostElement = buildFinalNode();

  ghostElement.style.position = "absolute";
  ghostElement.style.visibility = "hidden";
  ghostElement.style.pointerEvents = "none";
  ghostElement.style.left = "-9999px";
  ghostElement.style.top = "0";

  const descriptionWidth =
    descriptionWrapper.getBoundingClientRect().width ||
    descriptionWrapper.clientWidth ||
    600;

  ghostElement.style.width = `${descriptionWidth}px`;

  document.body.appendChild(ghostElement);

  const finalHeight = ghostElement.getBoundingClientRect().height;

  ghostElement.remove();

  return finalHeight;
}

async function renderProjectDescription(descriptionWrapper, projectDescription) {
  if (typeof projectDescription === "string") {
    await renderTerminalBlock(descriptionWrapper, [
      { tag: "p", text: projectDescription, speed: 3 },
    ]);

    return;
  }

  const afterText = projectDescription.after ?? "";
  const paragraphElement = document.createElement("p");

  descriptionWrapper.appendChild(paragraphElement);

  await renderTerminalBlock(paragraphElement, [
    { tag: "span", text: projectDescription.before, speed: 3 },
  ]);

  const linkElement = document.createElement("a");
  linkElement.href = projectDescription.linkUrl;
  linkElement.target = "_blank";
  linkElement.rel = "noopener noreferrer";
  linkElement.textContent = projectDescription.linkText;

  paragraphElement.appendChild(linkElement);

  if (afterText) {
    await renderTerminalBlock(paragraphElement, [
      { tag: "span", text: afterText, speed: 3 },
    ]);
  }
}

function reserveDescriptionHeight(descriptionWrapper, projectDescription) {
  const finalHeight = measureFinalHeight(descriptionWrapper, () => {
    const ghostDescriptionWrapper = document.createElement("div");
    ghostDescriptionWrapper.className = "project_desc";

    const paragraphElement = document.createElement("p");

    if (typeof projectDescription === "string") {
      paragraphElement.textContent = projectDescription;
    } else {
      paragraphElement.append(projectDescription.before);

      const linkElement = document.createElement("a");
      linkElement.href = projectDescription.linkUrl;
      linkElement.target = "_blank";
      linkElement.rel = "noopener noreferrer";
      linkElement.textContent = projectDescription.linkText;

      paragraphElement.append(linkElement);

      if (projectDescription.after) {
        paragraphElement.append(projectDescription.after);
      }
    }

    ghostDescriptionWrapper.appendChild(paragraphElement);

    return ghostDescriptionWrapper;
  });

  descriptionWrapper.style.minHeight = `${finalHeight}px`;
}

export async function Projects(container) {
  await renderTerminalBlock(container, [{ tag: "h1", text: "Projects" }]);

  const projectsWrapper = document.createElement("div");
  projectsWrapper.className = "projects_container";
  container.appendChild(projectsWrapper);

  const projects = [
    {
      name: "The Youth Vineyard",
      url: "https://theyouthvineyard.org",
      desc: {
        before:
          "Served as Backend Engineer for The Youth Vineyard, collaborating with a development partner to design and build a full-stack web application. Led backend development and tech stack research, selecting and implementing Django, Wagtail CMS, and Snipcart. Developed features including program information management, a digital box office, and online merchandise sales.",
        linkText: "View this website here.",
        linkUrl:
          "https://theyouthvineyard.org",
      },
    },
    {
      name: "ShelfLife",
      url: "https://github.com/evalynope/ShelfLife",
      desc: {
        before:
          "ShelfLife is a group React project. We created a webapp using CRUD that allows users to create an account, search book titles via a public API, and add to their To Be Read(TBR) shelf. They can mark titles as finished and leave reviews for others to see. I programmed the API functions and debugged. ",
        linkText: "Demo the app here.",
        linkUrl: "https://evalynope.github.io/ShelfLife/",
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
    {
      name: "Idno Simulator",
      url: "https://github.com/Zac-Wa1ters/Idno-Care",
      desc: {
        before: `In this Python based project I worked on a team with two other
people to program a game based taking care of little a fictional
creature called an Idno. You named your Idno and had to make sure
all their needs were met. I helped with the logic and lay out the dataclasses as well debugged. `,
        linkText: "View Screenshots.",
        linkUrl:
          "https://drive.google.com/drive/folders/1qJUH3TMjYAVpIcJX4Gjo9j2zhHJaWT0h?usp=sharing",
      },
    },
  ];

  const projectRows = projects.map((project) => {
    const projectNameElement = document.createElement("div");
    projectNameElement.className = "project_name";
    projectNameElement.innerHTML = `<a href="${project.url}" target="_blank" rel="noopener noreferrer">${project.name}</a>`;

    const descriptionWrapper = document.createElement("div");
    descriptionWrapper.className = "project_desc";

    projectsWrapper.append(projectNameElement, descriptionWrapper);

    reserveDescriptionHeight(descriptionWrapper, project.desc);

    return {
      project,
      descriptionWrapper,
    };
  });



await Promise.all(
  projectRows.map(({ project, descriptionWrapper }) =>
    renderProjectDescription(descriptionWrapper, project.desc)
  )
);
}
