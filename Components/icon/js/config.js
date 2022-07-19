import {SvgModel} from './model.js'
import {Controls} from './controller.js'
import {StateObserver} from './observer.js'

let list = [];
const Model = undefined;
const Controller = undefined;
const Observer = new StateObserver();

(function loadData() {
    startAnimationFrame();
    fetch('../data/data.json')
        .then((res) => { return res.json()})
        .then((data) => {
            data.forEach(el => {
                list.push(el)
            })
            Model = new SvgModel(list); 
            Controller = new Controls(Model,Observer);
            Model.load();
            return Controller.sayHello();
        })
})();

export {Model, Observer, Controller};