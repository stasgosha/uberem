ScrollTrigger.defaults({
	// toggleActions: "play reverse none none",
	markers: false,
});

document.addEventListener("DOMContentLoaded", function() {
	gsap.registerPlugin(ScrollTrigger);

	const isMobile = $(window).width() < 1200;

	// How we work
	const howWeWorkEl = qs('.how-we-work-component');
	const cmpContent = qs('.cmp-content', howWeWorkEl);
	const cmpSidebar = qs('.cmp-sidebar', howWeWorkEl);
	const cmpNavItems = qsa('.cmp-nav li', howWeWorkEl);
	const cmpNavButtons = qsa('.cmp-nav button', howWeWorkEl);
	const cmpSlides = qsa('.slide', cmpContent);

	if (!isMobile) {
		gsap.set(cmpSidebar, {
			xPercent: -120,
			scale: 1.2
		});

		gsap.set(cmpContent, {
			width: 1094,
			x: -375 / 2 + ($(window).width() - 375 - 1094) / 2,
			borderRadius: 8
		});
	}

	const hideItems = {
		autoAlpha: 0,
		scale: 0.7,
		y: 20
	}

	const showItems = {
		autoAlpha: 1,
		scale: 1,
		y: 0
	}

	gsap.set('.image-with-labels-block .item', hideItems);

	let slideZIndex = 5;

	function showSlide(index){
		gsap.to('.image-with-labels-block .item', {
			...hideItems,
			duration: 1
		});

		gsap.fromTo(cmpSlides[index], {
			xPercent: 105,
			scale: 2,
			zIndex: ++slideZIndex
		}, {
			xPercent: 0,
			scale: 1
		});

		gsap.to( qsa('.image-with-labels-block .item', cmpSlides[index]), {
			...showItems,
			duration: 1,
			stagger: 0.2
		});
	}

	$(cmpNavButtons).each(function(i, btn){
		$(btn).attr('data-index', i);
	});

	$(cmpNavButtons).click(function(e){
		e.preventDefault();

		$(cmpNavButtons).removeClass('current');
		$(this).addClass('current');

		showSlide( $(this).data('index') );
	});

	$(cmpNavButtons).eq(0).trigger('click');

	$(window).scroll(function(e){
		if ($(window).scrollTop() < $('.how-we-work-section').offset().top) {
			$('.image-with-labels-block .item').addClass('hide');
		} else{
			$('.image-with-labels-block .item').removeClass('hide');
		}
	});

	const howWeWorkTL = gsap.timeline({
		scrollTrigger: {
			trigger: howWeWorkEl,
			start: 'top 50%',
			end: isMobile ? '+=200' : 'top 0',
			scrub: 1,
			// pin: true
		},
		ease: "power1.inOut"
	});

	if (!isMobile) {
		howWeWorkTL
			.to(cmpContent, {
				width: $(window).width() - 375,
				x: 0,
				borderRadius: 0
			})
			.to(cmpSidebar, {
				xPercent: 0,
				scale: 1
			}, "<")
	}

	howWeWorkTL
		.from(cmpNavItems, {
			x: -50,
			autoAlpha: 0,
			stagger: 0.2
		}, "<");

	if (!isMobile) {
		const howWeWorkFixTL = gsap.timeline({
			scrollTrigger: {
				trigger: howWeWorkEl,
				start: 'top top',
				end: '+=300',
				scrub: 1,
				pin: true
			},
			ease: "power1.inOut"
		});
	}


	// Services cards
	const servicesGridEL = qs('.services-grid');
	const servicesGridTL = gsap.timeline({
		scrollTrigger: {
			trigger: servicesGridEL,
			start: 'top 70%'
		},
		ease: "power1.inOut"
	});

	servicesGridTL
		.from(qsa('.service-card', servicesGridEL), {
			y: 100,
			autoAlpha: 0,
			duration: 1,
			stagger: 0.2
		});

});

function random(min, max) {
	if (max == null) { max = min; min = 0; }
	return Math.random() * (max - min) + min;
}