"use strict";

// Trick to set the date input to today's date
date.min = new Date().toISOString().split("T")[0];
// Sticky navigation
const sectionHeroEl = document.querySelector(".section-hero");
const logoEl = document.querySelector(".logo");

const obs = new IntersectionObserver(
  function (entries) {
    const [ent] = entries;

    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
      logoEl.src = "img/travel.png";
    } else {
      document.body.classList.remove("sticky");
      logoEl.src = "img/travel.png";
    }
  },
  {
    // Inside the viewport
    root: null,
    threshold: 0,
    rootMargin: "-60px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Making the mobile navigation work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Preventing the default behavior of the form
const formEl = document.querySelectorAll(".form");

formEl.forEach(function (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    form.reset();
  });
})

///////////////////////////////////////
// Button scrolling
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

///////////////////////////////////////
// Changing the color of the svg icons using deSVG.js
window.addEventListener('load', function () {
  deSVG('.category-icon', true);
});

//One Page Slider
class Slider {
  constructor(slides, btnLeft, btnRight, gap = 100) {
    this.slides = document.querySelectorAll(slides);

    // Navigating the slides
    this.btnLeft = document.querySelector(btnLeft);
    this.btnRight = document.querySelector(btnRight);

    // Slides gap
    this.gap = gap;

    this.currentSlide = 0;
    this.maxSlide = this.slides.length;

    this._goToSlide();
    this._nextSlide();
    this._prevSlide();
  }
  _goToSlide(slide = 0) {
    this.slides.forEach((s, i) => (s.style.transform = `translateX(${this.gap * (i - slide)}%)`));
  }

  _nextSlide() {
    this.btnRight.addEventListener("click", () => {
      this.currentSlide === this.maxSlide - 1 ? this.currentSlide = 0 : this.currentSlide++;

      this._goToSlide(this.currentSlide);
    });
  }
  _prevSlide() {
    this.btnLeft.addEventListener("click", () => {
      this.currentSlide === 0 ? this.currentSlide = this.maxSlide - 1 : this.currentSlide--;

      this._goToSlide(this.currentSlide);
    });
  }
}
const sliderHero = new Slider(".hero-slide", ".hero-slider__btn--left", ".hero-slider__btn--right");
const sliderTestimonials = new Slider(".testimonials-slide", ".testimonial__btn--left", ".testimonial__btn--right", 105);


