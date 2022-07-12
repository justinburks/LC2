const wrappers = [...document.querySelectorAll('.wrapper')];
const rows = [...document.querySelectorAll('.box')];
const canvas = document.querySelector('.canvas');

function constructGrid(canvas, points) {
    this.height = canvas.clientHeight;
    this.width = canvas.clientWidth;
    this.numberOfRows = height / points;
    this.numberOfCols = width / points;
    }


const userFunctionStore = {
    appendMultipleElements: function(numberofElements, parentEl, options = ['div','box']) {
        for (let i = 0; i <= numberofElements; i++) {
            let newElement = createNewElement(`${options[0]}`,`${options[1]}`);
            parentEl.appendChild(newElement);
        }
        return [...parentEl.children];
    },
    createNewElementfunction: function(type = 'div', cls = false, classlist = []) {
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
    },
    appendMultipleElementsToMultipleElements: function(list, numberofElements, args) {
     list.forEach(el => appendMultipleElements(numberofElements,el,args));
    }

}
const epointGrid = constructGrid(canvas, 8);

epointGrid.render();


function construct(canvas, points) {
let newGrid = {
    height: canvas.clientHeight,
    width: canvas.clientWidth,
    numberOfRows: function() {
        return canvas.clientHeight / points
    },
    numberOfCols: function() {
        return canvas.clientWidth / points
    },
    render: renderGrid = function() {
        const rows = appendMultipleElements(newGrid.numberOfRows(), canvas, ['div','box']);
        console.log(rows)
        appendMultipleElementsToMultipleElements(rows, newGrid.numberOfCols(), ['div','innerBox']); 
        return true; 
    },
}   
    console.log(newGrid)
    return newGrid;
}