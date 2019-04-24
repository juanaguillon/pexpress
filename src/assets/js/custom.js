$(document).ready(function () {

	/*var pixeles = 100;*/
	/*var tiempo = 50;*/
	p = 0;
	var plato = $('.menu').height() / 3;
	var menu = $('.menu');


	setInterval(function () {

		var scroll = $('.menu').scrollTop();

		if (scroll >= 1400) {

			p = 0;

			$('.menu').animate({ scrollTop: (0) }, 4000);

		} else {
			$('.menu').animate({ scrollTop: (p += plato + 77) }, 2000);

		}

	}, 10000);

	
});

setInterval( function() {

	$('.scale-animation').toggleClass('active');
	
}, 600);

$(window).on('resize', function( ){
	var s = $(".exec-lanuchers").position();
	if(s.left > 1){
		var cheight = $("owl-carousel").height()
		$("owl-carousel").height(cheight + s.left);
	}
	console.log( s )
});


