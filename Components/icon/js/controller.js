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