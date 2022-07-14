class StateObserver {
    constructor() {
        this.clickedElement = null;
        this.wrapper = null;
        this.tab = null;
        this.next = null;
        this.prev = null;
    }
    setState(el) {
        this.clickedElement = el;
        this.wrapper = el.parentElement;
        this.tab = el.dataset.category;
        this.next = el.nextElementSibling === null ? el.parentElement.firstElementChild : el.nextElementSibling;
        this.prev = el.previousElementSibling === null ? el.parentElement.lastElementChild : el.previousElementSibling;
        return this.getState();
    }
    getState() {
        let state = {
            clickedElement: this.clickedElement,
            wrapper: this.wrapper,
            tab: this.tab,
            next: this.next,
            prev: this.prev,
        };
         return state;
    }
    getWrapper() {
        return this.wrapper;
    }
    getTab() {
        return this.tab;
    }
    getNext() {
        return this.next;
    }
    getPrev() {
        return this.prev;
    }
};

export {StateObserver}