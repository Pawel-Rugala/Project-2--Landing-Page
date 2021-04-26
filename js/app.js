/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active

// # PAWEL REMARKS # //

// <ul id="navbar__list"></ul>;

// List of sections
const sections = document.querySelectorAll('section');
//Nav item append to
const parent = document.getElementById('navbar__list');
// Function to build menu

const mainHero = document.querySelector('.main__hero');
const btn = document.querySelector('#btn-top');
btn.addEventListener('click', () => {
  mainHero.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'nearest',
  });
});

const buildMenu = (...sections) => {
  sections.forEach((ele) => {
    let newItem = document.createElement('li');
    newItem.innerHTML = `<a id="nav-${ele.id}" class="menu__link">${ele.firstElementChild.firstElementChild.textContent}</a>`;
    newItem.addEventListener('click', () => {
      ele.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    });
    parent.appendChild(newItem);
  });
};

buildMenu(...sections);

//Intersections
const options = {
  root: null,
  rootMargin: '0px',
  threshold: [0, 0.5, 1.0],
};
const cb = (entries, observer) => {
  entries.forEach((ele) => {
    const el = document.querySelector(`#nav-${ele.target.id}`);
    if (ele.intersectionRatio === 1) {
      // const el = document.querySelector(`#nav-${ele.target.id}`);
      el.classList.add('active');
      ele.target.classList.add('your-active-class');
    } else {
      el.classList.remove('active');
      ele.target.classList.remove('your-active-class');
    }
  });
};

const observer = new IntersectionObserver(cb, options);

const options2 = {
  root: null,
  rootMargin: '800px',
  threshold: [0, 0.5, 1.0],
};

const cb2 = (entries, observer) => {
  entries.forEach((ele) => {
    if (ele.intersectionRatio === 1) {
      btn.style.display = 'none';
    } else {
      btn.style.display = 'block';
    }
  });
};

const observer2 = new IntersectionObserver(cb2, options2);

sections.forEach((section) => observer.observe(section));
observer2.observe(mainHero);
