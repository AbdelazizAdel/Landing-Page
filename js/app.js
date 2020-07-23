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

function isVisible(section) {
    const pos = section.getBoundingClientRect();
    if ((pos.top >= 0 && pos.top < window.innerHeight) || (pos.bottom >= 0 && pos.bottom < window.innerHeight))
        return true;
    return false;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
/*
This function builds the navigation bar dynamically by looping over all sections in the DOM and for each one it gets the value stored 
in the data-nav and use it to create a li element to put in the list. 
*/
function buildNavBar() {
    const sections = document.querySelectorAll("section");
    let docFrag = document.createDocumentFragment();
    for (let i = 0; i < sections.length; i++) {
        const name = sections[i].dataset.nav;
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = "#" + sections[i].id;
        a.textContent = name;
        a.className = "menu__link";
        li.appendChild(a);
        docFrag.appendChild(li);
    }
    let nav_bar = document.querySelector("#navbar__list");
    nav_bar.appendChild(docFrag);
}
// Add class 'active' to section when near top of viewport
/*
This function makes the closest element to the viewPort active by looping over all sections in the document and finding the nearest
one to the viewPort top which is elem and adding class active to it and then it removes class active from the other sections.
*/
function makeActive() {
    let distFromTop = Number.MAX_VALUE;
    let elem;
    let sections = document.querySelectorAll("section");
    for (let section of sections) {
        let pos = section.getBoundingClientRect();
        if (Math.abs(pos.top) < distFromTop) {
            distFromTop = Math.abs(pos.top);
            elem = section;
        }
    }
    for (let section of sections) {
        if (section != elem)
            section.classList.remove("your-active-class");
    }
    if (isVisible(elem))
        elem.classList.add("your-active-class");
}

// Scroll to anchor ID using scrollTO event
/*
This function makes the page scroll to the clicked section by using the scrollBy method. I used eventDelegation to handle this part.
*/
function scrollToSection(event) {
    event.preventDefault();
    const elem = event.target;
    if (elem.nodeName != "LI" && elem.nodeName != "A")
        return;
    const pos = document.querySelector('[data-nav="' + elem.textContent + '"]').getBoundingClientRect();
    scrollBy(pos.x, pos.y);
}


/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 
buildNavBar();
// Scroll to section on link click
document.querySelector("#navbar__list").addEventListener("click", scrollToSection);
// Set sections as active
window.addEventListener('scroll', makeActive);