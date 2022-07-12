
import { model } from './model.js';
// import { widget,menu,dashboard } from './controller.js';



                // -----------> WIDGET FUNCTIONALITY <------------ //
document.querySelectorAll('.sizes button')
 .forEach(button => {
    button.addEventListener('click', () => {
        changeDisplaySize(button.dataset.size.toString());
    });
})

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






                    // ---------> MENU FUNCTIONALITY <------------- //
document.querySelectorAll('.svg-navigation > ul > li[data-role="menu"]')
 .forEach(menu => (
    menu.addEventListener('click', () => {
        menu.dataset.state="active";
        document.querySelectorAll('.svg-navigation > ul > li[data-state="inactive"]')
            .forEach(el => el.classList.add('hidden'));
                let submenu = menu.querySelector('ul');
                // RUN AS A KEYFRAME/RAF //
                submenu.classList.remove('hidden');
                submenu.dataset.state = 'show';
                submenu.classList.add('visible');
                menu.querySelector('.close').classList.toggle('show');
    })))

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
                })

    }));




                // ---------------> SEARCH FUNCTIONALITY <----------------- //
const searchDashboard = document.querySelector('.svg-dashboard__search');
const defaultDashboard = document.querySelector('.svg-dashboard');
const searchbar = document.querySelector('.search-bar');
function toggleDashboards() {
    defaultDashboard.classList.toggle('hide');
    searchDashboard.classList.toggle('hide');
    console.log('toggle successful');
}

searchbar.addEventListener('keyup', () => {
    searchDashboard.innerHTML = '';
    const txt = searchbar.value;
    const reggie = new RegExp(txt);
    const tmpArr = model.elements
        .filter(el => el[0].match(reggie))
            .map(el => { 
                let ele = model.createIcon(el[2])
                searchDashboard.append(ele)
            })

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
    const tmpArr = model.elements
    // implement as hashmap for performance
    .filter(el => el[0].match(reggie))
    .map(el => { 
        let ele = model.createIcon(el[2])
        searchDashboard.append(ele)
    })
})

console.log(model)