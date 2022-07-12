class NumberModel {
    constructor() {
        this.number = 0;
        this.color = 'red';
        this.observers = [];
    }

    addObserver(o) {
        this.observers.push(o)
    }

    notifyObservers() {
        for (let o of this.observers) {
            o.update(this);
        }
    }
}