// because the list is created from elements that already exist in the document instead of from an api or json object
// problems may arise when adding or removing elements by way of querying the document
// use node to create a json object from the given filestructure and build the initial interface with that 

const icons = document.querySelectorAll('.svg-dashboard .svg-wrapper');

// class that expects html element with a data-name, and data-category
// can be altered to expect an object
// returns array containing [name,category, and an object containing a method that returns a new html element clone]

let createIconObject = function(element) {
    let icon = {};
    icon.markup = element.innerHTML;
    icon.name = element.dataset.name.replaceAll('_', ' ').toLowerCase();
    icon.category = element.dataset.category.replaceAll('_', ' ');
    icon.createIcon = function() {
        let el = document.createElement('div');
        el.dataset.category = this.category;
        el.dataset.name = this.name;
        el.dataset.role = 'svgWrapper';
        el.innerHTML = icon.markup;
        return el;
    }

    return [icon.name,icon.category,icon]
}

// expects a nodeList of html elements returned from querySelectorAll
// can be altered to expect an object if createIcon class is refactored first
// returns a data structure from createIcon constructor to an array for reference by referencing the nodelist passed
let createIndex = function(elementList){
    index = []
    elementList.forEach(el => {
        index.push(createIconObject(el))
    })
    return index;
}

// returns a set of unique values from an array based on the index passed
let createSet = function(arr,indexOfValue){
    let set = [];
    arr.forEach(el => {
        if (!set.includes(el[indexOfValue])) {
            set.push(el[indexOfValue]);
        }
    })
    return set;
}

// creates and returns an html element inside of a document fragment
// expects the individual element creator to be inside of an object at indexOf(2) for each index in the array passed
let createFragment = function(arr,id) {
    let wrapper = document.createElement('div');
    wrapper.dataset.id = id;
    wrapper.classList.add('svg-dashboard__wrapper', id);
    wrapper.dataset.state = 'hidden';
    arr.forEach(index => {
        // here
        element = index[2].createIcon();
        wrapper.appendChild(element)
    })
    let frag = document.createDocumentFragment();
    frag.append(wrapper);
    return frag;
}

let appendDashboard = function(frag, position=document) {
    position.appendChild(frag);
}

// copy array passed in and return a sorted version
let sortByName = function(arr) {
    let sortedByName = arr.slice().sort();
    return sortedByName;
}

// copy array passed in and return a document fragment of the sorted version
let sortedByNameFragment = function(arr,id){
    let fragment = sortByName(arr);
    return createFragment(fragment,id);
}

let categoryObjects = function(set,arr){
    let categoryHash = {};

    set.forEach(el => {
        categoryHash[el] = {};
        let collection = [];
        arr.forEach(index => {
            // collection = [];
            if(index[1] == el) {
                collection.push(index);
            }
        });
        categoryHash[el].elements = collection;
        // works but maybe created too soon, from a editing standpoint?
        categoryHash[el].fragments = {
            main: createFragment(categoryHash[el].elements,`${el}_dashboard`),
            byName: sortedByNameFragment(categoryHash[el].elements,`${el}byName_dashboard`)
        }
        })
    return categoryHash;
}

// this is defined when the program is compiled
let mainIndex = createIndex(icons);
let categorySet = createSet(mainIndex, 1);
// let collections = createSet(mainIndex, 2);


// TEST DATA STRUCTURE
// console.log(categoryObjects(categorySet,mainIndex));

let testModel = {
    elements: mainIndex, 
    fragments: {
        main: createFragment(mainIndex,'dashboard'),
        named: sortedByNameFragment(mainIndex,'dashboardByName'),
    },
    categories: categoryObjects(categorySet,mainIndex),
}


// copy element to clipboard
function copyElement(el) {
    if (!el.classlist.contains('svg-wrapper')) {
        console.log('element must be svg');
        return
    }
    window.navigator.clipboard.writeText(el.outerHTML)
}

function selectElement() {
    // add greyscale overlay
    // update state
    // toggle default animation
}

function changeName(name) {
    // update HTML -- innerText
    // update data-name="$name"
    // asynchronously update database/writeFileSync
}

function changeSize(size) {
    // display icon data-size="$size"
}

function changeCategory(category) {
    // update data-category="$category"
    // asynchronously update database
    // sort(update)
    // repaint onMenuClose() || onEdit()
}

function onMenuOpen([...selectedElements]) {
    // if nothing is selected "Select an Icon"

    // if one element is selected toggleDefaultAnimationOnClick
        // open single interface
    
    // if multiple Elements are selected deselectElementOnClick() 
        // open multi interface
            // [show first] [with slider functionality] --> option[show all]
    
    // if element is selected while menu open 
        // show recently selected [with slider functionality] --> option[show all]
}

function showOptionsOnHover() {
    // set timeout for 150ms then
        // show add to collection icon
            // quick addto dropdown menu
        // show open interface icon
        // show copy element icon
}

function buffer() {
    // current state
    // request animation frame
}

// document.querySelectorAll('.svg-dashboard .svg-wrapper').forEach(el => {
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
// }) 

// document.querySelectorAll('.sizes button').forEach(button => {
//     // x = button.dataset.size.toString();
//     // console.log(x)
//     button.addEventListener('click', () => {
//         const x = button.dataset.size.toString();
//         console.log(x);
//         changeDisplaySize(x);
//     });
// })

