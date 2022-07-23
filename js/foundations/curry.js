// -------------------------------------------------------------------------- //
// UNARY //
// ------------------------------ //
const addClassToElement = el => cls => `adding ${cls} to ${el}`;
const sameFunctionWithoutArrows = function (el){
    return function (cls) {
        el.classList.add(cls);
        return `adding ${cls} to ${el}`
    }
}
const addClassToBody = addClassToElement('body');
const updateBody = addClassToBody('.someClass');
const curriedManualy = addClassToElement('body')('.someClass');
// console.log(rememberBody);
var classes = ['.some','.list', '.of', '.classes'];

const addMultipleClassesToElement = el => arr => { 
    for (let i = 0; i < arr.length; i++) {
        el.classList.add(arr[i]);
        console.log(`adding ${arr[i]} to ${el}`);
    }
    return `setting data-state`
}
const sameWithoutArrows = function(el){
    return function(arr) {
        arr.filter(n => `adding ${n} to ${el}`)
    }
}
const addMultipleClassesToBody = addMultipleClassesToElement('body');
const sameButCurried = addMultipleClassesToElement('body')(classes);
console.log(addMultipleClassesToBody(classes));
// -------------------------------------------------------------------------- //
// BINARY //
// ------------------------------ //
function sameButUnary(el,cls) {
    if (typeof cls === 'object') {
        for (let i = 0; i < arr.length; i++) {
            el.classList.add(arr[i]);
            console.log(`adding ${arr[i]} to ${el}`);
        }
        return `setting data-state`
    }
    el.classList.add(cls);
    return `el updated`
}

const addToBody = (cls) => sameButBinary('body',cls);
const withoutArrows = function(cls) {
    return sameButBinary('body',cls)
}

// -------------------------------------------------------------------------- //
// CONTEXT //
// ------------------------------ //
// const multiply = (x, y) => x * y;

// const curriedMultiply = x => y => x * y;

// console.log(multiply(2, 4));
// console.log(curriedMultiply(2));
// console.log(curriedMultiply(2)(4));

// const timesTen = curriedMultiply(10);
// console.log(timesTen);
// console.log(timesTen(8))

// reduce(callbackToRunForCurrentValue,InitialValueForAccumulator)

// higher order functions from scratch?

// function copyArrayAndManipulate(array,instruction){
//     let output = [];
//     for (let i = 0; i < array.length; i++) {
//         output.push(instructions(array[i]));
//     }
//     return output;
// }

// function multiplyBy2(input){
//     return input * 2;
// }

// let result = copyArrayAndManipulate([1,2,3],multiplyBy2)