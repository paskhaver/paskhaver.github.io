'use strict';
$(window).on("load", function() {


 //PRELOADER
 $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.


if ($('.isotope_items').length) {

    // PORTFOLIO ISOTOPE
     var $container = $('.isotope_items');
     $container.isotope();

    $('.portfolio_filter ul li').on("click", function(){
        $(".portfolio_filter ul li").removeClass("select-cat");
        $(this).addClass("select-cat");
        var selector = $(this).attr('data-filter');
        $(".isotope_items").isotope({
            filter: selector,
    });
        return false;
    });

}


        // WOW JS
    if ($('.wow').length) {
        new WOW({ mobile: false }).init();
    }

}); // window load end



    $(document).on("ready", function() {



        // SWITCHER OPEN
		$('.color-switcher .open').on("click", function() {
			$('.color-switcher').toggleClass("open-switcher");
		});


    // ONE PAGE SCROLL
    if ($('.home').length) {
        $(document).on("scroll", onScroll);
        //smoothscroll
        $('.backtop, .home-down, .nav-menu li a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            $(document).off("scroll");
            $('.nav-menu li a').each(function () {
                $(this).removeClass('selected');
                if ($(window).width() < 768) {
                    $('.nav-menu').slideUp();
                }
            })
            $(this).addClass('selected');
            var target = this.hash
                , //  menu = target;
                $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 70
            }, 500, 'swing', function () {
                window.location.hash = target;
                $(document).on("scroll", onScroll);
            });
        });

        function onScroll(event) {
            var scrollPos = $(document).scrollTop();
            $('.nav-menu li a').each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                if (refElement.position().top - 73 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                    $('.nav-menu li a').removeClass("selected");
                    currLink.addClass("selected");
                }
                else {
                    currLink.removeClass("selected");
                }
            });
        }
    }


    //NAVBAR SHOW - HIDE
    if ($('.home').length) {
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            var homeheight = $(".home").height() - 73;
            if (scroll > homeheight) {
                $("header").addClass("nav-fixed");
            }
            else {
                $("header").removeClass("nav-fixed");
            }
        });
    }


    // HOME PAGE HEIGHT
    if ($('.home').length) {
        function centerInit() {
            var hometext = $('.home')
            hometext.css({
                "height": $(window).height() + "px"
            });
        }
        centerInit();
        $(window).resize(centerInit);
    }


    //SLIDE MENU
    if ($('.right-menu').length) {
    (function ($) {
        $(".right-menu").on('click', function () {
            $("body").hasClass("slidemenu-opened") ? k() : T()
        });
    })(jQuery);

    function T() {
        $("body").addClass("slidemenu-opened")
    }

    function k() {
        $("body").removeClass("slidemenu-opened")
    }
    }


        // RESPONSIVE MENU
       if ($('.responsive').length) {
           $('.responsive').on('click', function (e) {
               $('.nav-menu').slideToggle();
           });
       }


    // CUSTOM SCROLLBAR
    if ($('.scroll-out, .nav-scroll').length) {
        $(function () {
            $('.scroll-out, .nav-scroll').perfectScrollbar({
                suppressScrollX: true
                , wheelSpeed: 100
            });
        });
    }



    // HOME TYPED JS
    if ($('.element').length) {
        $('.element').each(function () {
            $(this).typed({
                strings: [$(this).data('text1'), $(this).data('text2'), $(this).data('text3')],
                loop: $(this).data('loop') ? $(this).data('loop') : false ,
                backDelay: $(this).data('backdelay') ? $(this).data('backdelay') : 2000 ,
                typeSpeed: 10,
            });
        });
    }


    // OWL CAROUSEL GENERAL JS
    if ($('.owl-carousel').length) {
        $('.owl-carousel').each(function () {
            $(this).owlCarousel({
                items: $(this).data('items') ? $(this).data('items') : 3
                , autoPlay: $(this).data('autoplay') ? $(this).data('autoplay') : 2500
                , pagination: $(this).data('pagination') ? $(this).data('pagination') : false
                , itemsDesktop: [1199, 3]
                , itemsDesktopSmall: [979, 3]
            });
        });
    }


    // BLOG GALLERY
    if ($('.carousel').length) {
        $('.carousel').carousel({
            interval: 3000
        })
    }




// MAGNIFIC POPUP FOR PORTFOLIO PAGE
if ($('.image-link').length) {
    $('.image-link').magnificPopup({
        type: 'image'
    });
}

//TWITTER
if ($('.widget-twitter .tweet').length) {
$('.widget-twitter .tweet').twittie({
    username: 'envato'
    , list: null
    , dateFormat: '%B %d, %Y'
    , template: '{{tweet}} <br/> <strong class="date">{{date}}</strong>'
    , count: 3

});
    }


    // ACCORDION MENU
    $('.panel-heading a').on('click', function (e) {
        $('.panel-heading a i').addClass('fa-chevron-down');
        if ($(this).hasClass('collapsed') === true) {
            $(this).children('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        }
        else {
            $(this).children('i').removeClass('fa-chevron-up');
        }
    });




}); // document ready end






/* Contact Form JS*/
(function ($) {
    'use strict';
    if ($('.contact-form').length) {
        $(".contact-form").on('submit', function (e) {
            e.preventDefault();
            var uri = $(this).attr('action');
            $("#con_submit").val('Wait...');
            var con_name = $("#con_name").val();
            var con_email = $("#con_email").val();
            var con_message = $("#con_message").val();
            var required = 0;
            $(".requie", this).each(function () {
                if ($(this).val() == '') {
                    $(this).addClass('reqError');
                    required += 1;
                }
                else {
                    if ($(this).hasClass('reqError')) {
                        $(this).removeClass('reqError');
                        if (required > 0) {
                            required -= 1;
                        }
                    }
                }
            });
            if (required === 0) {
                $.ajax({
                    type: "POST"
                    , url: 'mail.php'
                    , data: {
                        con_name: con_name
                        , con_email: con_email
                        , con_message: con_message
                    }
                    , success: function (data) {
                        $(".contact-form input, .contact-form textarea").val('');
                        $("#con_submit").val('Done!');
                        $("#con_submit").addClass("ok");
                    }
                });
            }
            else {
                $("#con_submit").val('Failed!');
            }
        });
        $(".requie").keyup(function () {
            $(this).removeClass('reqError');
        });
    }
})(jQuery);