// document.querySelectorAll('.svg-navigation > ul > li[data-role="menu"').forEach(menu => (menu.addEventListener('click', () => {
//     menu.dataset.state="active"
//     document.querySelectorAll('.svg-navigation > ul > li[data-state="inactive"]').forEach(el => el.classList.add('hidden'));
//     let submenu = menu.querySelector('ul')
//     // RUN AS A KEYFRAME/RAF //
//     submenu.classList.remove('hidden');
//     submenu.dataset.state = 'show';
//     submenu.classList.add('visible');
//     document.querySelector('.close').classList.toggle('show');
// })))

// document.querySelector('.close').addEventListener('click', () => {
//     document.querySelectorAll('.svg-navigation > ul > li[data-role="menu"]').forEach(menu => {
//         document.querySelectorAll('[data-role="toggle"]').forEach(tggle => tggle.classList.remove('hidden'))
//         menu.dataset.state="inactive";
//         menu.classList.remove('hidden');
//         let submenu = menu.querySelector('ul');
//         // RUN AS A KEYFRAME/RAF //
//         submenu.classList.remove('visible');
//         submenu.dataset.state = 'hidden';
//         submenu.classList.add('hidden');
//         document.querySelector('.close').classList.toggle('show');
//     })
// })
// target svg-display svg-wrapper
// function changeDisplaySize(sz) {
//     const wrapper = document.querySelector('.svg-display .svg-wrapper');
//     const icon = document.querySelector('.svg.display .svg-wrapper svg');

//     // refactor
//     // modify stylesheet instead of inline style //

//     if (typeof sz === 'string') {
//     wrapper.dataset.size = `${sz}`;
//     return
//     }

//     if (typeof sz === 'number') {
//     icon.height = `${sz}px`
//     icon.width = `${sz}px`
//     wrapper.height = `${sz + 40}px`
//     wrapper.width = `${sz + 40}px`
//     return
//     }
// }

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
// // Filter Array By Search

// const searchDashboard = document.querySelector('.svg-dashboard__search');
// const defaultDashboard = document.querySelector('.svg-dashboard');
// const searchbar = document.querySelector('.search-bar');
// function toggleDashboards() {
//     defaultDashboard.classList.toggle('hide');
//     searchDashboard.classList.toggle('hide');
//     console.log('toggle successful')
// }

// searchbar.addEventListener('keyup', () => {
//     searchDashboard.innerHTML = '';
//     const txt = searchbar.value;
//     const reggie = new RegExp(txt);
//     const tmpArr = elements
//     .filter(el => el[0].match(reggie))
//     .map(el => { 
//         const a = document.createElement('div');
//         a.innerHTML = el[1];
//         searchDashboard.append(a)
//     })
//     console.log(searchDashboard)
//     if (searchDashboard.classList.contains('hide')) {
//         toggleDashboards();
//     }
// })

// searchbar.addEventListener('blur', () => {
//     toggleDashboards();
// })
// searchbar.addEventListener('focus', () => {
//     if (searchDashboard.classList.contains('hide') && searchbar.value != '') {
//         toggleDashboards();
//     }
//     searchDashboard.innerHTML = '';
//     const txt = searchbar.value;
//     const reggie = new RegExp(txt);
//     const tmpArr = elements
//     // implement as hashmap for performance
//     .filter(el => el[0].match(reggie))
//     .map(el => { 
//         const a = document.createElement('div');
//         a.innerHTML = el[1];
//         searchDashboard.append(a)
//     })
// })

        // END SEARCH //

        // SORT //

// categories = [];
// collections = [];
// icons.forEach(el => {
//     // loop through and find every category
//     let category = el.dataset.category;
//     if (categories.includes(category) == false) {
//         categories.push(category);
//         // add icon to category in one step?
//         console.log(category);
//     }
//     // if collections doesn't have the category push it.
//     // console.log(categories);
// })

// // create a category wrapper for each
// categories.forEach(cat => {
//     let wrapper = document.createElement('div');
//     wrapper.classList.add('svg-dashboard__category')
//     wrapper.dataset.role = "category-wrapper"
//     wrapper.dataset.category = `${cat}`
//     wrapper.style.display = 'none';
//     wrapper.innerHTML = `<span class="category-title">${cat.toUpperCase()}</span>`
//     document.body.appendChild(wrapper)
//     // console.log(wrapper);
// })

// // asynchronously //
// // notReady show loader + message
// // onReady succes message + append 
// // reduce each category to a single div containing every element with corresponding category

// icons.forEach(el => {
//     const markup = el.cloneNode(true);
//     // find which category element belongs to
//     const correspondingCategory = el.dataset.category;
//     let correspondingWrapper = document.querySelector(`.svg-dashboard__category[data-category="${correspondingCategory}"]`)
//     correspondingWrapper.appendChild(markup);
//     // console.log(correspondingWrapper);
// })

// repeat for collections

// sort by name
    
    // create a separate sorted div foreach? (dropfade - toggle)
// sort by date

        // END SORT //


/*
        // MULTIPLE SELECTION

    Listen for ctrl KeyDown
        -Add Event Emitter for each wrapper
        -On Click add to object of selected icons
        -Populate Interface For Each     
    End/Remove Event Emitter on Clickoutside of dashboard

    SHOW ONE SHOW ALL
        Add arguments to state management object (slider functionality)
            push arrgs to array in order as they are selected for slider to count

        if multiple args
            Show arrows
            Update Buttons and functionality
            check/update after each selection/deselection
*/