"use strict";

const headingEl = document.querySelectorAll(".box__heading");
const boxEl = document.querySelectorAll(".box");

// Event Handlers

const hideDetails = () => {
  boxEl.forEach(box => {
    const active = box.querySelector(".box__details--active");
    if (active) active.classList.remove("box__details--active");
  });

  // remove all active headings
  headingEl.forEach(heading =>
    heading.classList.remove("box__heading--active")
  );
};

const showDetails = e => {
  hideDetails();
  const detail = e.target.closest(".box").querySelector(".box__details");
  const heading = e.target.closest(".box").querySelector(".box__heading");
  detail.classList.add("box__details--active");
  heading.classList.add("box__heading--active");
};

// Event Listeners
headingEl.forEach(heading => heading.addEventListener("click", showDetails));
