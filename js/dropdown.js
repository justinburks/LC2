document.querySelector('.input-toggler').addEventListener('click', (e) => {
    document.querySelector('.date').classList.toggle('b5');
    document.querySelector('.date').classList.toggle('active');
    e.currentTarget.classList.toggle('clicked');
    
    document.getElementById('calendar-2').classList.toggle('show');

})

// re-usable version of toggler
    // select toggler --> add click listener pass it to toggle
function toggle(toggler, target, targetOptions = [], classOptions = []) {
    document.querySelector(toggler).classList.add('clicked');
    document.querySelector(target).classList.toggle('show');
    // toggler toggle class of clicked
    // target toggle class of show
    // options --> {destructure}{toggle class} or [loopThrough] => [andAssign]
    for (let i = 0; i < targetOptions.length; i++) {
        targetOptions[i].classList.toggle(classOptions[i])
    }

    // add throttler
}