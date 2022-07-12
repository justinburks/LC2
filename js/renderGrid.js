// PASS IMPORTS AND EXPORT SHADOW ELEMENT


const wrappers = [...document.querySelectorAll('.wrapper')];
const columns = [...document.querySelectorAll('.box')];
const rows = [...document.querySelectorAll('.box')];
const canvas = document.querySelector('.canvas');

// pixel || baseline
function constructGrid(parentEl, points) {

    let newGrid = {
        height: parentEl.clientHeight,
        width: parentEl.clientWidth,
        numberOfRows: function() {
            return parentEl.clientHeight / points
        },
        numberOfCols: function() {
            return parentEl.clientWidth / points
        },
        render: renderGrid = function() {
            const rows = appendMultipleElements(newGrid.numberOfRows(), parentEl, ['div','box']);
            console.log(rows)
            appendMultipleElementsToMultipleElements(rows, newGrid.numberOfCols(), ['div','innerBox']); 
            return true; 
        }   
    }
    console.log(newGrid)
    return newGrid;
}

function appendElement(x,y) {
    y.appendChild(x);
    return y.children;
}

function appendMultipleElements(numberofElements, parentEl, options = ['div','box']) {
    // arr = []
    // console.log(numberofElements);
    for (let i = 0; i <= numberofElements; i++) {
        let newElement = createNewElement(`${options[0]}`,`${options[1]}`);
        parentEl.appendChild(newElement);
    }
    // return parentEl;
    return [...parentEl.children];
    //  return arr;
}

function createNewElement(type = 'div', cls = false, classlist = []) {
    const element = document.createElement(`${type}`);
    if (cls) {
        element.classList.add(`${cls}`);
        // or throw error
    }
    if (classlist.length > 0) {
        element.classList.add(...classlist);
        // or throw error
    }
    return element;
}

function appendMultipleElementsToMultipleElements (list, numberofElements, args) {
     list.forEach(el => appendMultipleElements(numberofElements,el,args));
 }

const epointGrid = constructGrid(canvas, 8);
epointGrid.render();


/*  RECURSIVE SOLUTION

// appends child element to parent element
    function appendElement(x,y) {
        y.appendChild(x);
        return y.children;
    }

// creates empty div
    let renderElement = appendElement(createNewElement(),parentElement);

// appends x number of elements
    function appendMultipleElements(num,fn){
        let x = 1;
        function render(num,fn) {
            if(x < num) {
                fn();
                x++;
                render();
            }
            return true;
        }
    }

    appendMultipleElements(8,renderElement)

// appends multiple elements to multiple elements
    function appendMultiplesElementsToMultipleElements(list, num) {
        list.forEach(item => appendMultipleElements(num,createMultipleElements())
    }

    appendMultipleElementsToMultipleElements(columns, 8)
*/
