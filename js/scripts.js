document.addEventListener('DOMContentLoaded', function(){
	const isMobile = $(window).width() < 992;

	$('.menu-opener').click(function(e){
		e.preventDefault();

		// тут обычно идет код открытия меню, но его в дизайне нет, поэтому просто меняю состояние
		$(this).toggleClass('active');
	});

	// Sticky Header
	let header = $('.header'),
		scrollPrev = 0;

	$(window).scroll(function() {
		let scrolled = $(window).scrollTop();

		scrolled > 0
			? header.addClass('sticky')
			: header.removeClass('sticky');

		if ( scrolled > 100 && scrolled > scrollPrev ) {
			header.addClass('out');
		} else {
			header.removeClass('out');
		}

		scrollPrev = scrolled;
	});

	// Order button
	const orderBtn = $('#js-order-btn');

	$(window).scroll(function() {
		let scrolled = $(window).scrollTop();

		scrolled > 100
			? orderBtn.addClass('out')
			: orderBtn.removeClass('out');

		scrolled > $('.how-we-work-section').offset().top - $(window).height() * 0.6
			? orderBtn.addClass('hide')
			: orderBtn.removeClass('hide');
	});

	//Order button
	orderBtn.each(function(i, btn){
		const distance = 200;

		function calculateDistance(rect, mouseX, mouseY){
			return Math.floor(Math.sqrt(Math.pow(mouseX - (rect.centerX), 2) + Math.pow(mouseY - (rect.centerY), 2)));
		}

		$(btn).on('mousemove', function(e){
			const rect = btn.getBoundingClientRect();
			rect.centerX = rect.x + (rect.width / 2);
			rect.centerY = rect.y + (rect.height / 2) + window.scrollY;

			const mouseX = e.pageX;
			const mouseY = e.pageY;
			const deltaX = Math.floor((rect.centerX - mouseX)) * -0.4;
			const deltaY = Math.floor((rect.centerY - mouseY)) * -0.4;
			const newDistance = calculateDistance(rect, mouseX, mouseY);

			if (window.innerWidth > 767) {
				if (newDistance < distance) {
					gsap.to(btn, { duration: .5, x: deltaX, y: deltaY });
				} else {
					gsap.to(btn, { duration: .5, x: 0, y: 0 });
				}
			}
		});

		$(btn).on('mouseleave', function(e){
			gsap.to(btn, { duration: .5, x: 0, y: 0 })
		});
	});
});

function qs(selector, parent = document){
	return parent.querySelector(selector);
}

function qsa(selector, parent = document){
	return parent.querySelectorAll(selector);
}