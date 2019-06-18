jQuery(document).ready(function(){ 
	// --------------------------------------------------------
	//  Testimonial Slider
	// --------------------------------------------------------

	$('#testimonials').flexslider({
		animation:"fade",
		slideshow : true,
		controlNav : true,
		directionNav: false,
		slideshowSpeed: 5000, //Set the speed of the slideshow cycling, in milliseconds
		animationSpeed: 600 //Set the speed of animations, in milliseconds
	});
	
	// --------------------------------------------------------
	//	Fancy box
	// -------------------------------------------------------- 
	
	$('.fancybox').fancybox({
		'overlayShow'	: true, //Toggle overlay
		'opacity'		: true, //When true, transparency of content is changed for elastic transitions
		'transitionIn'	: 'elastic',
		'transitionOut'	: 'none',
		'overlayOpacity'	:   0.8 //Opacity of the overlay (from 0 to 1; default - 0.3)
	});
	
});


