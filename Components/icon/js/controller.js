// QUERY SELECTORS //

// the idea is querying the document with classes that won't change 
// manipulate the document by way of data-attributes that will change frequently
// also track state with data-attributes
// abstract most ui functionality away from the model layer
// control the ui from here
// only interaction with model is updating the main index(s) when adding/editing/removing/moving/copying elements
// or maybe export a class that extends the model
// create iterators and generators to tab through the application
// import {Model} from './model'

// controller.hello();

class Controls {
    constructor(referenceToModel,referenceToObserverObject) {
        // MODEL
        this.model = referenceToModel;
        // STATE
        this.state = referenceToObserverObject;
        // SELECTORS
        this.display = {
            wrapper: document.querySelector('.svg-interface'),
            defaultState: function() {
                let html = document.querySelector('.svg-interface').outerHTML;
                return html;
            },
            name: document.querySelector('.svg-interface .svg-description .name'),
            category: document.querySelector('.svg-interface .svg-description .category'),
                // ICON
            iContainer: document.querySelector('.svg-interface .svg-display'),
            // creates a new execution context in case element changes
            iWrapper: function() {
                let el = document.querySelector('.svg-display .svg-wrapper')
                return el;
            },  // OR AN OBJECT/GENERATOR THAT RETURNS [PREV/NEXT/CURRENT]
            icon: function() {
                let el = document.querySelector('.svg-display .svg-wrapper svg');
                return el;
            },           
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
        }
        this.sidebar = {
            searchBarWrapper: document.querySelector('.svg-search'),
            // SEARCH INPUT
            searchBar: document.querySelector('.svg-search .search-bar'),
            // SEARCH OUTPUT
            searchDashBoard: document.querySelector('.svg-dashboard__search'),
            // CLEAR
        },
        
        // MENU OBJECT
        this.menu = {
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
        this.wrapper = document.querySelector('.svg-dashboard');
    }
    sayHello(){
        console.log(`model ready, controller active`);
        console.log(this.model);
        console.log(this.state)
    }
    // PREVIEW INTERFACE METHODS
    nextPreviewElement(nxt){

    }
    prevPreviewElement(prv){

    }
    closePreviewInterface(state){

    }
        // EDIT FUNCTIONS
    editPreviewName(inp){
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
    }
    editPreviewCategory(inp){
        // take user input
        // rewrite category [attribute]
        // asynchronously sort/insert/move element to appropriate category
    }
    editPreviewElementSize(inp){

    }
    addPreviewElementToCollection(el){
        // open category selection interface
        // on select/unselect remove from collection(s) [index]
        // rewrite/add collection [attribute]
    }
    addElementToPreview(html,displayName,displayCategory,props) {
        this.display.iWrapper.innerHTML = html;
        this.display.name.innerText = displayName;
        this.display.category.innerText = displayCategory;
        this.display.iWrapper.dataset.size="lg";
        console.log('controller updating widget' + '..... Name: ' + displayName + ', Category: ' + displayCategory);
        console.log(`props = ${props}`)
        return props
    }
    // SIDEBAR METHODS
    emptySearchBar(){
        document.querySelector('.svg-search .searchBar').value = '';
        return null;
    }
    buildSearchBarDashboard(){

    }
    showSearchBarDashBoard() {

    }

    // NAVIGATION METHODS
    nextCategory(nxt){

    }
    prevCategory(prv){

    }
    nextCollection(){

    }
    prevCollection(){

    }
    // All --> Collections --> Categories
    nextSection(nxt){

    }
    prevSection(prv){

    }

    // DASHBOARD METHODS
    scrollToTopOfDashboard(){
        return document.querySelector('.svg-dashboard').scrollTo(0,0);
    }
    scrollToBottomOfDashboard(){
        let dashboardHeight = document.querySelector('.svg-dashboard').scrollHeight;
        return document.querySelector('.svg-dashboard').scrollTo(0,dashboardHeight);
    }
    sortDashboardByName(arr,direction){

    }
    sortDashboardByDate(arr,format){

    }
    sortDashboardByMostUsed(arr,indexOfCount){

    }


}

function q(str){
    return document.querySelector(str)
}
function qa(str){
    return document.querySelectorAll(str)
}
function test(){
    
}

    // DASHBOARD INTERFACE
const observer = function() {
    return {
        // get
            // set
                // return

        // STATE [menu --> dashboard --> display]
        lastElementClicked: model.clickedElement,
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

    }
}

// const controller = function() {
//     return {
//         // COORDINATE
//         // MAKE IT MAKE SENSE!
//     }
// }

export {Controls}