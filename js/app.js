// List of sections
const sections = document.querySelectorAll('section');

//Nav item append to
const parent = document.getElementById('navbar__list');

//Create variable for .main__hero
//Intersection observer is attached to .main__hero
//to show or hide navbar & return to top button
const mainHero = document.querySelector('.main__hero');

//Create event listener for button return to the top.
const btn = document.querySelector('#btn-top');
btn.addEventListener('click', () => {
  mainHero.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'nearest',
  });
});

// Function to build menu
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

// Intersections - to watch if section is intersecting into view
// If yes, add acctive class to navbar-item & section
// otherwsie remove active class from navbar-item & section
// rootMargin property reduce the view screen from top and bottom by 300px
const options = {
  rootMargin: '-300px 0px -300px 0px',
};
const cb = (entries, observer) => {
  entries.forEach((ele) => {
    const el = document.querySelector(`#nav-${ele.target.id}`);
    if (ele.isIntersecting) {
      el.classList.add('active');
      ele.target.classList.add('your-active-class');
    } else {
      el.classList.remove('active');
      ele.target.classList.remove('your-active-class');
    }
  });
};

const observer = new IntersectionObserver(cb, options);
sections.forEach((section) => observer.observe(section));

// Intersections for scroll to the top button.
// if view is 800px lower than main hero section show the button
// otherwise hide the button
const options2 = {
  root: null,
  rootMargin: '800px 0px 0px 0px',
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
observer2.observe(mainHero);

// Intersection for navbar
// if not visible start timer 3sec to hide navbar
// otherwise show navbar

const navbar = document.querySelector('.page__header');
let t;
const timer = () => {
  t = setTimeout(() => {
    navbar.style.visibility = 'hidden';
  }, 3000);
};

const cb3 = (entries, observer) => {
  entries.forEach((ele) => {
    if (ele.intersectionRatio === 1) {
      clearTimeout(t);
      navbar.style.visibility = 'visible';
    } else {
      window.addEventListener('scroll', () => {
        clearTimeout(t);
        navbar.style.visibility = 'visible';
        timer();
      });
    }
  });
};

const observer3 = new IntersectionObserver(cb3, options);
observer3.observe(mainHero);
