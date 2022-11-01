"use strict";

// motionOne  link
import { animate, scroll, stagger, inView } from "https://cdn.skypack.dev/motion";
import { original, counter, loop } from "./type-ani.js";

// adding content

window.addEventListener("DOMContentLoaded", start);

const url = "projects.json";

function start() {
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      console.log(jsonData);
      jsonData.projects.forEach(addContent);
    });
  document.querySelector(".proj_right").addEventListener("click", scrollRight);
  document.querySelector(".proj_left").addEventListener("click", scrollLeft);
  loop();
}

function addContent(project) {
  const cardTemplate = document.querySelector("#project-card-template").content;

  const cardClone = cardTemplate.cloneNode(true);

  //   adding content to cards on home page
  cardClone.querySelector("img").src = project.pictureCard;
  cardClone.querySelector("h3").textContent = project.projectName;
  cardClone.querySelector("p").textContent = project.descriptionShort;
  cardClone.querySelector("button").dataset.projnick = project.buttonInfo;
  //   event listener on button so that there's correct information in the modal
  cardClone.querySelector(".card_button").addEventListener("click", () => populateModal(project));

  // appending clone to the parent

  document.querySelector("#projects_container").appendChild(cardClone);
}

function populateModal(project) {
  // adding data to modal

  document.querySelector("#project h2").textContent = project.projectName;
  document.querySelector(".project_description p").textContent = project.descriptionLong;
  document.querySelector(".github").href = project.githubLink;
  document.querySelector(".project_link").href = project.projectLink;

  // creating image carousel

  project.pictureModal.forEach((picture) => {
    const imageTemplate = document.querySelector("#carousel-picture").content;
    const imageClone = imageTemplate.cloneNode(true);

    imageClone.querySelector("img").src = picture;

    document.querySelector(".carousel-inner").appendChild(imageClone);
  });

  document.querySelector(".carousel-item").classList.add("active");
}

// scrolling the projects container

function scrollRight() {
  document.querySelector("#projects_container").scrollBy(1000, 0);
}

function scrollLeft() {
  document.querySelector("#projects_container").scrollBy(-1000, 0);
}

// animations

animate("body", { opacity: [0, 1] }, { duration: 0.2 });
