// GET DATA
// RETURN DATA/CLASS
// EXPORT TO CONTROLLER

export class SvgModel {
    constructor(list) {
        this.elements = list
        let ref = this.elements;
        let clickedElement;
        // list.forEach(el => {
        //        ref.push(elementConstructor(el))
        // });
        this.categorySet = [];
        let cat = this.categorySet;
        ref.forEach(el => {
            if (!cat.includes(el[1])) {
                cat.push(el[1]);
            }
        });
        this.categories = {};
            cat.forEach(el => {
                this.categories[el] = {};
                let collection = [];
                ref.forEach(index => {
                    // collection = [];
                    if(index[1] == el) {
                        collection.push(index);
                    }
                });
                this.categories[el].elements = collection;
                })

    }

    // creatIndex() {
    //     return [a, b, {}]
    // }

    createIcon(obj,index) {
        let a = this.categories[obj.category];
        let b = a.elements
        let el = document.createElement('div');
        el.dataset.mainId = this.elements.indexOf(index);
        el.dataset.categoryId = b.indexOf(index);
        el.dataset.category = obj.category;
        el.dataset.name = obj.name;
        el.dataset.role = 'svgWrapper';
        el.dataset.size= "sm"
        el.classList.add('svg-wrapper')
        el.innerHTML = obj.markup;

    
        el.addEventListener('click', () => {
            this.clickedElement = el;
            let ref = this.clickedElement.dataset.mainId;
            let elref = this.elements[ref];
            const html = el.innerHTML;
            const displayName = elref[0].toString().replaceAll('_', ' ').toLowerCase();
            const displayCategory = elref[1].toString().replaceAll('_', ' ');
            let a = Number(el.dataset.mainId);
            let b = Number(el.dataset.categoryId)
            let c = this.categories[el.dataset.category]
            console.log(a)
            console.log(b)
            console.log("main index reference:  " + this.elements[a]); // main index reference
            console.log("prev element reference (category):  " + c.elements[b-1]);// prev element reference
            console.log("this element reference (category):  " + c.elements[b]);// this element reference (in category)
            console.log("next element reference (category):  " + c.elements[b + 1]);// next element reference
            console.log(a,b,b+1)
            // this.clicked.mainIndex
            // add reference to the array it came from (obj)
            // el.dataset.state=ref
            document.querySelector('.svg-interface .svg-display .svg-wrapper').innerHTML = html;
            document.querySelector('.svg-interface .svg-description .name').innerText = displayName;
            document.querySelector('.svg-interface .svg-description .category').innerText = displayCategory;
            document.querySelector('.svg-display .svg-wrapper').dataset.size="lg";
        })
        el.addEventListener('dblclick', () => {
            const element = el.outerHTML;
            window.navigator.clipboard.writeText(element);
            // show highlight green (fade-in-out) overlay
        })
        return el;
    }

    build() {
    let frag = document.createDocumentFragment()
        this.elements.forEach(el => {
            frag.appendChild(this.createIcon(el[2],el))
        })
    document.querySelector('.svg-dashboard').appendChild(frag);
    }

    buildTabs() {
        let all = document.querySelector('[data-id="all"]');
        let dashboard = document.querySelector('.svg-dashboard');
        let allFrag = document.createDocumentFragment();
        all.addEventListener('click', () => {
            this.elements
                .forEach(el => {
                    allFrag.appendChild(this.createIcon(el[2],el));
            })
           dashboard.dataset.state="all"
           dashboard.dataset.tab="all"
           dashboard.innerHTML = ''
           dashboard.appendChild(allFrag);
        })
        let tabSection = document.querySelector('[data-role="subMenu"][data-id="categories');
        let catFrag = document.createDocumentFragment();
        console.log(this.categorySet)
        this.categorySet.forEach(a => {
            let b = document.createElement('li');
            b.dataset.category = a;
            let txt = a.charAt(0).toUpperCase() + a.slice(1);
            b.innerText = txt;
            b.addEventListener('click', (e) => {
                e.stopPropagation();
                dashboard.dataset.state=`${b.dataset.category}`;
                dashboard.dataset.tab="categories"
                let frag = document.createDocumentFragment();
                this.categories[a].elements.forEach(el => {
                    frag.appendChild(this.createIcon(el[2],el));
                })
                dashboard.innerHTML = '';
                dashboard.appendChild(frag);
            })
            catFrag.appendChild(b)
        })
        console.log(catFrag);
        tabSection.innerHTML = '';
        tabSection.appendChild(catFrag)
    }
}

