// STACKS //

const { words } = require("lodash");

// LAST IN FIRST OUT //

// functions: push, pop, peek, length

// natively with an array

var letters = []; // this is our stack

var word = "racecar";

var rword = "";

// put letters of word into stack
for (var i = 0; i < word.length; i ++) {
    letters.push(word[i]);
}

// pop off the stack in reverse order
for (var i = 0; i < word.length; i++) {
    rword += letters.pop();
}

if (rword === word) {
    console.log(word + " is a palindrome.");
}

// CREATING A STACK //

var Stack = function() {
    this.count = 0;
    this.stroage = {};

    // Adds a value onto the end of he stack
    this.push = function(value) {
        this.storage[this.count] = value;
        this.count++;
    }

    // Removes and returns the value at the end of the stack
    this.pop = function() {
        if (this.count === 0) {
            return undefined;
        }

        this.count--;
        var result = this.storage[this.count];
        delete this.storage[this.count];
        return result;
    }

    this.size = function() {
        return this.count;
    }

    this.peek = function(value) {
        return this.storage[this.count-1];
    }
}

var myStack = new Stack();
myStack.push(1);
myStack.push(2);
myStack.peek();
myStack.push("freeCodeCamp");
myStack.size();
myStack.pop();


// SET //

function mySet() {
    // the var collection will hold the set
    var collection = [];
    // this method will check for the presence of an element and return true or false
    this.has = function(element) {
        return (collection.indexOf(element) !== -1);
    };
    // this method will return all the values in the set
    this.values = function() {
        return collection;
    };
    // this method will add an element to the set
    this.add = function(element) {
        if(!this.has(element)){
            collection.push(element);
            return true;
        }
        return false;
    };
    // this method will remove an element from a set
    this.remove = function(element) {
        if(this.has(element)){
            index = collection.indexOf(element);
            collection.splice(index,1);
        }
    }
}

// GENERATOR