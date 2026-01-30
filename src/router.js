import { Home } from "./pages/home.js";
import { About } from "./pages/about.js";
import { Skills } from "./pages/skills.js";
import { Projects } from "./pages/projects.js";
import { Contact } from "./pages/contact.js";

const routes = {
  "/": Home,
  "/about": About,
  "/skills": Skills,
  "/projects": Projects,
  "/contact": Contact,
};

export function navigateTo(path) {
  location.hash = path;
}

export async function renderRoute() {
  const path = location.hash.replace("#", "") || "/";

  const page = routes[path] || Home;
  const app = document.getElementById("app");

  app.classList.add("fade-out");
  await new Promise(r => setTimeout(r, 300));

  app.innerHTML = "";
  await page(app);

  app.classList.remove("fade-out");
  app.classList.add("fade-in");
}
