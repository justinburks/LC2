// GET DATA
// RETURN DATA/CLASS
// EXPORT TO CONTROLLER
let list = [];
let model;

class SvgModel {
    constructor(list) {
        // CURRENT STATE
        this.clickedElement;
        // MAIN INDEX 
        // MAY BE REFACTORED HERE TO CREATE ASSOCIATIVE ARRAY
        this.elements = list;
        // CATEGORY OBJECT REFERENCES
        this.categorySet = [];
        this.categories = {};
    }
       // CREATES A SET OF CATEGORY NAMES
    createCategorySet() {
        this.elements.forEach(el => {
            if (!this.categorySet.includes(el[1])) {
                this.categorySet.push(el[1]);
            }
        });
        return this.categorySet;
    }
    // CHECKS ALL ELEMENT CATEGORY NAMES AND CREATES AN ARRAY FOR EACH INSIDE OF CATEGORY OBJECT
    createArrayForEachCategory() {
        this.categorySet.forEach(el => {
            // GIVE CATEGORY OBJECT A CORRESPONDING CATEGORY NAME
            this.categories[el] = {};
            let tmpArr = [];
            this.elements.forEach(index => {
                // tmpArr = [];
                if(index[1] == el) {
                    tmpArr.push(index);
                }
            });
            this.categories[el].elements = tmpArr;
            })
            return this.categories;
    }
    // ACCEPTS ARRAY AND CREATES A FRAGMENT
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

    appendFragmentToMainDashboard(arr, tab) {
        let newFrag = this.createFragmentFromArray(arr);
        let dashboard = document.querySelector('[data-role="dashboard"]');
        dashboard.innerHTML = '';
        dashboard.appendChild(newFrag);

        return this.setDashboardState(tab);
    }

    setDashboardState(tab) {
        let dashboard = document.querySelector('[data-role="dashboard"]');
        dashboard.dataset.tab = `${tab}`;
        return this.updateInterfaceHeaders(tab);
    }

    updateInterfaceHeaders(tab) {
        let interfaceHeader = document.querySelector('[data-role="interfaceHeader"]');
        // coerce tab parameter to string;
        interfaceHeader.innerText = `${tab.toUpperCase()}`;
        // set state for controller
    }

    setProps(obj,index) {
        // SET PROPERTIES
        let elementReference = index;
        obj.element = undefined;
        obj.mainIndex = this.elements.indexOf(elementReference);
        obj.categoryObjectReference = this.categories[obj.category];
        obj.categoryArray = obj.categoryObjectReference.elements;
        obj.categoryIndex = obj.categoryArray.indexOf(index);
        // CREATE A WRAPPER FRAGMENT
        return obj;
        
    }

    createIcon(obj,index) {
        // index = [name,category,{obj}]
        // obj = {name,category,markup}
        // CREATE REFERENCES
        // THIS CAN BE REPLACE WITH MODEL CLASS REFERENCE IN CONTROLLER
        this.setProps(obj,index);
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
            this.clickedElement = newIcon;
            let reference = Number(this.clickedElement.dataset.mainId);
            let mainIndexReference = this.elements[reference];
            let categoryObjectReference = this.categories[newIcon.dataset.category];
            let categoryArray = categoryObjectReference.elements;
            let categoryIndex = categoryArray.indexOf(index);
            // SET STATE

            // GET REFERENCES TO MAIN INDEX ON CLICK
            // let refs = props(newIcon,obj,index);
            const html = newIcon.innerHTML;
            const displayName = mainIndexReference[0].toString().replaceAll('_', ' ').toLowerCase();
            const displayCategory = mainIndexReference[1].toString().replaceAll('_', ' ');
            console.log('reading element data');
            // UPDATE ICON PREVIEW WIDGET WITH REFERENCES
            document.querySelector('.svg-interface .svg-display .svg-wrapper').innerHTML = html;
            document.querySelector('.svg-interface .svg-description .name').innerText = displayName;
            document.querySelector('.svg-interface .svg-description .category').innerText = displayCategory;
            document.querySelector('.svg-display .svg-wrapper').dataset.size="lg";
            console.log('updating widget' + '..... Name: ' + displayName + ', Category: ' + displayCategory);
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

    buildTabs() {
        let all = document.querySelector('[data-id="all"]');
        let tabSection = document.querySelector('[data-role="subMenu"][data-id="categories"]');
        let categorySection = document.createDocumentFragment();

        all.addEventListener('click', () => {
           this.appendFragmentToMainDashboard(this.elements, "all");
        });

        this.categorySet.forEach(category => {
            let listItem = document.createElement('li');
            let txt = category.charAt(0).toUpperCase() + category.slice(1);

            listItem.dataset.category = category;
            listItem.innerText = txt;
            listItem.addEventListener('click', (e) => {
                e.stopPropagation();
                this.appendFragmentToMainDashboard(this.categories[category].elements, category.toString())
            })
            categorySection.appendChild(listItem)
        })
        tabSection.innerHTML = '';
        tabSection.appendChild(categorySection);
    }

    load() {
        // create array for each category
        this.createCategorySet();
        this.createArrayForEachCategory();
            // create array for each collection (if)

        // build subMenu list item for each category
        this.buildTabs();    
        // start main dashboard loader Function
        // start preview loader function
        // get State
        
        // build main dashboard
        this.appendFragmentToMainDashboard(this.elements,"all")
        // open preview interface
        // set State
    }
}

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
            model.load();
            console.log('model ready');
        })

export { model };