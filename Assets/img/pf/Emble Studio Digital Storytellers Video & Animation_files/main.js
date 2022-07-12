// Barba Load Wrapper
barba.hooks.beforeEnter(() => {


// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);


// Copyright start
// © Code by T.RICKS, https://www.tricksdesign.com/
// You have the license to use this code in your projects but not redistribute it to others
// Tutorial: https://www.youtube.com/watch?v=xiAqTu4l3-g&ab_channel=TimothyRicks

// Find all text with .tricks class and break each letter into a span
var tricksWord = document.getElementsByClassName("tricks");
for (var i = 0; i < tricksWord.length; i++) {
	var wordWrap = tricksWord.item(i);
	wordWrap.innerHTML = wordWrap.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="tricksword-wrapper"><span class="tricksword">$2</span></span>');
}

var subsWord = document.getElementsByClassName("subs");
for (var i = 0; i < subsWord.length; i++) {
	var wordWrap = subsWord.item(i);
	wordWrap.innerHTML = wordWrap.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="subsword-wrapper"><span class="subsword">$2</span></span>');
}

// Copyright end


 // Open/close navigation when clicked .nav-icon
 $(document).ready(function(){
   $('.nav-icon').click(function(){
      if ($('main').hasClass('nav-active')) {
         $("main").addClass('nav-inactive');
         $("main").removeClass('nav-active');
      } else {
         $("main").addClass('nav-active');
         $("main").removeClass('nav-inactive');
      }
   });
   $(document).keydown(function(e){
      if(e.keyCode == 27) {
         if ($('main').hasClass('nav-active')) {
            $("main").removeClass('nav-active');
         } 
      }
  });
});

//Check to see if the window is top if not then display button
$(window).scroll(function(){
   if ($(this).scrollTop() > 200) {
      $('main').addClass('scrolled');
   } else {
      $('main').removeClass('scrolled');
   }
});

var stickyOffset = $("#sticky").offset();
var $contentDivs = $(".section");
$(document).scroll(function() {
    $contentDivs.each(function(k) {
        var _thisOffset = $(this).offset();
        var _actPosition = _thisOffset.top - $(window).scrollTop();
        if (_actPosition < stickyOffset.top && _actPosition + $(this).height() > 0) {
            $("#sticky").removeClass("light dark").addClass($(this).hasClass("light") ? "light" : "dark");
            return false;
        }
    });
});

$(document).ready(function() {
   $contentDivs.each(function(k) {
       var _thisOffset = $(this).offset();
       var _actPosition = _thisOffset.top - $(window).scrollTop();
       if (_actPosition < stickyOffset.top && _actPosition + $(this).height() > 0) {
           $("#sticky").removeClass("light dark").addClass($(this).hasClass("light") ? "light" : "dark");
           return false;
       }
   });
});

// Homepage video modal
	$(document).ready(function(){
		$('.open-home-video').click(function(){
         $('.video-modal-bg').toggleClass('active');
			$(".video-modal").toggleClass('active');
			$("body").toggleClass('locked');
			$("#vimeo-modal").each(function() {
				var src = $(this).attr('src').replace('&autoplay=false', '&autoplay=true');
				$(this).attr('src',src);
		  	});
		});
		$('.video-modal-bg').click(function(){
			$('.video-modal-bg').removeClass('active');
			$(".video-modal").removeClass('active');
			$("body").toggleClass('locked');
			$("#vimeo-modal").each(function() {
				var src = $(this).attr('src').replace('&autoplay=true', '&autoplay=false');
				$(this).attr('src',src);
		  	});
		});
  	});



});
