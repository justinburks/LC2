// Animation (Don't touch)
function delay(n) {
	n = n || 2000;
	return new Promise((done) => {
		 setTimeout(() => {
			  done();
		 }, n);
	});
}


// Animation - Loading page First Time
function loadAnimation() {
	var tl = gsap.timeline();

	tl.set(".tricksword", { 
		yPercent: 150,
		opacity: 1
	});

	tl.set(".animate-fade-in", { 
		y: 100, 
		opacity: 0
	});

	tl.set(".loading-svg", { 
		opacity: 0
	});

	tl.set("#gdpr-box", { 
		y: 100, 
		opacity: 0
	});

	tl.to(".loading-svg", {
		duration: .5,
		ease: "Power0.easeNone",
		opacity: "1",
		delay: "0.1"
	});

	tl.to(".loading-screen", {
		duration: .5,
		ease: "Power0.easeNone",
		opacity: "0",
		delay: 1
	});

	tl.to(".tricksword", { 
		ease: "Expo.easeOut",
		duration: 1, 
		yPercent: 0,
		opacity: 1,
		stagger: .05,
		clearProps: 'all'
	});

	tl.to(".animate-fade-in", { 
		ease: "Expo.easeOut",
		duration: 1.25, 
		y: 0, 
		opacity: 1, 
		stagger: .075, 
		delay: 0
	},"-=1.2");

	tl.set(".loading-screen", { 
		opacity: 0
	});

}

// Animation - Transition
function pageTransition() {
	var tl = gsap.timeline();

	tl.to(".main-fade", {
		duration: .5,
		ease: "Power0.easeNone",
		opacity: "0"
	});

	tl.to(".slow-load", {
		duration: .75,
		ease: "Power3.easeOut",
		opacity: "0",
		clearProps: 'all'
	},"-=.5");

	tl.set(".main-fade", {
		y: 0, 
		opacity: "1"
	});

	tl.set(".loading-screen", { 
		opacity: 0
	});
	

}


// Animation - Loading page
function contentAnimation() {
	var tl = gsap.timeline();

	tl.set(".loading-screen", { 
		opacity: 0
	});

	tl.set(".main-fade", { 
		opacity: 0
	});

	tl.set(".tricksword", { 
		yPercent: 150,
		opacity: 1
	});

	tl.set(".animate-fade-in", { 
		y: 100, 
		opacity: 0
	});

	tl.to(".main-fade", {
		duration: 1,
		ease: "Power0.easeNone",
		opacity: "1",
		delay: ".25"
	});

	tl.from(".slow-load", {
		duration: 1,
		ease: "Power3.easeIn",
		opacity: "0",
		clearProps: 'all'
	},"-=1");

	tl.to(".tricksword", { 
		ease: "Expo.easeOut",
		duration: 1, 
		yPercent: 0,
		opacity: 1,
		stagger: .05,
		clearProps: 'all'
	},"-=1");

	tl.to(".animate-fade-in", { 
		ease: "Expo.easeOut",
		duration: 1.25, 
		y: 0, 
		opacity: 1, 
		stagger: .075, 
		delay: 0
	},"-=1.15");

}

if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }

// Call animation 
$(function () {
	barba.init({

		sync: true,
		

		transitions: [
			{
				async once(data) {
					loadAnimation();
				},
				async enter(data) {
					contentAnimation();
				},
				async leave(data) {
					const done = this.async();

					pageTransition();
					await delay(450);
					$(window).scrollTop(0);

					done();
				}, 
			},
			{
				name: 'home',
				to: {
					namespace: ['home']
				},
				async once(data) {
					var tl = gsap.timeline();

					tl.set(".loading-screen", { 
						opacity: 1
					});

					tl.set(".loading-svg", { 
						opacity: 0
					});

					tl.set(".home-overlay-block", { 
						autoAlpha: 0
					});

					tl.set("body", { 
						position: "fixed"
					});

					tl.set(".home-video-wrapper", { 
						scale: "0",
						rotation: 90
					});

					tl.set(".playbutton", { 
						scale: "0",
						rotation: 45
					});

					tl.set(".home-video-before", { 
						paddingBottom: "100%"
					});

					tl.set(".section-home-header", { 
						backgroundColor: "#E89E4A"
					});

					tl.set(".home-image-inside", { 
						width: "140%",
						left: "-20%"
					});

					tl.set(".slow-load", { 
						opacity: 0
					});

					tl.set(".extralight", { 
						opacity: 0
					});

					tl.set(".tricksword", { 
						yPercent: 150,
						opacity: 1
					});

					tl.to(".loading-svg", {
						duration: .5,
						ease: "Power0.easeNone",
						opacity: "1",
						delay: "0.1"
					});

					tl.to(".loading-screen", {
						duration: .5,
						ease: "Power0.easeNone",
						opacity: "0",
						delay: 1
					});

					tl.to(".home-video-wrapper", { 
						duration: 1.5,
						ease: "Expo.easeInOut",
						scale: "0.66",
						rotation: 0
					},"-=.5");

					tl.to(".home-video-before", { 
						duration: 1.5,
						ease: "Expo.easeInOut",
						paddingBottom: "185%",
						delay: 0,
					});

					tl.to(".section-home-header", { 
						duration: 1.5,
						ease: "Expo.easeInOut",
						backgroundColor: "#202020",
					},"-=1.5");

					tl.to(".home-video-wrapper", { 
						duration: 1.5,
						ease: "Expo.easeInOut",
						scale: "1",
					},"-=1.40");

					tl.to(".tricksword", { 
						ease: "Expo.easeOut",
						duration: 1, 
						yPercent: 0,
						stagger: .05,
						opacity: 1
					},"-=.75");

					tl.to(".slow-load", {
						duration: 1,
						ease: "Power3.easeOut",
						opacity: 1,
						clearProps: 'all'
					},"-=1.25");

					tl.set("body", { 
						position: "relative",
						clearProps: 'all'
					},"-=.5");

					tl.to(".playbutton", { 
						duration: 1.25,
						ease: "Expo.easeInOut",
						scale: "1",
						rotation: 0
					},"-=.75");
					
				},
			},
		],
	});
});
