// add class for button controls
// next current prev does what?
/* 
    logic: 
    If .component has class of open/current --translate 0
    use array of data attributes to track position

        onclick .btn-next 
            if first position / last position then what?
                {
                    All Classes 
                }
            else {
            this position add class of prev
            data-position[this +1] add class of open/current

        if this class =current loop through all components if data-position > than this.position add class of next..
        if data-position is < this position add class of prev.
*/
// document.querySelector('.btn-next').addEventListener('click', () => {
//     shiftLeft();
// })

let btn_next = document.querySelector('.btn-next');
let btn_prev = document.querySelector('.btn-prev');

let components = [...document.querySelectorAll('.component')];

// grab elements by position

let nextEl, currentEl, prevEl;

let position = 0;

function next() {
    if (position >= components.length - 1) {
        return 0;
    }
    return position + 1;
}

function prev() {
    if (position == 0) {
        return components.length - 1;
    } else if (position < 0) {
        position = components.length - 1;
        currentEl = document.querySelector(`[data-position='${components.length - 1}']`);
        nextEl = document.querySelector(`[data-position='0']`)
        return components.length - 2;
    }

    return position - 1;
}

function getPosition() {
    if (position > components.length - 1){
        position = 0;
        return 0;
    }
    
    return position;
}

function updatePosition() {
    currentEl = document.querySelector(`[data-position='${getPosition()}']`);
    nextEl = document.querySelector(`[data-position='${next()}']`);
    // position++;
    // let prev = position - 1;
    // } else if (prev < 0) {
    //     position = components.length;
    // }
    prevEl = document.querySelector(`[data-position='${prev()}']`);

}

function shiftLeft(el, el2) {

    // fade out current element by removing all classes
    el.classList.remove('open');
    el.classList.remove('current');
    el.classList.remove('next');
    el.classList.remove('next-shift');
    el.classList.remove('prev');
    el.classList.remove('prev-shift')

    // bring in next element by adding next to position it -- next shift to fade in -- and current to track position
    el2.classList.add('next');
    el2.classList.add('next-shift');
    el2.classList.add('current');
    el2.classList.add('open');

};
function shiftRight(el, el2) {

    // fade out current element by removing all classes
    el.classList.remove('open');
    el.classList.remove('current');
    el.classList.remove('next');
    el.classList.remove('next-shift');
    el.classList.remove('prev');
    el.classList.remove('prev-shift')

    // bring in next element by adding next to position it -- next shift to fade in -- and current to track position
    el2.classList.add('prev');
    el2.classList.add('prev-shift');
    el2.classList.add('current');
    el2.classList.add('open');

};


function toggleNext() {
    shiftLeft(currentEl, nextEl);
    position++;
    updatePosition();
    console.log(position)
    console.log(prevEl,currentEl,nextEl)
}
function togglePrev() {
    shiftRight(currentEl, prevEl);
    position--;
    updatePosition();
    console.log(position)
    console.log(prevEl, currentEl, nextEl)
}

updatePosition();
console.log(prevEl,currentEl,nextEl)
btn_next.addEventListener('click', toggleNext)

btn_prev.addEventListener('click', togglePrev)



/* Naming/timing issue with prevEl currentEl nextEl... fixing the names fixes the program? */