import { Model } from './js/model.js';
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

document.querySelector('.tab-right').addEventListener('click', () => {
    nextEl(Model.clickedElement);
})
document.querySelector('.tab-left').addEventListener('click', () => {
    prevEl(Model.clickedElement);
})

function nextEl(){
    console.log(Model.clickedElement)
    if (Model.clickedElement === undefined) {
        Model.clickedElement = document.querySelector('.svg-dashboard').firstElementChild;
    }
    if (Model.clickedElement.nextElementSibling === null) {
        Model.clickedElement = Model.clickedElement.parentElement.firstElementChild
    }
    let el = Model.clickedElement.nextElementSibling;
    // observer.lastElementClicked
    let ref = el.dataset.mainId;
    let elref = Model.elements[ref];
    const html = el.innerHTML;
    const displayName = elref[0].toString().replaceAll('_', ' ').toLowerCase();
    const displayCategory = elref[1].toString().replaceAll('_', ' ');
    document.querySelector('.svg-interface .svg-display .svg-wrapper').innerHTML = html;
    document.querySelector('.svg-interface .svg-description .name').innerText = displayName;
    document.querySelector('.svg-interface .svg-description .category').innerText = displayCategory;
    document.querySelector('.svg-display .svg-wrapper').dataset.size="lg";
    Model.clickedElement = el;
    console.log(el)
};

function prevEl(){
    // console.log(Model.clickedElement)
    if (Model.clickedElement === undefined) {
        Model.clickedElement = document.querySelector('.svg-dashboard').lastElementChild;
    }
    if (Model.clickedElement.nextElementSibling === null) {
        Model.clickedElement = Model.clickedElement.parentElement.lastElementChild
    }
    let el = Model.clickedElement.previousElementSibling;
    // observer.lastElementClicked
    let ref = el.dataset.mainId;
    let elref = Model.elements[ref];
    const html = el.innerHTML;
    const displayName = elref[0].replaceAll('_', ' ').toLowerCase();
    const displayCategory = elref[1].replaceAll('_', ' ');
    document.querySelector('.svg-interface .svg-display .svg-wrapper').innerHTML = html;
    document.querySelector('.svg-interface .svg-description .name').innerText = displayName;
    document.querySelector('.svg-interface .svg-description .category').innerText = displayCategory;
    document.querySelector('.svg-display .svg-wrapper').dataset.size="lg";
    Model.clickedElement = el;
};

// generator function to repeat
document.querySelector('.svg-display span.name').addEventListener('click', () => {
    // replace span with input
    let ref = Model.clickedElement.dataset.mainId;
    let elref = Model.elements[ref];
    console.log(elref[0]);
    let defaultState = document.querySelector('.svg-display span.name').innerHTML;
    let elementIndex = Model.elements[ref];
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
    document.querySelector('.svg-display input').addEventListener('blur', (e) => {
        document.querySelector('.svg-display span.name').innerHTML = defaultState
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
const header = document.querySelector('[data-role="interfaceHeader"]');
function toggleDashboards() {
    defaultDashboard.classList.toggle('hide');
    searchDashboard.classList.toggle('hide');
    console.log('toggle successful');
}

searchbar.addEventListener('keydown', () => {
    searchDashboard.innerHTML = '';
    const txt = searchbar.value;
    const reggie = new RegExp(txt);
    const tmpArr = Model.elements
        .filter(el => el[0].match(reggie))
            .map(el => { 
                let ele = Model.createIcon(el[2])
                searchDashboard.append(ele)
            })

        if (searchDashboard.classList.contains('hide')) {
            toggleDashboards();
        }
})

// add click outside modal instead of blur

searchbar.addEventListener('blur', () => {
    toggleDashboards();
    searchbar.value = '';
    header.style.opacity = .8;
})

searchbar.addEventListener('focus', () => {
    if (searchDashboard.classList.contains('hide') && searchbar.value != '') {
        toggleDashboards();
    }
    if (header.style.opacity !== 0) {
        header.style.opacity = 0;
    }
    searchDashboard.innerHTML = '';
    const txt = searchbar.value;
    const reggie = new RegExp(txt);
    const tmpArr = Model.elements
    // implement as hashmap for performance
    .filter(el => el[0].match(reggie))
    .map(el => { 
        let ele = Model.createIcon(el[2]);
        ele.addEventListener('click')
        searchDashboard.append(ele);
    })
})

console.log(Model)