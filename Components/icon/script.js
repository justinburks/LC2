
import { SvgModel } from './model.js';
// import { createIconObject } from './controller.js'
// const data = fetch('./data.json').then(
//     res => {
//         return res.json()
//     }
// )

// console.log(data)
let list = [];
let model;
fetch('data.json')
        .then((res) => { return res.json()})
        .then((data) => {
            data.forEach(el => {
                list.push(el)
            })
        return list;
        })
        .then(list => {model = new SvgModel(list); return model})
        .then(model => {
            // console.log(model)
            model.build();
            model.buildTabs();
            return;
        })

    // function checkBack() {
    //     if (document.querySelector('.svg-dashboard').childElementCount !== 5280) {
    //         console.log('notchet')
    //         setTimeout(checkBack(),200)
    //     } else {addListeners(); console.log('dunzo')}
    // }
//     function addListeners() {
//     document.querySelectorAll('.svg-dashboard .svg-wrapper').forEach(el => {
//     const markup = el.outerHTML;
//     const name = el.dataset.name.replaceAll('_', ' ').toLowerCase();
//     const category = el.dataset.category.replaceAll('_', ' ');

//     el.addEventListener('click', () => {
//         document.querySelector('.svg-interface .svg-display').innerHTML = markup;
//         document.querySelector('.svg-interface .svg-description .name').innerText = name;
//         document.querySelector('.svg-interface .svg-description .category').innerText = category;
//         document.querySelector('.svg-display .svg-wrapper').dataset.size="lg";
//     })
//     el.addEventListener('dblclick', () => {
//         const element = el.outerHTML;
//         window.navigator.clipboard.writeText(element);
//         // show highlight green (fade-in-out) overlay
//     })

//     // LISTEN FOR CTRL + CLICK = Copy/Select Many
//     }) 
// }
document.querySelectorAll('.sizes button').forEach(button => {
    // x = button.dataset.size.toString();
    // console.log(x)
    button.addEventListener('click', () => {
        const x = button.dataset.size.toString();
        console.log(x);
        changeDisplaySize(x);
    });
})

    // MENU //


document.querySelectorAll('.svg-navigation > ul > li[data-role="menu"]')
 .forEach(menu => (menu.addEventListener('click', () => {
    menu.dataset.state="active"
    document.querySelectorAll('.svg-navigation > ul > li[data-state="inactive"]')
     .forEach(el => el.classList.add('hidden'));
        let submenu = menu.querySelector('ul')
        // RUN AS A KEYFRAME/RAF //
        submenu.classList.remove('hidden');
        submenu.dataset.state = 'show';
        submenu.classList.add('visible');
        menu.querySelector('.close').classList.toggle('show');
    })))

document.querySelectorAll('.close')
    .forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    let p = btn.parentElement;
    console.log(p)
    p.dataset.state = "inactive";
    p.querySelector('ul').classList.remove('visible');
    p.querySelector('ul').dataset.state = "hidden"
    p.querySelector('ul').classList.add('hidden');
    btn.classList.toggle('show');
    document.querySelectorAll('.svg-navigation > ul > li[data-state="inactive"]')
    .forEach(el => {
        el.classList.remove('hidden');
    })

    }));
// document.querySelector('.svg-wrapper[data-name="CLOSE"]').addEventListener('click', (e) => {
//     e.stopPropagation();
//     console.log(e.target.parentElement.parentElement)
//     e.target.parentElement.parentElement.dataset.state="inactive";
//     document.querySelector('[data-role="interfaceMenu"').classList.add('show');
// })
    // document.querySelectorAll('.svg-navigation > ul > li[data-role="menu"]')
    //   .forEach(menu => {
    //     // document.querySelectorAll('[data-role="toggle"]').forEach(tggle => tggle.classList.remove('hidden'))
    //     // menu.dataset.state="inactive";
    //     menu.classList.remove('hidden');
    //     let submenu = menu.querySelector('ul');
    //     // RUN AS A KEYFRAME/RAF //
    //     submenu.classList.remove('visible');
    //     submenu.dataset.state = 'hidden';
    //     submenu.classList.add('hidden');
    //     document.querySelector('.close').classList.toggle('show');
    // })}))

// target svg-display svg-wrapper
function changeDisplaySize(sz) {
    const wrapper = document.querySelector('.svg-display .svg-wrapper');
    const icon = document.querySelector('.svg.display .svg-wrapper svg');

    // refactor
    // modify stylesheet instead of inline style //

    if (typeof sz === 'string') {
    wrapper.dataset.size = `${sz}`;
    return
    }

    if (typeof sz === 'number') {
    icon.height = `${sz}px`
    icon.width = `${sz}px`
    wrapper.height = `${sz + 40}px`
    wrapper.width = `${sz + 40}px`
    return
    }
}

        // SEARCH //

// Elements Array

// const icons = document.querySelectorAll('.svg-dashboard .svg-wrapper');
// const elements = []
// icons.forEach(el => elements.push([el.dataset.name,el.innerHTML]));
// // sort by name
// const sortedElements = [];
// icons.forEach(el => sortedElements.push([el.dataset.name,el.innerHTML]))
// sortedElements.sort();
// console.log(sortedElements)
// console.log(elements)
// Filter Array By Search

const searchDashboard = document.querySelector('.svg-dashboard__search');
const defaultDashboard = document.querySelector('.svg-dashboard');
const searchbar = document.querySelector('.search-bar');
function toggleDashboards() {
    defaultDashboard.classList.toggle('hide');
    searchDashboard.classList.toggle('hide');
    console.log('toggle successful')
}