// export const model = new SvgModel(icons,createIconObject);
// console.log(createFragment(mainIndex,'dashboard'));
// console.log(sortedByNameFragment(mainIndex,'dashboardByName'));
// console.log(categories);


    // CLASS REFACTOR //
    
/*

    SVG Model Interface 

        Instance Properties =>  {

            mainIndex: {
                indexes: {
                    main: []
                    byName: []
                    byDate: []
                    mostUsed: []
                }
                fragments: {

                }
                state: {
                    wrapper: string
                    elements: []
                    elementCount: int
                    stackTrace: [root => parent => parentSiblings[] => siblings[]]
                    currentState: [visible,hidden]
                }
            }
            
            Categories: {
                weather: {
                    indexes: {
                        main: []
                        byName: []
                        byDate: []
                        mostUsed: []
                    }
                    fragments: {
                        
                    }
                    state: {
                        wrapper: string
                        elements: []
                        elementCount: int
                        stackTrace: [root => parent => parentSiblings[] => siblings[]]
                        currentState: [visible,hidden]
                    }
                }
                arrows: {
                    indexes: {
                        main: []
                        byName: []
                        byDate: []
                        mostUsed: []
                    }
                    fragments: {
                        
                    }
                    state: {
                        wrapper: string
                        elements: []
                        elementCount: int
                        stackTrace: [root => parent => parentSiblings[] => siblings[]]
                        currentState: [visible,hidden]
                    }
                }
                software: {
                    indexes: {
                        main: []
                        byName: []
                        byDate: []
                        mostUsed: []
                    }
                    fragments: {
                        
                    }
                    state: {
                        wrapper: string
                        elements: []
                        elementCount: int
                        stackTrace: [root => parent => parentSiblings[] => siblings[]]
                        currentState: [visible,hidden]
                    }
                }
            
            Collections: {
                mostUsed: {
                    indexes: {
                        main: []
                        byName: []
                        byDate: []
                        mostUsed: []
                    }
                    fragments: {
                        
                    }
                    state: {
                        wrapper: string
                        elements: []
                        elementCount: int
                        stackTrace: [root => parent => parentSiblings[] => siblings[]]
                        currentState: [visible,hidden]
                    }
                }
                newProject: {
                    indexes: {
                        main: []
                        byName: []
                        byDate: []
                        mostUsed: []
                    }
                    fragments: {
                        
                    }
                    state: {
                        wrapper: string
                        elements: []
                        elementCount: int
                        stackTrace: [root => parent => parentSiblings[] => siblings[]]
                        currentState: [visible,hidden]
                    }
                }
                project2: {
                    indexes: {
                        main: []
                        byName: []
                        byDate: []
                        mostUsed: []
                    }
                    fragments: {
                        
                    }
                    state: {
                        wrapper: string
                        elements: []
                        elementCount: int
                        stackTrace: [root => parent => parentSiblings[] => siblings[]]
                        next: wrapper.nextElementSibling
                        prev: wrapper.previousElementSibling
                        currentState: [visible,hidden]
                    }
                }
        }
*/

/*
        Instance Methods
    
    Sort Index => {
        // accept object->index && method 
                --> pass object->index to method
                    --> return sorted copy to controller
        byName => {}
        byDate => {}
        byMostUsed => {}
    }

    Read Index => {
        append elements from array into wrapper
        return fragment to controller when called
            ?? or should you just return appropriate index and let the controller build fragments and elements
    }

    Update Index(s) => {
        removeElement(s) => {
            // remove all instances from entire document
            // remove all instances from entire model
        }
        insertElement(s) => {
            // push element to main index
            // instertElementAt(corresponding index(s))
        }
        insertElementAt => {
            // push to corresponding index(s)
            // index.sort(
                .splice(
                    .insertBefore()
                    )
                )
        }
        removeElementFrom => {
            document.remove(from)
            index = index.filter(
            )
        }
    }

*/
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