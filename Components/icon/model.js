// GET DATA
// RETURN DATA/CLASS
// EXPORT TO CONTROLLER
let list = [];
let model;

class SvgModel {
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

export { model };