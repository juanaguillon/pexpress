$(document).ready(function () {

	/*var pixeles = 100;*/
	/*var tiempo = 50;*/
	p = 0;
	var plato = $('.menu').height() / 3;
	var menu = $('.menu');


	setInterval(function () {

		var scroll = $('.menu').scrollTop();

		console.log(scroll);

		if (scroll >= 1400) {

			p = 0;

			$('.menu').animate({ scrollTop: (0) }, 4000);

		} else {
			$('.menu').animate({ scrollTop: (p += plato + 77) }, 2000);

		}

	}, 10000);

});


// $('.owl-carousel').owlCarousel({
// autoplay: true,
// autoplaySpeed: 700,
//   loop:true,
//   margin:0,
//   nav:true,
//   responsive:{
//       0:{
//           items:1
//       },
//       600:{
//           items:1
//       },
//       1000:{
//           items:1
//       }
//   }
// })


function requestFullScreen(element) {
	// Supports most browsers and their versions.
	var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

	if (requestMethod) { // Native full screen.
		requestMethod.call(element);
	} else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
		var wscript = new ActiveXObject("WScript.Shell");
		if (wscript !== null) {
			wscript.SendKeys("{F11}");
		}
	}
}

var elem = document.body; // Make the body go full screen.
requestFullScreen(elem);