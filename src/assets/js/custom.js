$(document).ready(function(){

	/*var pixeles = 100;*/
	/*var tiempo = 50;*/
	p = 0;
	var plato = $('.menu').height()/3;
  	var menu = $('.menu');
  	console.log(plato);

	setInterval(function(){

	$('.menu').animate({ scrollTop: (p += plato + 77) }, 1000);

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