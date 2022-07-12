// NAVIGATION
const navbar = document.querySelector('.navbar');
const navIcons = document.querySelectorAll('.nav-icons');
const mousetrap = document.querySelector('.mousetrap')
const icons = document.querySelectorAll('.icon');
const menu = document.querySelector('.nav-menu');
const content = document.querySelector('.card');
const pointerCont = document.querySelector('.navpointer-container');
const pointer = document.querySelector('.nav-pointer');
const header = document.querySelector('header');
let position = 4;
let d = 0;

function toggleMenu(el) {
    if(el.classList.contains('active')) {
        pointerCont.classList.remove('active');
        el.classList.remove('active');
        document.querySelector('header').classList.toggle('active');
        content.classList.toggle('active');
        icons.forEach(icon => icon.classList.remove('active'));
        mousetrap.classList.remove('set');
        // resetPointer();
    } else {
    pointerCont.classList.add('active');
    mousetrap.classList.add('set');
    el.classList.add('active');
    icons.forEach(icon => icon.classList.remove('active'));
    icons.forEach(icon => icon.dataset.title == el.dataset.title ? icon.classList.add('active') : null )
    header.classList.contains('active') ? null : header.classList.toggle('active');
    content.classList.contains('active') ? null : content.classList.add('active');
    navIcons.forEach(cont => cont !== el ? cont.classList.remove('active') : null );
    }
};

function closeMenu() {
    pointerCont.classList.remove('active');
    navIcons.forEach(cont => cont.classList.remove('active'));
    mousetrap.classList.remove('set');
    content.classList.toggle('active');
    icons.forEach(icon => icon.classList.remove('active'));
    // resetPointer();
}

function activePointer(pos) {
    let el = document.querySelector('.nav-icons');
    let el2 = el.nextElementSibling;
    elPos = el.getBoundingClientRect();
    el2Pos = el2.getBoundingClientRect();
    let margin = (elPos.left + (elPos.width/2)) - (el2Pos.left + (el2Pos.width/2));
    let currentPos = pos;
    let ticks = position - currentPos;
    let shift = ticks * margin;
    d = d + shift;
    shift = d + 'px';
    document.documentElement.style.setProperty('--pointerOffset', `${shift}`);
    pointer.classList.contains('active') ? pointer.classList.add('active') : null;
    position = currentPos;
    return 
}

navIcons.forEach(cont => cont.addEventListener("click", () => {
    toggleMenu(cont);
}));
navIcons.forEach(cont => cont.addEventListener('mouseenter', (e) => {
    activePointer(e.currentTarget.dataset.position)
    }));
mousetrap.addEventListener('mouseenter', closeMenu);