// GET DATA
// RETURN DATA/CLASS
// EXPORT TO CONTROLLER

class SvgModel {
    constructor(list) {
        // CURRENT STATE
        this.clickedElement;
        // MAIN INDEX 
        // MAY BE REFACTORED HERE TO CREATE ASSOCIATIVE ARRAY
        this.elements = list;
        // CATEGORY OBJECT REFERENCES
        this.categorySet = [];
        this.categories = {};
    }
       // CREATES A SET OF CATEGORY NAMES
    createCategorySet() {
        this.elements.forEach(el => {
            if (!this.categorySet.includes(el[1])) {
                this.categorySet.push(el[1]);
            }
        });
        return this.categorySet;
    }
    // CHECKS ALL ELEMENT CATEGORY NAMES AND CREATES AN ARRAY FOR EACH INSIDE OF CATEGORY OBJECT
    addRandomDateToEachIndex() {
        function generateRandomDate() {

            return date;
        }

        this.elements.forEach(el => {
            let date = generateRandomDate();
            el.splice(1, 0, date);
            el[2].dateAdded = date;
        })
    }
    createRecentlyAddedArray(arr) {
        // default sort
        let thisWeek; // added this week || within a week of the most recent
        let thisMonth; // added less than 30 days || within a month of the most recent 
        let theRest; // sorted by date added || by month - labeled
        // recent sort
        let mostUsed = this.sortArrayByMostUsed(arr)
        let buildByDateOptions
    }
    createArrayForEachCategory() {
        this.categorySet.forEach(el => {
            // GIVE CATEGORY OBJECT A CORRESPONDING CATEGORY NAME
            this.categories[el] = {};
            let tmpArr = [];
            this.elements.forEach(index => {
                // tmpArr = [];
                if(index[1] == el) {
                    tmpArr.push(index);
                }
            });
            this.categories[el].elements = tmpArr;
            })
            return this.categories;
    }
    sortArrayByName(arr) {
        function flattenString(el) {
            let x = el.toString();
             return el.toUpperCase().replaceAll(' ', '').replaceAll('_', '');
        }

        let sortedByNameAsc = arr.slice().sort((a,b) => {
            if (flattenString(a[0]) > flattenString(b[0])) {
                return 1;
            } else {
                return -1
            }
        });
        let sortedByNameDesc = arr.slice().sort((a,b) => {
            if (flattenString(a[0]) > flattenString(b[0])) {
                return -1;
            } else {
                return 1
            }
        });
        console.log(sortedByNameAsc);
        console.log(sortedByNameDesc);

    }
    sortArrayByCategory(arr) {
        let sortedByCategory = arr.slice().sort((a,b) => {
            a[1] - b[0];
        })
    }
    sortArryByDate(arr) {
        let sortedByDate = arr.slice().sort((a,b) => {
            a[2].dateAdded - b[2].dateAdded;
        })
    }
    sortArrayByMostUsed(arr) {
        let sortedByFrequency = arr.slice().sort((a,b) => {
            a[2].copied - b[2].copied;
        })
    }
     
    setProps(obj,index) {
        // SET PROPERTIES
        let elementReference = index;
        obj.element = undefined;
        obj.copied = undefined;
        obj.mainIndex = this.elements.indexOf(elementReference);
        obj.categoryObjectReference = this.categories[obj.category];
        obj.categoryArray = obj.categoryObjectReference.elements;
        obj.categoryIndex = obj.categoryArray.indexOf(index);
        // CREATE A WRAPPER FRAGMENT
        return obj;
    }
}

export { SvgModel };