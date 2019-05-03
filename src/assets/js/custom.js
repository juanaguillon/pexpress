$(document).ready(function() {
  /*var pixeles = 100;*/
  /*var tiempo = 50;*/
  p = 0;
  var plato = $(".menu").height() / 3;
  var menu = $(".menu");

  setInterval(function() {
    var scroll = $(".menu").scrollTop();

    if (scroll >= 1400) {
      p = 0;

      $(".menu").animate({ scrollTop: 0 }, 4000);
    } else {
      $(".menu").animate({ scrollTop: (p += plato + 77) }, 2000);
    }
  }, 10000);
});

setInterval(function() {
  $(".scale-animation").toggleClass("active");
}, 600);

var slick1 = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
  pauseOnHover: false,
  pauseOnFocus: false
};

var slick2 = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
  pauseOnHover: false,
  pauseOnFocus: false
};

// $(window).on("resize", function() {
//   if ($(".slick_1").hasClass("slick-initialized")) {
//     $(".slick_1").slick("unslick");
//   }
//   if ($(".slick_2").hasClass("slick-initialized")) {
//     $(".slick_2").slick("unslick");
//   }

//   $(".slick_1").slick(slick1);
//   setTimeout(() => {
//     $(".slick_2").slick(slick2);
//   }, 3000);
// });

// if ($(".owl-carousel").hasClass("slick-initialized"))
//   $(".owl-carousel").slick("unslick");
// if ($(".owl-carouselD").hasClass("slick-initialized"))
// 	$(".owl-carouselD").slick("unslick");

// $(".owl-carousel").slick({
//   autoplay: true,
//   autoplaySpeed: 8000,
//   infinite: true,
//   pauseOnHover: false,
//   slidesToShow: 1,
//   swipe: false,
//   vertical: true
// });
// $(".owl-carouselD").slick({
//   autoplay: true,
//   autoplaySpeed: 8000,
//   infinite: true,
//   pauseOnHover: false,
//   slidesToShow: 1,
//   swipe: false,
//   vertical: true,
//   verticalReverse: true
// });
