# Landing Page Project

## Table of Contents

- [Instructions](#instructions)
- [Navigation](#navigation)
- [Intersections](#intersections)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Landing Page project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the Udacity Classroom.

## Navigation

Navigation is built dynamically as an unordered list. Here's the process:

1. Create an array of all sections on the screen and store it in variable

```
const sections = document.querySelectorAll('section');
```

2. Create a parent element to which child components will be append.

```
const parent = document.getElementById('navbar__list');
```

3. Create a function to build a navbar

```
const buildMenu = (...sections) => {
```

We don't how many sections will come from the server therefore we use spread operator `...sections` inside parameter.

```
  sections.forEach((ele) => {
    let newItem = document.createElement('li');
```

for each section within an array of sections
create let variable newItem which create new list element

```

    newItem.innerHTML = `<a id="nav-${ele.id}" class="menu__link">${ele.firstElementChild.firstElementChild.textContent}</a>`;
```

Include inside list element new html element with following properties:

- id="nav-[sectionID]"
- class="menu\_\_link"
- text content is excatly the same as section heading text

```
  newItem.addEventListener('click', () => {
    ele.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  });
```

Add event listener to new list item.
Event listner is watching click event.
Once click the list item smoothly scroll the desire section

```
  parent.appendChild(newItem);
});
};
```

At the end append this newItem (list element) to the navbar

4. Invoke the buildMenu function and pass an array of sections inside the parameter

```
buildMenu(...sections);
```

# Intersections

**Adding and removing class dynamically if content is in the view**

1. Create options object for the observer

```
const options = {
  rootMargin: '-300px 0px -300px 0px',
};
```

rootMargin works the same way as css margin but for the view. Here I'm reducing the view from top and bottom by 300px

2. Create a callback function which handle the logic. This function is triggered by observer

```
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
```

-> for each section within sections array
-> If section tag is intersecting than add .active class to the nav item & section
-> else remove .active class to the nav item & section 3.

3. Create new observer with callback func and options

```
const observer = new IntersectionObserver(cb, options);
```

4. Create observer for each section within sections array

```
sections.forEach((section) => observer.observe(section));
```
