// Dom selectors
const btnHamburger = document.querySelector('#btnHamburger')
const header = document.querySelector('.header')
const body = document.querySelector('body')
const overlay = document.querySelector('.overlay')
const fadeElems = document.querySelectorAll('.has-fade')
const arrow = $('#arrow')
const target = document.querySelector('#js-target');
const leesMeer = $('#lees__meer')

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    setTimeout(() => {
        ScrollTrigger.refresh()
    }, 2000);
});

const navSlide = () => {
    const burger = document.querySelector('.nav__burger')
    const nav = document.querySelector('.nav__links')
    const navLinks = document.querySelectorAll('.nav__links li')


    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav__not_active')
        nav.classList.toggle('nav__active')

        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {

                link.style.animation = ''
            } else {
                link.style.animation = `navLinkFadeIn 0.5s ease forwards ${index / 7 + 0.5}s`
            }
        })


        // Burger animation 
        burger.classList.toggle('nav__burger__toggle')
    })


}

navSlide()

function loader() {
    let tl = gsap.timeline({ defaults: { ease: "none" } }).to(".load_wrapper", {
        duration: 0.7,
        opacity: "0",
        ease: "ease-in",
        display: "none"
    })
}

function loader2() {
    let tl = gsap.timeline()
    tl.to(".loader svg", {
        opacity: 0,
        duration: 0.5
    })
    tl.to(".loader", {
        scaleY: 0,
        duration: 0.7,
        transformOrigin: "top",
        ease: "ease-in"
    })
}

// let tl = gsap.timeline()
// tl.fromTo("ul.transition li", {
//     opacity: "1"
// }, {
//     backgroundColor: "#858585",
//     duration: "1",
//     ease: "ease-in-out",
//     repeat: "-1",
//     yoyo: "true",
//     stagger: "0.1"
// })

$(window).on("load", function () {
    loader2()
})

// Splide Init
const config = {
    type: "loop"
}

var elms = document.getElementsByClassName('splide');
for (var i = 0, len = elms.length; i < len; i++) {
    new Splide(elms[i], config).mount();
}


gsap.registerPlugin(ScrollTrigger)

// Locomotive Init
// import LocomotiveScroll from 'locomotive-scroll';
var scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});

scroll.on("scroll", ScrollTrigger.update)
ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
});

arrow.click(function () {
    scroll.scrollTo(target);
})

leesMeer.click(function (e) {
    e.preventDefault();
    scroll.scrollTo(target);
})
$('#machinepark-arrow').click(function () {
    scroll.scrollTo(document.querySelector('#machinepark-target'))
})
$('#producten-arrow').click(function () {
    scroll.scrollTo(document.querySelector('#producten-target'))
})


// Animation Functions
function pageTransition() {
    var tl = gsap.timeline()
    tl.to('ul.transition li', { duration: .2, scaleY: 1, transformOrigin: "top", stagger: .1 })
    tl.to('ul.transition li', { duration: .4, scaleY: 0, transformOrigin: "top", stagger: .1, delay: 0 })
}



gsap.utils.toArray(".fade_up").forEach(element => {
    let tl = gsap.timeline({ defaults: { ease: "none" } }).from(element, {
        duration: 0.8,
        y: "45px",
        ease: "ease-out",
        opacity: "0"
    })
    ScrollTrigger.create({
        trigger: element,
        // start: "top %",
        scroller: "[data-scroll-container]",
        animation: tl
    })
})

gsap.utils.toArray("hr").forEach(element => {
    let tl = gsap.timeline({ defaults: { ease: "none" } }).from(element, {
        duration: 2,
        scaleX: "0",
        ease: "ease-in-out",
        transformOrigin: "left"
    })
    ScrollTrigger.create({
        trigger: element,
        scroller: "[data-scroll-container]",
        animation: tl
    })
})



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => scroll.update());


// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


// Mobile hamburger animations
// btnHamburger.addEventListener('click', () => {

//     if (header.classList.contains('open')) { // Close
//         body.classList.remove('noscroll')
//         header.classList.remove('open')
//         fadeElems.forEach(function(elem) {
//             elem.classList.remove('fade-in')
//             elem.classList.add('fade-out')
//         })


//     } else { // Open
//         body.classList.add('noscroll')
//         header.classList.add('open')
//         fadeElems.forEach(function(elem) {
//             elem.classList.remove('fade-out')
//             elem.classList.add('fade-in')
//         })
//     }
// })