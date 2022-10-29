"use strict";

// motionOne  link
// import { animate, scroll, stagger, inView } from "https://cdn.skypack.dev/motion";

// JSON object here, because I can't comment in JSON............
// {
//     "project-name": "Learning Bootstrap",
//     "description-short": "A simple website created using mostly Bootstrap.",
//     "description-long": "The goal of the project was to learn basics of Bootstrap and try to make a website using it as much as possible. Thanks to that I had a chance to explore its capabilities.",
//     "picture-card": "",
//     "picture-content": "",
//     "github-link": "https://github.com/mn46/hogwart-student-list",
//     "project-link": "https://mn46.github.io/hogwart-student-list/"
// },

window.addEventListener("DOMContentLoaded", start);

const url = "projects.json";

function start() {
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      console.log(jsonData);
      jsonData.project.forEach(addContent);
    });
}

function addContent(project) {
  const cardTemplate = document.querySelector("#project-card-template").content;
  const imageTemplate = document.querySelector("#carousel-picture").content;

  const cardClone = cardTemplate.cloneNode(true);
  const imageClone = imageTemplate.cloneNode(true);

  cardClone.querySelector("img").src = project.pictureCard;
  cardClone.querySelector("h3").textContent = project.projectName;
  cardClone.querySelector("p").textContent = project.descriptionShort;
  cardClone.querySelector("button").dataset.projectnick = project.buttonInfo;

  document.querySelector("#projects_container").appendChild(cardClone);
}
