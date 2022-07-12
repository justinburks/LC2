// This function toggles classes based on binary logic

function manToggle(el,bool,classToAdd,classToRemove, options = []) {
    if (bool) {
        if (options.length > 0) {
            options.forEach(option => el.classList.add(`${option}`));
        } else {
        el.classList.add(`${classToAdd}`);
        return bool = !bool;
        }
    } else {
        if (options.length > 0) {
            options.forEach(option => el.classList.add(`${option}`));
        } else {
        el.classList.remove(`${classToRemove}`);
        return bool = !bool;
        }
    }
}