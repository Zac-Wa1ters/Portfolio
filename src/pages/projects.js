import { renderTerminalBlock } from "../components/terminalRender.js";

export async function Projects(container) {
  await renderTerminalBlock(container, [
    { tag: "h1", text: "Projects" },
  ]);

  const wrapper = document.createElement("div");
  wrapper.className = "projects_container";
  container.appendChild(wrapper);

  const projects = [
    {
      name: "Idno Simulator",
      url: "https://github.com/Zac-Wa1ters/Idno-Care",
      desc: `In this Python based project I worked on a team with two other
people to program a game based taking care of little a fictional
creature called an Idno. You named your Idno and had to make sure
all their needs were met.`,
    },
    {
        name: "ShelfLife",
        url: "https://github.com/evalynope/ShelfLife",
        desc: `Shelflife is a group React project. In we created a webapp that
allows users to create an account, search book titles via a public api, and add
them to their TBR(To Be Read) shelf. They can mark titles as finished and leave
reviews for other to see. I programmed the api functions and debugged.`,
    },
    {
      name: "CosplayHouse",
      url: "https://github.com/Zac-Wa1ters/cosplay-hub",
      desc: `CosplayHouse is a solo project built using the Django framework.
CosplayHouse allows a user to create an account and profile to showcase their Cosplays, create tutorials,
do event planning, and follow other users.`,
    },
  ];

  for (const project of projects) {
    const name = document.createElement("div");
    name.className = "project_name";
    name.innerHTML = `<a href="${project.url}" target="_blank">${project.name}</a>`;

    const desc = document.createElement("div");
    desc.className = "project_desc";

    wrapper.append(name, desc);

    await renderTerminalBlock(desc, [
      { tag: "p", text: project.desc, speed: 30 },
    ]);
  }


}


