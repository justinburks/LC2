
    // BASIC SELECT FUNCTIONS
        // ADD OBSERVER TO TOGGLE UP/DOWN BASED ON POSITION
        // ADD BONUS POPUP TO COVER INITIAL INPUT
        // ADD CLICK OUTSIDE FUNCTIONALITY

        function $(args, all = false, callback) { 
            // I think this callback will work however it may be more effective to create a class
            // similar to jQuery and then add a method that calls it forEach
            // if (all == true && callback) {
            //     target = [...args];
            //     return document.querySelectorAll(`${args}`).forEach(item => callback(item))
            // }
            if(all == true) {
                return [...document.querySelectorAll(`${args}`)]
            }
            return document.querySelector(`${args}`);
        };
        const defaultDropdown = document.querySelector('.dropdown__default');
        const list = document.querySelector('.dropdown__list--default');
        const pointer = document.querySelector('.dropdown__pointer--default');
    
        const defaultDropdownLarge = document.querySelector('.dropdown__default-lg');
        const listLarge = document.querySelector('.dropdown__list--default-lg');
        const listLargeItems = [...document.querySelectorAll('.dropdown__list--default-lg li')];
        const pointerLarge = document.querySelector('.dropdown__pointer--default-lg');
    
        const defaultDropdownMedium = document.querySelector('.dropdown__default-md');
        const listMedium = document.querySelector('.dropdown__list--default-md');
        const muiDropdown = document.querySelector('.dropdown__mui');
        const muiPointer = document.querySelector('.dropdown__pointer--mui');
        const muiList = document.querySelector('.dropdown__list--mui');
    
        const semanticDropdown = document.querySelector('.dropdown__semantic');
        const semanticPointer = document.querySelector('.dropdown__pointer--semantic');
        const semanticList = document.querySelector('.dropdown__list--semantic');

        const searchPointers = [...document.querySelectorAll('.search__pointer')];

        let selected = [];

        // refactor this for re-usability 
        // create a class that outputs a similar object with similar handlers for any dropdown you add in the future.
        // beginner => functional => OOP => Modular OOP
        let firstMultipleSelectionDropdown = {
            dropDownSelections: [...document.querySelectorAll('.dropdown__list--default-lg li')],
            newElementContainer: document.querySelector('.name__list--default'),
            placeHolder: document.querySelector('.placeholder--default'),
        }

        let newElementContainer_1 = document.querySelector('.name__list--default');
        let dropdownPlaceholder_1 = document.querySelector('.placeholder--default');
        listLargeItems.forEach(item => item.addEventListener('click', () => {
            handleBasicSelection(item, newElementContainer_1, dropdownPlaceholder_1);
        }))
            
        function handleBasicSelection(thisEl, nameList, placeHolder) {
                
                // CLICKED EL MUST BE A DROP SELECTION ITEM FOR THIS TO WORK!!!
                thisEl.classList.toggle('clicked');

                if (thisEl.classList.contains('clicked')) {
                    // if an element is clicked automatically hide the placeholder (toggle off hidden)
                    if (!placeHolder.classList.contains('hidden')) {
                        placeHolder.classList.toggle('hidden');
                    }

                    // grab the text content of the clicked element
                    let text = thisEl.textContent;
                    // create new element with the same text as the clicked element 
                    // give new element a reference by adding the same data-id as the clicked elements data-value
                    let newEl = document.createElement('span');
                    newEl.textContent = text;
                    newEl.dataset.id = thisEl.dataset.value;
                    // add new element to the nameList (default class of new element has opacity of 0)
                    nameList.appendChild(newEl);
                    
                    // request animation frame/setTimeout to ensure animation class of option is applied/executed immediately after selection is clicked
                    // rename option class to a more explicit description
                    setTimeout(() => {
                            newEl.classList.toggle('option')
                        },0);

                        // when newElement is clicked
                            // remove it from the nameList after
                                // remove the animation class to hide it
                                // remove the clicked class to deselect it

                                // create/refactor a function to handle thisEl removal


                        newEl.addEventListener('click', () => {
                            handleBasicDeselection(newEl,nameList,placeHolder)
                        })
                } 
                else {
                    
                    getCorrespondingNamelistSelection(thisEl).classList.toggle('option');
                    // thisEl.classList.toggle('clicked');
                    setTimeout(() => {
                        nameList.removeChild(getCorrespondingNamelistSelection(thisEl));
                        if (!nameList.hasChildNodes()) {
                            placeHolder.classList.toggle('hidden')
                        }
                    },200);
                }
                
            // get value(text content)
            // create span and append to input section
            }

            function handleBasicDeselection(thisEl, nameList, placeHolder) {
                // THIS MUST BE A NAMELIST ELEMENT FOR THIS TO WORK

                // remove explicit class
                
                thisEl.classList.toggle('option');
                getCorrespondingDropdownSelection(thisEl).classList.toggle('clicked');
                
                setTimeout(() => {
                    nameList.removeChild(thisEl);
                    if (!nameList.hasChildNodes()) {
                        placeHolder.classList.toggle('hidden')
                    }
                },200)
            }

            function getCorrespondingNamelistSelection(el) {
                return document.querySelector(`[data-id="${el.dataset.value}"]`)
            }

            function getCorrespondingDropdownSelection(el) {
                return document.querySelector(`[data-value="${el.dataset.id}"]`)
            }


            function handleBasicDropdown(dropdown, correspondingList, classToToggle, options = false) {
            dropdown.classList.toggle('open');
            correspondingList.classList.toggle(`${classToToggle}`);
            if (options) {
                // refactor for deconstruction
                for (option of options) {
                    dropdown.classList.toggle(`${option}`);
                    }
                }
            }

            function findSomeEl(elementClicked, linkedList) {
                let sectionList = [...linkedList];
                let correspdingSection = elementClicked.dataset.tab
                for (section of sectionList) {
                    if (section.dataset.section == correspdingSection) {
                        return section;
                    } 
                }
            }
            
            let sectionLinks = [...document.querySelectorAll('.page__link')];
            let subLinks = [...document.querySelectorAll('.sub__menu')];

            sectionLinks.forEach(link => link.addEventListener('click', () => {
                let thisLink = findSomeEl(link, document.querySelectorAll('.section'));
                
                console.log(thisLink);
                thisLink.scrollIntoView();
            }));

            subLinks.forEach(link => link.addEventListener('click', (e) => {
                e.stopPropagation();
                const thisCorrespondingElementName = e.target.dataset.tab;
                if(document.querySelector(`[data-section='${thisCorrespondingElementName}']`) == null) return;
    
                console.log(thisCorrespondingElementName);
                document.querySelector(`[data-section="${thisCorrespondingElementName}"]`).scrollIntoView();
                console.log(document.querySelector(`[data-section='${thisCorrespondingElementName}']`))
            }))

            document.querySelectorAll('.hidden__menu-pointer').forEach(link => link.addEventListener('click', (e) => {
                e.stopPropagation()
                let menu = e.target.nextElementSibling;
                console.log(e.target.nextElementSibling)
                handleBasicMenuExpansion(menu);
            }))
            // document.querySelector('.hidden__menu-pointer').addEventListener('mouseover', (e) => {

            //     e.stopPropagation()
            //     let menu = e.target.nextElementSibling;
            //     if (menu.classList.contains('expanded')) return;
            //     console.log(e.target.nextElementSibling)
            //     handleBasicMenuExpansion(menu);
            // })
            // function handleMenuExpansion(itemToExpand, linkedList, linkedListItems) {
            //     // if the corresponding hidden menu matches the link clicked expand this menu and detract any other
            //         let thisCorrespondingEl = findSomeEl(itemToExpand, linkedList);
            //         let menuItems = [...linkedListItems];
            //         console.log(thisCorrespondingEl, menuItems)
            //         setTimeout( () => {
            //         thisCorrespondingEl.classList.toggle('expanded');
            //         thisCorrespondingEl.classList.toggle('expand');
            //         setTimeout( () => {
            //             menuItems.forEach(item => item.classList.toggle('expand'))
            //             },50);
            //         }, 50)
                    
            //}
            function findHiddenMenu(itemClicked) {
                // find the item clicked and grab its ul;
                console.log(itemClicked.querySelector(`ul`));
            }

            function handleBasicMenuExpansion(itemToExpand) {
                    // let thisCorrespondingEl = findSomeEl(itemToExpand, linkedList);
                    // let hiddenMenu = itemToExpand.querySelector('.sub__menu')
                    let menuItems = [...itemToExpand.querySelectorAll('li')];
                    console.log(itemToExpand, menuItems)
                    setTimeout( () => {
                    itemToExpand.classList.toggle('hidden__menu');
                    itemToExpand.classList.toggle('expanded')
                    setTimeout( () => {
                        menuItems.forEach(item => item.classList.toggle('expand'))
                        },50);
                    }, 50);
            }


            // sectionLinks.forEach(link => link.addEventListener('mouseover', function() {
            //     handleMenuExpansion(link, document.querySelectorAll('.menu__hidden'), document.querySelectorAll('.menu__hidden ul li'))
            // }))
            // sectionLinks.forEach(link => link.addEventListener('mouseleave', function() {
            //     handleMenuExpansion(link, document.querySelectorAll('.menu__hidden'), document.querySelectorAll('.menu__hidden ul li'))
            // }))


            pointer.addEventListener('click', function() {
                handleBasicDropdown(defaultDropdown, list, 'show', ['passive', 'active']);
            })
        
            pointerLarge.addEventListener('click', function() {
                handleBasicDropdown(defaultDropdownLarge, listLarge, 'show', ['passive', 'active'])
            })

            muiPointer.addEventListener('click', function() {
                handleBasicDropdown(muiDropdown, muiList, 'open__down');
            })

            semanticPointer.addEventListener('click', function() {
                handleBasicDropdown(semanticDropdown, semanticList, 'scale__down');
            })
            

            // orginal list
            // create a new class called list & set the orginal list

            
            let ifSetNeverChange;
            // on first instatiation closure defines orignal list that doesn't change
            function saveOriginalList(variableToSet) {
                // if the variable is set return it.
                if (ifSetNeverChange !== undefined) return ifSetNeverChange;
                // if not set it
                    // to return value of the variable passed?
                ifSetNeverChange = variableToSet;
                return ifSetNeverChange;
            }


            searchPointers.forEach(pointer => pointer.addEventListener('click', (e) => {
                let thisName = pointer.parentElement.querySelector('.dropdown__name');
                console.log(thisName)
                let thisList = pointer.parentElement.querySelector('.dropdown__list');
                const arrr = [...thisList.querySelectorAll('ul li')];
                // arrr.forEach(item => item.addEventListener('click', () => {
                //     handleBasicSelection(item, document.querySelector('.name__list-search'), document.querySelector('.placeholder-search'))
                // }))
                const arr3 = [];
                const arr2 = arrr.forEach(item => arr3.push(item.innerText));
                const refresh = arr3.map(place => {
                    return `<li>${place}</li>`
                }).join('');
                // calls the closure that defines orginal to never change after html/dom is altered
                const refreshValue = saveOriginalList(refresh);

                thisList.classList.toggle('scale__down');
                thisName.parentNode.classList.toggle('passive');
                thisList.querySelector('.dropdown__list ul').innerHTML = refreshValue
                console.log(`originalList = ${refreshValue}`)
                if (thisName.hasChildNodes()) {
                    console.log(thisName.hasChildNodes());
                    let thisReference = thisName.querySelector('.inp')
                    console.log(thisReference)
                    thisName.removeChild(thisReference);

                } else {
                let thisInput = document.createElement('input');
                let theseListItems = thisList.querySelectorAll('ul li')
                if (thisList.classList.contains('test')) {
                    if (thisList.children[0].classList.contains('inp')) {
                        thisList.children[0].remove();
                    } else {
                    thisInput.classList.add('inp');
                    thisList.insertBefore(thisInput,thisList.children[0]);
                    thisInput.focus({
                        preventScroll: true,
                    });
                    }
                } else {
                thisInput.classList.add('inp');
                thisName.appendChild(thisInput);
                thisInput.focus();
                thisList.addEventListener('mouseenter', (e) => {
                    e.target.focus();
                })
                }
                const inp = thisName.querySelector('.inp') || thisList.querySelector('.inp');
                // make this a function that returns the array
                thisInput.addEventListener('keyup', displayMatches);
                
                function displayMatches() {

                        const matchArray = findMatches(this.value, arr3);
                        console.log(matchArray);
                        const html = matchArray.map(place => {
                            return `<li>${place}</li>`
                        }).join('');
                        console.log(html)

                        if (html.length !== 0) return thisList.querySelector('ul').innerHTML = html;
                        return thisList.querySelector('ul').innerHTML = 'No Results Found'
                    }

                function findMatches(wordToMatch, arr) {
                    return arr.filter(item => {
                        const regex = new RegExp(wordToMatch, 'gi');
                        return item.match(regex)
                    })
                }
            }
            }))

            document.querySelector('.dropdown__pointer.inline').addEventListener('click', (e) => {
                document.querySelector('.dropdown__list--inline').classList.toggle('focus')
            })

            document.querySelector('.nav__pointer.horizontal').addEventListener('click', () => {
                document.querySelector('.tiltShift').classList.toggle('visible');
            })
            document.querySelector('.nav__pointer.vertical').addEventListener('click', () => {
                document.querySelector('.tiltShiftY').classList.toggle('visible');
            })

            document.querySelector('.floating__pointer').addEventListener('click', () => {
                document.querySelector('.dropdown__list--inline-floating').classList.toggle('visible')
            })

            document.querySelectorAll('.ddc').forEach(item => item.addEventListener('click', (e) => {
                if (e.target.type == 'text') {
                    return
                }
                item.querySelector('.dd').classList.toggle('visible')
            }))

            
            function appendDuplicateElement(elementClicked, placeToAppend) {
                let node = elementClicked.cloneNode(true);
                placeToAppend.innerHTML = "";
                placeToAppend.append(node);
                
            } 

            
            document.querySelectorAll('.content__dropdown-menu .iLabel').forEach(item => item.addEventListener('click', () => {
                console.log('clicked')
                appendDuplicateElement(item, item.parentElement.parentElement.querySelector('.content__dropdown .content__dropdown-placeholder.labler'))
            }))
        // MULTIPLE SELECT FUNCTIONALITY
            // ADD LARGE LIST WITH CUSTOM SCROLL BAR
            // ADD HIGHLIGHT ON HOVER FUNCTIONALITY
            // pointer.onClick create input element with class of inp inside of .dropdownName div
            // ADD A WAY TO POPULATE INPUT CONTAINER WITH SELECTED ITEM
                // LOOP/SHOW?
                // CREATE/APPEND?
            // ADD A WAY TO REMOVE SELECTED ITEM FROM INPUT CONTAINER
            // ADD DIFFERENT ANIMATION FOR EACH STYLE
    
        // SEACH SELECT FUNCTIONALITY
        // const inp = document.querySelector('.inp');
        // const arrr = [...document.querySelectorAll('.dropdown__list-1-lg li')];
        // const arr3 = []
        // const arr2 = arrr.forEach(item => arr3.push(item.innerText));
                // make this a function that returns the array


        // inp.addEventListener('keyup', displayMatches);

        // function displayMatches() {
        //     const matchArray = findMatches(this.value, arr3);
        //     console.log(matchArray);
        //     const html = matchArray.map(place => {
        //         return `
        //             <li>${place}</li>
        //         `
        //     });
        //     document.querySelector('.dropdown__list-1-lg ul').innerHTML = html;
        // }

        // function findMatches(wordToMatch, arr) {
        //     return arr.filter(item => {
        //         const regex = new RegExp(wordToMatch, 'gi');
        //         return item.match(regex)
        //     })
        // }

        

        // OOP LOGIC?
        
        // constructor(arrOfSelections, newElementContainer, placeHolder) {
            /*
                this.dropDownSelections = arrOfSelections;
                this.newElementContainer = newElementContainer;
                this.placeHolder = placeHolder;
            */

        // proto
        /*
            function handleBasicSelection(thisEl = this, nameList = newElementContainer, placeHolder = placeHolder) {

                thisEl.classList.toggle('clicked');

                if (thisEl.classList.contains('clicked')) {

                    if (!placeHolder.classList.contains('hidden')) {
                        placeHolder.classList.toggle('hidden');
                    }
                
                let text = thisEl.textContent;
                let newEl = document.createElement('span');
                newEl.textContent = text;
                newEl.dataset.id = thisEl.dataset.value;
                nameList.appendChild(newEl);
                    
                setTimeout(() => {
                            newEl.classList.toggle('option')
                        },0);

                newEl.addEventListener('click', () => {
                            handleBasicDeselection(newEl,nameList,placeHolder)
                        })

                } else {

                    getCorrespondingNamelistSelection(thisEl).classList.toggle('option');
                    // thisEl.classList.toggle('clicked');
                    setTimeout(() => {
                        nameList.removeChild(getCorrespondingNamelistSelection(thisEl));
                        if (!nameList.hasChildNodes()) {
                            placeHolder.classList.toggle('hidden')
                        }
                    },200);
                }
            }

            function handleBasicDeselection(thisEl, nameList, placeHolder) {

                thisEl.classList.toggle('option');
                getCorrespondingDropdownSelection(thisEl).classList.toggle('clicked');
                
                setTimeout(() => {
                    nameList.removeChild(thisEl);
                    if (!nameList.hasChildNodes()) {
                        placeHolder.classList.toggle('hidden')
                    }
                },200)
            }

            function getCorrespondingNamelistSelection(el) {
                return document.querySelector(`[data-id="${el.dataset.value}"]`)
            }

            function getCorrespondingDropdownSelection(el) {
                return document.querySelector(`[data-value="${el.dataset.id}"]`)
            }
            initSelectionHandlers: function() {
                dropDownSelections.forEach(item => item.addEventListener('click', handleBasicSelection)
                }))
            } 
        */