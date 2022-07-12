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

/* Controller using callbacks

// QUERY SELECTORS //

// the idea is querying the document with classes that won't change 
// manipulate the document by way of data-attributes that will change frequently
// also track state with data-attributes
// abstract most ui functionality away from the model layer
// control the ui from here
// only interaction with model is updating the main index(s) when adding/editing/removing/moving/copying elements
// or maybe export a class that extends the model
// create iterators and generators to tab through the application

function q(str){
    return document.querySelector(str)
}
function qa(str){
    return document.querySelectorAll(str)
}
    // PREVIEW INTERFACE
const display = function(){
    return {
        // SELECTORS
        wrapper: document.querySelector('.svg-interface'),
        defaultState: document.querySelector('.svg-interface').outerHTML,
        name: document.querySelector('.svg-interface .svg-description .name'),
        category: document.querySelector('.svg-interface .svg-description .category'),
            // ICON
        iContainer: document.querySelector('.svg-interface .svg-display'), // REWRITE AS FUNCTION THAT RETURNS CURRENT ELEMENT
        iWrapper: document.querySelector('.svg-display .svg-wrapper'),  // OR AN OBJECT/GENERATOR THAT RETURNS [PREV/NEXT/CURRENT]
        icon: document.querySelector('.svg-display .svg-wrapper svg'),           
            // COPY/SAVE
        btnCopy: document.querySelector('.svg-interface .svg-map .btn-clipboard'),
        btnSave: document.querySelector('.svg-interface .svg-map .btn-save'),
            // ADD TO COLLECTION
        a2c: document.querySelector('.svg-interface .svg-map .a2c'),
            // NAVIGATION
        btnClose: document.querySelector('.svg-interface .btn-close__menu'),
        btnNext: null,
        btnPrev: null,
            // SIZES
        btnSm: document.querySelector('.svg-interface .sizes .small-button'),
        btnMd: document.querySelector('.svg-interface .sizes .medium-button'),
        btnLg: document.querySelector('.svg-interface .sizes .large-button'),
        btnSz: document.querySelector('.svg-interface .sizes .custom--size-button'),

        // NAVIGATION FUNCTIONS
        nextEl(nxt){

        },
        prevEl(prv){

        },
        closeInterface(state){

        },
        // EDIT FUNCTIONS
        editName: function(inp){
            // take user input
                // click --> show input sillouette --> value = textcontent -->
                // firstKeyDown --> value = ''
            // rewrite name
                // on enter --> save name
            // asynchronously sort/insert/move element position

            // WHERE X < N && X > N-1 
            // INSERT BEFORE N.ELEMENT 
                // MAY NEED TO REFACTOR DATASTRUCTURE FOR PERFOMANCE? or CREATE BINARY SEARCH ALGORITHM
                // OR MAYBE PUSH THEN RE-SORT ON COMMAND? 
            
        },
        editCategory: function(inp){
            // take user input
            // rewrite category [attribute]
            // asynchronously sort/insert/move element to appropriate category
        },
        editSize: function(inp){

        },
        addToCollection: function(el){
            // open category selection interface
            // on select/unselect remove from collection(s) [index]
            // rewrite/add collection [attribute]
        }
    }
}();



    // SIDEBAR NAVIGATION
const sidebar = function(){
    return {
        // SEARCH WRAPPER
        searchBarWrapper: document.querySelector('.svg-search'),

        // SEARCH INPUT
        searchBar: document.querySelector('.svg-search .search-bar'),
        // SEARCH OUTPUT
        searchDashBoard: document.querySelector('.svg-dashboard__search'),
        // CLEAR
        emptySearchBar: function (){
            document.querySelector('.svg-search .searchBar').value = '';
            return null;
        },

        // MENU OBJECT
        menu: {
            // MAIN MENU
            mainMenu: null,
            // MAIN DASHBOARD MENU ITEM
            all: document.querySelector('[data-role="toggle"][data-id="all"]'),
            // CATEGORIES OBJECT
            categories: {
                // CATEGORIES DASHBOARD MENU ITEM
                element: document.querySelector('[data-role="menu"][data-id="categories"]'),
                // CATEGORIES SUBMENU OBJECT
                subMenu: {
                    // CATEGORIES SUBMENU
                    element: document.querySelector('[data-role="subMenu"][data-id="categories"]'),
                    // RETURNS ALL MENU ITEMS
                    children: [...document.querySelectorAll('[data-role="submenu"][data-id="categories"] li')],
                    // RETURNS NUMBER OF CATEGORIES
                    count: [...document.querySelectorAll('[data-role="submenu"][data-id="categories"] li')].length,
                    // CLOSE MENU
                    close: document.querySelector('[data-role="menu"][data-id="categories"] span.close'),
                }
            },
            // COLLECTIONS OBJECT
            collections: {
                // COLLECTIONS DASHBOARD MENU ITEM
                element: document.querySelector('[data-role="menu"][data-id="collections"]'),
                // COLLECTIONS SUBMENU
                subMenu: {
                    // COLLECTIONS SUBMENU
                    element: document.querySelector('[data-role="subMenu"][data-id="collections"]'),
                    // RETURNS ALL MENU ITEMS
                    children: [...document.querySelectorAll('[data-role="submenu"][data-id="collections"] li')],
                    // RETURNS NUMBER OF COLLECTIONS
                    count: [...document.querySelectorAll('[data-role="submenu"][data-id="collections"] li')].length,
                    // CLOSE MENU
                    close: document.querySelector('[data-role="menu"][data-id="collections"] span.close'),
                }
            },
        },

        // MENU FUNCTIONALITY
        // STATIC METHODS?
        nextTab: function(nxt){

        },
        prevTab: function(prv){

        },
        nextSection: function(nxt){

        },
        prevSection: function(prv){

        },
    }
}();

    // DASHBOARD INTERFACE
const dashboard = function(){
    return {
        // MAIN WRAPPER
        wrapper: document.querySelector('.svg-dashboard'),
        // SCROLL TO
        top: function(){
            return document.querySelector('.svg-dashboard').scrollTo(0,0);
        },
        bottom: function(){
            return document.querySelector('.svg-dashboard').scrollTo(0,document.querySelector('.svg-dashboard').scrollHeight);
        },
        // SORT MENU
        sortMenu: document.querySelector('.sort-menu'),
        // SHOW/HIDE SCROLLBAR
        // scrollBar: null,
        // scrollGutter: null,
        // thumb: null,
        
        // STATE
        currentTab: function(){
            console.log(document.querySelector('.svg-dashboard').dataset.tab)
        },
        currentState: function(){
            console.log(document.querySelector('.svg-dashboard').dataset.state)
        },
        
        currentTabName: null,
        // iterators & generators
        nextTab: null,
        prevTab: null,
        btnNext: null,
        btnBack: null,

        // SORT METHODS
        byName: function(){

        },
        byDate: function(ref){

        },
        byMostUsed: function(){

        },
    }
}();

const observer = function() {
    return {
        // get
            // set
                // return

        // STATE [menu --> dashboard --> display]
        lastElementClicked: model.clickedElement,
    }
}

const controller = function() {
    return {
        // COORDINATE
        // MAKE IT MAKE SENSE!
    }
}

    // DataSets
function getDataState(el,arg){
    if(arg){
         el.dataset.state = arg;
    }
    return el.dataset.state
}
function getDataRole(el,arg){
    if(arg){
         el.dataset.role = arg;
    }
    return el.dataset.role
}
function getDataName(el,arg){
    if(arg){
         el.dataset.name = arg;
    }
    return el.dataset.name
}
function getDataSize(el,arg){
    if(arg){
         el.dataset.size = arg;
    }
    return el.dataset.size
}
function getDataId(el,arg){
    if(arg){
         el.dataset.id = arg;
    }
    return el.dataset.id
}
function getDataCategory(el,arg){
    if(arg){
         el.dataset.category = arg;
    }
    return el.dataset.category
}

var size = getDataSize;
var state = getDataState;
var dName = getDataName;
var role = getDataRole;
var id = getDataId;
var category = getDataCategory;

// KEYFRAMES



// HELPER FUNCTIONS
function searchValue(){
    return document.querySelector('.svg-search .search-bar').value;
}

function wipeElement(el){
    let frag = document.createDocumentFragment();
    frag.appendChild(el.cloneNode());
    el.innerHTML = '';
    return frag;
}

// danger
const moveElement = function(el,parentElement){
   return parentElement.appendChild(wipeElement(el));
}

const copyElement = function(el,parentElement,deep=false){
       return parentElement.appendChild(el.cloneNode(deep))
}

function tggle(el,cls){
    el.classList.toggle(cls);
    return el;
}
function addClass(el,[...cls]){
    el.classList.add(...cls);
    return el;
}
function removeClass(el,[...cls]){
    el.classList.remove(...cls);
    return el;
}
function checkClass(el,cls){
    el.classList.contains(cls) ? true : false;
}
function ifClassThen(el,cls,cb){
    if (el.classList.contains(cls)){
        cb();
        return el;
    } else 
        return el;
}
function onClick(el,cb,opt=false,bubbles=false){
    if(bubbles){
        el.addEventListener('click', function(e){
            e.stopPropigation;
            cb();
        })
        return el;
    }
    el.addEventListener('click',cb,opt);
    return el
}

function removeClick(el, cb,opt=true){
    el.removeEventListener('click',cb,opt);
    return el
}

function onHover(el,cb,opt=true,bubbles=false){
    if(bubbles){
        el.addEventListener('mouseover', function(e){
            e.stopPropigation;
            cb();
        })
        return el
    }
    el.addEventListener('mouseover',cb,opt)
}

function onMouseOut(el,cb,opt=true,bubbles=false){
    if(bubbles){
        el.addEventListener('', function(e){
            e.stopPropigation;
            cb();
        })
        return el
    }
    el.addEventListener('mouseleave',cb,opt)
}

*/