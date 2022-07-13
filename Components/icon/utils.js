export function getDataState(el, arg) {
    if (arg) {
        el.dataset.state = arg;
    }
    return el.dataset.state;
}
export function getDataRole(el, arg) {
    if (arg) {
        el.dataset.role = arg;
    }
    return el.dataset.role;
}
export function getDataName(el, arg) {
    if (arg) {
        el.dataset.name = arg;
    }
    return el.dataset.name;
}
export function getDataSize(el, arg) {
    if (arg) {
        el.dataset.size = arg;
    }
    return el.dataset.size;
}
export function getDataId(el, arg) {
    if (arg) {
        el.dataset.id = arg;
    }
    return el.dataset.id;
}
export function getDataCategory(el, arg) {
    if (arg) {
        el.dataset.category = arg;
    }
    return el.dataset.category;
}
export function searchValue() {
    return document.querySelector('.svg-search .search-bar').value;
}
export function wipeElement(el) {
    let frag = document.createDocumentFragment();
    frag.appendChild(el.cloneNode());
    el.innerHTML = '';
    return frag;
}
export function moveElement(el, parentElement) {
    return parentElement.appendChild(wipeElement(el));
}
export function copyElement(el, parentElement, deep = false) {
    return parentElement.appendChild(el.cloneNode(deep));
}
export function tggle(el, cls) {
    el.classList.toggle(cls);
    return el;
}
export function addClass(el, [...cls]) {
    el.classList.add(...cls);
    return el;
}
export function removeClass(el, [...cls]) {
    el.classList.remove(...cls);
    return el;
}
export function checkClass(el, cls) {
    el.classList.contains(cls) ? true : false;
}
export function ifClassThen(el, cls, cb) {
    if (el.classList.contains(cls)) {
        cb();
        return el;
    }
    else
        return el;
}
export function onClick(el, cb, opt = false, bubbles = false) {
    if (bubbles) {
        el.addEventListener('click', function (e) {
            e.stopPropigation;
            cb();
        });
        return el;
    }
    el.addEventListener('click', cb, opt);
    return el;
}
export function removeClick(el, cb, opt = true) {
    el.removeEventListener('click', cb, opt);
    return el;
}
export function onHover(el, cb, opt = true, bubbles = false) {
    if (bubbles) {
        el.addEventListener('mouseover', function (e) {
            e.stopPropigation;
            cb();
        });
        return el;
    }
    el.addEventListener('mouseover', cb, opt);
}
export function onMouseOut(el, cb, opt = true, bubbles = false) {
    if (bubbles) {
        el.addEventListener('', function (e) {
            e.stopPropigation;
            cb();
        });
        return el;
    }
    el.addEventListener('mouseleave', cb, opt);
}