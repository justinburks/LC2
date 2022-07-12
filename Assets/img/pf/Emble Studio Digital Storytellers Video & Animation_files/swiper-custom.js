// Barba Load Wrapper
barba.hooks.beforeEnter(() => {

var swiper = new Swiper(".facts", {
   direction: "vertical",
   speed: 500,
   touch: true,
   grabCursor: true,
   slidesPerView: 1,
   loop: true,
         autoplay: {
         delay: 3000,
         disableOnInteraction: true,
   },
});

});    
