/* 
                ^        
              <   >      
             |     |     
             |     |     
             |     |     
           " |  ^  | "   
          | || | | || |  
          | || ( ) || |  
          |_|| "_" ||_|  
          | ||/"_"\|| |  
          |_|/ "_" \|_|  
          | /  "_" _\ |  
          |<___"|"___>|  
          | |  ^^^  | |  
          /_\       /_\  
         /|||\ """ /|||\ 
        /|||||\   /|||||\           */

(function() {
    document.addEventListener("DOMContentLoaded", function () {
        Lightbox.initializeListeners();
        addDummyElementsForFlexboxFun();
    });

    function removeNode(node) {
        node.parentNode.removeChild(node);
    }

    function Lightbox(imageSource) {
        var lightboxImage = document.createElement("img");
        lightboxImage.src = imageSource;

        this.element = document.createElement("lightbox");
        this.element.appendChild(lightboxImage);
    
        document.body.appendChild(this.element);

        this.element.addEventListener("click", this.onClicked.bind(this));
    }

    Lightbox.prototype.onClicked = function(clickEvent) {
        removeNode(this.element);
    };

    Lightbox.removeAll = function () {
        var lightbox;
        while (lightbox = document.querySelector("lightbox"))
            removeNode(lightbox);
    };

    Lightbox.onDocumentElementClicked = function(clickEvent) {
        var target = clickEvent.target;
        if (target.classList.contains("lightboxable")) {
            new Lightbox(target.src);
        }
    };

    Lightbox.onKeyUp = function (keyEvent) {
        if (keyEvent.keyCode === 27) { // Escape key was pressed.
            Lightbox.removeAll();
        }
    };

    Lightbox.initializeListeners = function () {
        document.addEventListener("keyup", Lightbox.onKeyUp);
        document.addEventListener("click", Lightbox.onDocumentElementClicked);
    }

    function addDummyElementsForFlexboxFun() {
        var lists = document.querySelectorAll(".image-links.flexbox ul");
        Array.prototype.forEach.call(lists, function (list) {
            var numberOfListItems = list.children.length;
            for (var i = 0; numberOfListItems > 3 && i < numberOfListItems; ++i) {
                list.appendChild(document.createElement("li"));
            }
        });
    }
})();