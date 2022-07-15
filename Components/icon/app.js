import {SvgModel} from './js/model.js'
import {Controls} from './js/controller.js'
import {StateObserver} from './js/observer.js'

let list = [];
let Model;
let Controller;
const Observer = new StateObserver();

(function loadData() {
    // startAnimationFrame(loader);
    fetch('../data/data.json')
        .then((res) => { return res.json()})
        .then((data) => {
            data.forEach(el => {
                list.push(el)
            })
            Model = new SvgModel(list); 
            Controller = new Controls(Model,Observer);
            Model.load();
            init();
            return Controller.sayHello();
        })
})();

function startAnimationFrame() {

}

function stopAnimationFrame() {

}

function init() {
    //stopAnimationFrame(loader)
}