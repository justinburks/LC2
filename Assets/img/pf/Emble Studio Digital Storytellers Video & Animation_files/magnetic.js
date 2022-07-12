// Barba Load Wrapper
barba.hooks.beforeEnter(() => {

var magnets = document.querySelectorAll('.playbutton-inner-wrap')
var strength = 150
          
magnets.forEach( (magnet) => {
  magnet.addEventListener('mousemove', moveMagnet );
  magnet.addEventListener('mouseout', function(event) {
    gsap.to( event.currentTarget, 1.5, {x: 0, y: 0, ease: Elastic.easeOut})
    });
  });
          
  function moveMagnet(event) {
  var magnetButton = event.currentTarget
  var bounding = magnetButton.getBoundingClientRect()
          
          
  gsap.to( magnetButton, 1.5, {
    x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * strength,
    y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * strength,
    rotate: "0.001deg",
    ease: Power4.easeOut
  });

  };
          
});