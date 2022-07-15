
class StateObserver {
    constructor() {
    this.state = {
            clickedElement: undefined,
            wrapper: undefined,
            tab: undefined,
            next: undefined,
            prev: undefined,
    }
    this.dashboardState = {}

    this.setState = function(el) {
        if (el === undefined) {
           return Object.keys(this.state).forEach(key => this.state[key] = undefined);
        }
        this.state.clickedElement = el;
        this.state.wrapper = el.parentElement;
        this.state.tab = el.dataset.category;
        this.state.next = el.nextElementSibling === null ? el.parentElement.firstElementChild : el.nextElementSibling;
        this.state.prev = el.previousElementSibling === null ? el.parentElement.lastElementChild : el.previousElementSibling;
        // return console.log(this.state)
    }
    this.getClickedElement = function() {
        return this.state.clickedElement
    } 
    this.getWrapper = function() {
        return this.state.wrapper;
    }
    this.getTab = function() {
        return this.state.tab;
    }
   this.getNext = function() {
        return this.state.next;
    }
    this.getPrev = function() {
        return this.state.prev;
    }
};
}
export {StateObserver}