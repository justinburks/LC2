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


// build tab onDemand then click through existing
class Controls {
    constructor(referenceToModel,referenceToObserverObject) {
        // MODEL
        this.model = referenceToModel;
        // STATE
        this.observer = referenceToObserverObject;
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
        console.log(this.observer)
    }
    
    // PREVIEW INTERFACE METHODS
    changeDisplaySize(sz) {
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
    changeDisplayName(containerElement){
        let referenceNumberToClickedElement = this.observer.state.clickedElement.dataset.mainId;
        let databaseReference = this.model.elements[referenceNumberToClickedElement];
        let defaultState = containerElement.innerHTML;
    
        function ifEnterChangeValue(keyPressed,input,elementToChange) {
            if(keyPressed === 'Enter') {
                let value = input
                elementToChange.innerHTML = value;
                databaseReference.splice(0,1,value);
            }
        }
        containerElement.innerHTML = `<input class="name-input" data-role="nameChanger" type="text">`;
        let displayNameInput = document.querySelector('[data-role="nameChanger');
        displayNameInput.addEventListener('keyup', (e) => { ifEnterChangeValue(e.key,e.target.value,containerElement) });
        displayNameInput.addEventListener('blur', (e) => { containerElement.innerHTML = defaultState});
        displayNameInput.focus();
    }
    nextPreviewElement(){
        if (this.observer.state.clickedElement === undefined || this.observer.state.next === null ) {
            var el = document.querySelector('.svg-dashboard').firstElementChild
        } else {
            var el = this.observer.state.next;
        }
        // observer.lastElementClicked
        this.updatePreview(el);
    }
    prevPreviewElement(){
        if (this.observer.state.clickedElement === undefined || this.observer.state.prev === null ) {
            var el = document.querySelector('.svg-dashboard').lastElementChild
        } else {
            var el = this.observer.state.prev;
        }
        // observer.lastElementClicked
        this.updatePreview(el);
    }
    updatePreview(el) {
        let ref = el.dataset.mainId;
        let elref = this.model.elements[ref];
        const html = el.innerHTML;
        const displayName = elref[0].replaceAll('_', ' ').toLowerCase();
        const displayCategory = elref[1].replaceAll('_', ' ');
        document.querySelector('.svg-interface .svg-display .svg-wrapper').innerHTML = html;
        document.querySelector('.svg-interface .svg-description .name').innerText = displayName;
        document.querySelector('.svg-interface .svg-description .category').innerText = displayCategory;
        document.querySelector('.svg-display .svg-wrapper').dataset.size="lg";
        this.observer.setState(el);
        return el;
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
    toggleMenuElement(menuElement) {
        menuElement.dataset.state="active";
        document.querySelectorAll('.svg-navigation > ul > li[data-state="inactive"]')
            .forEach(el => el.classList.add('hidden'));
                let submenu = menuElement.querySelector('ul');
                // RUN AS A KEYFRAME/RAF //
                submenu.classList.remove('hidden');
                submenu.dataset.state = 'show';
                submenu.classList.add('visible');
                menuElement.querySelector('.close').classList.toggle('show');
    }
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
    appendFragmentToMainDashboard(arr, tab) {
        let newFrag = this.createFragmentFromArray(arr);
        let dashboard = document.querySelector('[data-role="dashboard"]');
        dashboard.innerHTML = '';
        dashboard.appendChild(newFrag);

        return this.setDashboardState(tab);
    }

    // CREATIONAL METHODS
    createIcon(obj,index) {
        // index = [name,category,{obj}]
        // obj = {name,category,markup}
        // CREATE REFERENCES
        // THIS CAN BE REPLACE WITH Model CLASS REFERENCE IN CONTROLLER
        this.model.setProps(obj,index);
        // console.log(obj)
        // CREATE NEW ELEMENT
        let newIcon = document.createElement('div');

        // ADD DATA ATTRIBUTES FOR REFERENCE
        newIcon.dataset.mainId = obj.mainIndex;

        newIcon.dataset.categoryId = obj.categoryIndex;
        newIcon.dataset.category = obj.category;
        newIcon.dataset.name = obj.name;
        newIcon.dataset.role = 'svgWrapper';
        newIcon.dataset.size= "sm";
        
        // ADD CLASSES FOR DEFAULT STYLES
        newIcon.classList.add('svg-wrapper');
        newIcon.innerHTML = obj.markup;
        obj.element = newIcon;
        // ADD CLICK LISTENER
        // HANDOFF TO CONTROLLER
        newIcon.addEventListener('click', () => {
            // CONTROLLER.UPDATEPREVIEW([...semantics]);
            // STATE VARIABLES;
                    // [PREVIOUS ELEMENT,CLICKED/CURRENT ELEMENT,NEXT ELEMENT]
                    // STATE PROPERTIES {ELEMENT, MAIN INDEX REFERENCE, CATEGORY, CATEGORY INDEX REFERENCE}       
            
            this.updatePreview(newIcon);
            let reference = Number(this.observer.getClickedElement().dataset.mainId);
            let mainIndexReference = this.model.elements[reference];
            let categoryObjectReference = this.model.categories[newIcon.dataset.category];
            let categoryArray = categoryObjectReference.elements;
            let categoryIndex = categoryArray.indexOf(index);
            // SET STATE
            
            // GET REFERENCES TO MAIN INDEX ON CLICK
            // let refs = props(newIcon,obj,index);
            console.log('reading element data');
            // controller.addElementToPreview(html,displayName,displayCategory,props);
            // console.log(html)
            // console.log([...refs]);
            console.log(`Setting Controller State: { Element: ${newIcon}, Index: ${reference}, Category: ${categoryObjectReference}, Index: ${categoryIndex} }`);
            // return CONTROLLER.SETSTATE([...refs]);
        })
        // COPY ELEMENT TO CLIPBOARD
        newIcon.addEventListener('dblclick', () => {
            const element = newIcon.innerHTML;
            window.navigator.clipboard.writeText(element);
            CONTROLLER.SHOWCOPIEDANIMATION(newIcon)
            // show highlight green (fade-in-out) overlay
        })
        return newIcon
    }
    createFragmentFromArray(arr) {
        // indexFormat [name,category,{properties}]
        let frag = document.createDocumentFragment();
        // create icon for each element in array
        arr.forEach(el => {
            let elementArray = el;
            let elementPropertiesObject = el[2];
            let newIcon = this.createIcon(elementPropertiesObject, elementArray); 
            frag.appendChild(newIcon)
        })
        return frag;
    }
    setDashboardState(tab) {
        let dashboard = document.querySelector('[data-role="dashboard"]');
        dashboard.dataset.tab = `${tab}`;
        return this.updateInterfaceHeaders(tab);
    }
    updateInterfaceHeaders(tab) {
        let interfaceHeader = document.querySelector('[data-role="interfaceHeader"]');
        let el = document.querySelector(`[data-tab="${tab}"]`).firstElementChild;
        // coerce tab parameter to string;
        interfaceHeader.innerText = `${tab.toUpperCase()}`;
        // set state for controller
        return this.observer.setState(undefined);
    }
    buildTabs() {
        let all = document.querySelector('[data-id="all"]');
        let tabSection = document.querySelector('[data-role="subMenu"][data-id="categories"]');
        let categorySection = document.createDocumentFragment();

        all.addEventListener('click', () => {
           this.appendFragmentToMainDashboard(this.model.elements, "all");
        });

        this.model.categorySet.forEach(category => {
            let listItem = document.createElement('li');
            let txt = category.charAt(0).toUpperCase() + category.slice(1);

            listItem.dataset.category = category;
            listItem.innerText = txt;
            listItem.addEventListener('click', (e) => {
                e.stopPropagation();
                this.appendFragmentToMainDashboard(this.model.categories[category].elements, category.toString())
            })
            categorySection.appendChild(listItem)
        })
        tabSection.innerHTML = '';
        tabSection.appendChild(categorySection);
    }

    load() {
        // create array for each category
        this.model.createCategorySet();
        this.model.createArrayForEachCategory();
            // create array for each collection (if)

        // build subMenu list item for each category
        this.buildTabs();    
        // start main dashboard loader Function
        // start preview loader function
        // get State
        
        // build main dashboard
        this.appendFragmentToMainDashboard(this.model.elements,"all")
        // open preview interface
        // set State
    }
}

function q(str){
    return document.querySelector(str)
}
function qa(str){
    return document.querySelectorAll(str)
}

export {Controls}