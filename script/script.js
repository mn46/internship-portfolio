"use strict";
import { animate, inView } from "https://cdn.skypack.dev/motion";
// import { loop } from "./type-ani.js";

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
  loop(document.querySelector("#intro_text h1"), 0);
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
  console.log(this);

  document.querySelector("#project h2").textContent = project.projectName;
  document.querySelector(".project_description p").textContent = project.descriptionLong;
  document.querySelector(".github").href = project.githubLink;
  document.querySelector(".project_link").href = project.projectLink;

  // creating image carousel
  const slide = document.querySelector(".carousel-inner");

  slide.innerHTML = "";

  project.pictureModal.forEach((picture) => {
    const imageTemplate = document.querySelector("#carousel-picture").content;
    const imageClone = imageTemplate.cloneNode(true);

    imageClone.querySelector("img").src = picture;

    document.querySelector(".carousel-inner").appendChild(imageClone);
  });
  console.log(document.querySelector(".carousel-inner"));

  document.querySelector(".carousel-item").classList.add("active");
}

// scrolling for the projects container

function scrollRight() {
  document.querySelector("#projects_container").scrollBy(500, 0);
}

function scrollLeft() {
  document.querySelector("#projects_container").scrollBy(-500, 0);
}

// animations

// reusable typing animation

function loop(original) {
  let oldString = original.textContent;
  for (let i = 0; i < oldString.length + 1; i++) {
    delay(i);
  }

  function delay(i) {
    setTimeout(() => (original.textContent = oldString.slice(0, i)), i * 90);
    // i * 100, so that each iteration has longer delay; then it actually makes them appear one by one with 100 ms delay, not all at once; solution found at https://www.freecodecamp.org/news/thrown-for-a-loop-understanding-for-loops-and-timeouts-in-javascript-558d8255d8a4/
  }
}

// implementing animations

// typing animation for all h2 headlines
inView("h2", (info) => {
  loop(info.target, 0);
});

// paragraph in "intro" section appears when in view, after "typing" animation
inView("#intro p", (info) => {
  animate(info.target, { opacity: [0, 1] }, { duration: 1, delay: 0.8 });
});

// smileys "intro" section appears when in view, after "typing" animation
inView("#intro .image_container", (info) => {
  animate(info.target, { opacity: [0, 1] }, { duration: 1, delay: 1.4 });
});

// scroll container with projects appears when in view, after "typing" animation
inView("#projects_container", (info) => {
  animate(info.target, { opacity: [0, 1] }, { duration: 1.5, delay: 0.6 });
});

// paragraph in "about" section appears when in view, after "typing" animation
inView("#about_me p", (info) => {
  animate(info.target, { opacity: [0, 1] }, { duration: 1.5, delay: 0.5 });
});

// education sections apear one by one when in view
inView(".education_card", (info) => {
  animate(info.target, { opacity: [0, 1] }, { duration: 1, delay: 0.5 });
});
