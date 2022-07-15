import {SvgModel} from './js/model.js'
import {Controls} from './js/controller.js'
import {StateObserver} from './js/observer.js'

let list = [];
let Model;
let Controller;
const Observer = new StateObserver();

loadData();
function loadData() {
    // startAnimationFrame();
    fetch('../data/data.json')
        .then((res) => { return res.json()})
        .then((data) => {
            data.forEach(el => {
                list.push(el)
            })
            Model = new SvgModel(list); 
            Controller = new Controls(Model,Observer);
            Controller.load();
            init();
            return Controller.sayHello();
        })
};

function init() {

const menuElements = [...document.querySelectorAll('.svg-navigation > ul > li[data-role="menu"')];
const menuCloseButton = document.querySelector('.svg-navigation .close');

const previewToggleButtonRight = document.querySelector('.tab-right');
const previewToggleButtonLeft = document.querySelector('.tab-left');
const sizeButtons = [...document.querySelectorAll('.sizes button')];

const displayNameContainer = document.querySelector('.svg-display span.name');
//     // -----------> WIDGET FUNCTIONALITY <------------ //

// target svg-display svg-wrapper
previewToggleButtonRight.addEventListener('click', () => Controller.nextPreviewElement())
previewToggleButtonLeft.addEventListener('click', () => Controller.prevPreviewElement())

sizeButtons.forEach(btn => btn.addEventListener('click', () => Controller.changeDisplaySize(btn.dataset.size)))

displayNameContainer.addEventListener('click', (e) => Controller.changeDisplayName(displayNameContainer));

                    // ---------> MENU FUNCTIONALITY <------------- //

menuElements.forEach(menu => menu.addEventListener('click', () => Controller.toggleMenuElement(menu)))


document.querySelectorAll('.close')
    .forEach(btn => 
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            let p = btn.parentElement;
            p.dataset.state = "inactive";
            p.querySelector('ul').classList.remove('visible');
            p.querySelector('ul').dataset.state = "hidden";
            p.querySelector('ul').classList.add('hidden');
            btn.classList.toggle('show');

            document.querySelectorAll('.svg-navigation > ul > li[data-state="inactive"]')
                .forEach(el => {
                    el.classList.remove('hidden');
})}));




                // ---------------> SEARCH FUNCTIONALITY <----------------- //
const searchDashboard = document.querySelector('.svg-dashboard__search');
const defaultDashboard = document.querySelector('.svg-dashboard');
const searchbar = document.querySelector('.search-bar');
const header = document.querySelector('[data-role="interfaceHeader"]');
const clickoutsidemodal = document.querySelector('.svg-dashboard__search-overlay');
function toggleDashboards() {
    defaultDashboard.classList.toggle('hide');
    searchDashboard.classList.toggle('hide');
    console.log('toggle successful');
}

searchbar.addEventListener('keydown', () => {
    searchDashboard.innerHTML = '';
    const txt = searchbar.value;
    const reggie = new RegExp(txt);
    // CAN BE ALTERED TO SEACH IN CERTAIN STATES
    Controller.model.elements
        .filter(el => el[0].match(reggie))
            .map(el => { 
                let ele = Controller.createIcon(el[2], el);
                searchDashboard.append(ele)
            })
        ifClassExistCallback(searchDashboard,'hide',toggleDashboards);
})

// add click outside modal instead of blur

searchDashboard.addEventListener('focusout', () => {
    toggleDashboards();
    searchbar.value = '';
    header.style.opacity = .8;
    searchbar.removeEventListener('mouseout', focusDashboard);
})


searchbar.addEventListener('focus', () => {
    if (searchDashboard.classList.contains('hide') && searchbar.value != '') {
        toggleDashboards();
    }
    if (header.style.opacity !== 0) {
        header.style.opacity = 0;
    }
    function focusDashboard() {
        searchDashboard.focus();
        // searchDashboard.style.background = '#000';
        clickoutsidemodal.style.display = 'block';
        clickoutsidemodal.addEventListener('mouseleave', () => {
            toggleDashboards();
            clickoutsidemodal.style.display = 'none';
            // searchbar.value = '';
            header.style.opacity = .8;
            searchbar.removeEventListener('mouseleave', focusDashboard);
            console.log('dashboard out of focus')
        })
        console.log('dashboard in focus')
    }
    searchDashboard.innerHTML = '';
    const txt = searchbar.value;
    const reggie = new RegExp(txt);
    const tmpArr = Controller.model.elements
    // implement as hashmap for performance
    .filter(el => el[0].match(reggie))
    .map(el => { 
        let ele = Controller.createIcon(el[2],el);
        // ele.addEventListener('click')
        searchDashboard.append(ele);
    })
    searchbar.addEventListener('mouseout', focusDashboard)
})

// FUNCTIONS

// PREVIEW INTERFACE
function toggleMenuElement(menuElement) {
    menuElement.dataset.state="active";
    document.querySelectorAll('.svg-navigation > ul > li[data-state="inactive"]')
        .forEach(el => el.classList.add('hidden'));
            let submenu = element.querySelector('ul');
            // RUN AS A KEYFRAME/RAF //
            submenu.classList.remove('hidden');
            submenu.dataset.state = 'show';
            submenu.classList.add('visible');
            menuElement.querySelector('.close').classList.toggle('show');
}

function changeDisplayName(containerElement){
    let referenceNumberToClickedElement = this.observer.state.clickedElement.dataset.mainId;
    let databaseReference = this.model.elements[referenceNumberToClickedElement];
    let defaultState = containerElement.innerHTML;

    function ifEnterChangeValue(keyPressed,input,elementToChange) {
        if(keyPressed === 'Enter') {
            let value = input.value;
            elementToChange.innerHTML = value;
            databaseReference.splice(0,1,value);
        }
    }
    containerElement.innerHTML = `<input class="name-input" data-role="nameChanger" type="text">`;
    let displayNameInput = document.querySelector('[data-role="nameChanger');
    displayNameInput.addEventListener('keyup', (e) => { ifEnterChangeValue(e.key,e.value,containerElement) });
    displayNameInput.addEventListener('blur', () => { containerElement.innerHTML = defaultState});
    displayNameInput.focus();
}

function ifClassExistCallback(elementToCheck,str,cb) {
    if (elementToCheck.classList.contains(str)) {
        return cb();
    }
    console.log('not here');
}
function ifNoClassCallback(elementToCheck,str,cb) {
        if (!(elementToCheck.classList.contains(str))) {
            return cb();
        }
        console.log(`class = ${str}`);
    }
}

console.log(Model)