export function fn(){
    function getDataState(el,arg){
        if(arg){
            el.dataset.state = arg;
        }
        return el.dataset.state
    }
    function getDataRole(el,arg){
        if(arg){
            el.dataset.role = arg;
        }
        return el.dataset.role
    }
    function getDataName(el,arg){
        if(arg){
            el.dataset.name = arg;
        }
        return el.dataset.name
    }
    function getDataSize(el,arg){
        if(arg){
            el.dataset.size = arg;
        }
        return el.dataset.size
    }
    function getDataId(el,arg){
        if(arg){
            el.dataset.id = arg;
        }
        return el.dataset.id
    }
    function getDataCategory(el,arg){
        if(arg){
            el.dataset.category = arg;
        }
        return el.dataset.category
    }
    
    // KEYFRAMES



    // HELPER FUNCTIONS
    function searchValue(){
        return document.querySelector('.svg-search .search-bar').value;
    }

    function wipeElement(el){
        let frag = document.createDocumentFragment();
        frag.appendChild(el.cloneNode());
        el.innerHTML = '';
        return frag;
    }

    // danger
    const moveElement = function(el,parentElement){
    return parentElement.appendChild(wipeElement(el));
    }

    const copyElement = function(el,parentElement,deep=false){
        return parentElement.appendChild(el.cloneNode(deep))
    }

    function tggle(el,cls){
        el.classList.toggle(cls);
        return el;
    }
    function addClass(el,[...cls]){
        el.classList.add(...cls);
        return el;
    }
    function removeClass(el,[...cls]){
        el.classList.remove(...cls);
        return el;
    }
    function checkClass(el,cls){
        el.classList.contains(cls) ? true : false;
    }
    function ifClassThen(el,cls,cb){
        if (el.classList.contains(cls)){
            cb();
            return el;
        } else 
            return el;
    }
    function onClick(el,cb,opt=false,bubbles=false){
        if(bubbles){
            el.addEventListener('click', function(e){
                e.stopPropigation;
                cb();
            })
            return el;
        }
        el.addEventListener('click',cb,opt);
        return el
    }

    function removeClick(el, cb,opt=true){
        el.removeEventListener('click',cb,opt);
        return el
    }

    function onHover(el,cb,opt=true,bubbles=false){
        if(bubbles){
            el.addEventListener('mouseover', function(e){
                e.stopPropigation;
                cb();
            })
            return el
        }
        el.addEventListener('mouseover',cb,opt)
    }

    function onMouseOut(el,cb,opt=true,bubbles=false){
        if(bubbles){
            el.addEventListener('', function(e){
                e.stopPropigation;
                cb();
            })
            return el
        }
        el.addEventListener('mouseleave',cb,opt)
    }
};