searchbar.addEventListener('keyup', () => {
    searchDashboard.innerHTML = '';
    const txt = searchbar.value;
    const reggie = new RegExp(txt);
    const tmpArr = model.elements
    // implement as hashmap for performance
    .filter(el => el[0].match(reggie))
    .map(el => { 
        let ele = model.createIcon(el[2])
        searchDashboard.append(ele)
    })
    console.log(searchDashboard)
    if (searchDashboard.classList.contains('hide')) {
        toggleDashboards();
    }
})

searchbar.addEventListener('blur', () => {
    toggleDashboards();
})
searchbar.addEventListener('focus', () => {
    if (searchDashboard.classList.contains('hide') && searchbar.value != '') {
        toggleDashboards();
    }
    searchDashboard.innerHTML = '';
    const txt = searchbar.value;
    const reggie = new RegExp(txt);
    console.log(model)
    const tmpArr = model.elements
    // implement as hashmap for performance
    .filter(el => el[0].match(reggie))
    .map(el => { 
        let ele = model.createIcon(el[2])
        searchDashboard.append(ele)
    })
})

        // END SEARCH //

// const icons = document.querySelectorAll('.svg-dashboard .svg-wrapper');

// let createIconObject = function(element) {
//     let icon = {};
//     icon.markup = element.innerHTML;
//     icon.name = element.dataset.name.replaceAll('_', ' ').toLowerCase();
//     icon.category = element.dataset.category.replaceAll('_', ' ');
//     icon.createIcon = function() {
//         let el = document.createElement('div');
//         el.dataset.category = this.category;
//         el.dataset.name = this.name;
//         el.dataset.role = 'svgWrapper';
//         el.innerHTML = icon.markup;
//         return el;
//     }

//     return [icon.name,icon.category,icon]
// }

// const model = new ExportAPI(icons, createIconObject);

/*

CREATE NEW CLASS HERE

class ExportAPI = {
    constructor(list, elementConstructor) {
        
    }
}

let arr = []
elements.forEach(el => {
    arr.push(createIconObject)
})
console.log(arr)
*/
// let idk = model.elements[0]
// console.log(idk[2].createIcon())
// let tmp = []

// model.elements.forEach(el => {
//     tmp.push(el)
// })

// console.log(JSON.stringify(tmp));



//--------------------------> CONTROLLER <---------------------------------//


let clickedElement;

document.querySelector('.tab-right').addEventListener('click', () => {
    nextEl(clickedElement);
})
document.querySelector('.tab-left').addEventListener('click', () => {
    prevEl(clickedElement);
})

function nextEl(){
    // console.log(model.clickedElement)
    if (model.clickedElement === undefined) {
        model.clickedElement = document.querySelector('.svg-dashboard').firstElementChild;
    }
    if (model.clickedElement.nextElementSibling === null) {
        model.clickedElement = model.clickedElement.parentElement.firstElementChild
    }
    let el = model.clickedElement.nextElementSibling;
    // observer.lastElementClicked
    let ref = model.clickedElement.dataset.mainId;
    let elref = model.elements[ref];
    const html = el.innerHTML;
    const displayName = elref[0].toString().replaceAll('_', ' ').toLowerCase();
    const displayCategory = elref[1].toString().replaceAll('_', ' ');
    document.querySelector('.svg-interface .svg-display .svg-wrapper').innerHTML = html;
    document.querySelector('.svg-interface .svg-description .name').innerText = displayName;
    document.querySelector('.svg-interface .svg-description .category').innerText = displayCategory;
    document.querySelector('.svg-display .svg-wrapper').dataset.size="lg";
    model.clickedElement = el;
    console.log(el)
};

function prevEl(){
    // console.log(model.clickedElement)
    if (model.clickedElement === undefined) {
        model.clickedElement = document.querySelector('.svg-dashboard').lastElementChild;
    }
    if (model.clickedElement.nextElementSibling === null) {
        model.clickedElement = model.clickedElement.parentElement.lastElementChild
    }
    let el = model.clickedElement.previousElementSibling;
    // observer.lastElementClicked
    let ref = model.clickedElement.dataset.mainId;
    let elref = model.elements[ref];
    const html = el.innerHTML;
    const displayName = elref[0].replaceAll('_', ' ').toLowerCase();
    const displayCategory = elref[1].replaceAll('_', ' ');
    document.querySelector('.svg-interface .svg-display .svg-wrapper').innerHTML = html;
    document.querySelector('.svg-interface .svg-description .name').innerText = displayName;
    document.querySelector('.svg-interface .svg-description .category').innerText = displayCategory;
    document.querySelector('.svg-display .svg-wrapper').dataset.size="lg";
    model.clickedElement = el;
};

// generator function to repeat
document.querySelector('.svg-display span.name').addEventListener('click', () => {
    // replace span with input
    let ref = model.clickedElement.dataset.mainId;
    let elref = model.elements[ref];
    console.log(elref[0]);
    let elementIndex = model.elements[ref];
    document.querySelector('.svg-display .name').innerHTML = `<input type="text">`;
    document.querySelector('.svg-display input').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            let val = e.target.value;
            console.log(val)
            document.querySelector('.svg-display span.name').innerHTML = val;
            elementIndex.splice(0,1,val)
            // elementIndex[0] = val;
            // doesn't update live?
            console.log(elementIndex);
            // write to log --> all changes in formated way.
            // X changed Y name to Z on D date
            // X moved Y to Z category on D date
            // X added Y to Z collection on D date
            // X added Y to Z Library on D date
            // X deleted Y on D date
        }
    })
    document.querySelector('.svg-display input').focus();
})
console.log(model)