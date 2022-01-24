$(document).ready(function () {


    // logo animation
    let logo_diff = 140;
    // 
    let diff = 35;
    logo_diff += diff;
    $(document).scroll(function () {
        let scrollTop = $(document).scrollTop();
        if (scrollTop >= 10 && scrollTop < logo_diff) {
            let opacity = 5 / scrollTop;
            $('.logo_delete').css("opacity", opacity);
            if (scrollTop >= diff && scrollTop <= logo_diff) {
                $(".logo_move").css("transform", "translateX(-" + (scrollTop - diff) + "px)")
            } else {
                $(".logo_move").css("transform", "translateX(0px)")
            }
        } else if (scrollTop >= logo_diff) {
            $(".logo_move").css("transform", "translateX(-" + (logo_diff - diff) + "px)");
            $('.logo_delete').css("opacity", "0");
        } else {
            $(".logo_move").css("transform", "translateX(0px)")
            $('.logo_delete').css("opacity", "1");
        }

        if ($(window).width() <= 1080) {
            if (scrollTop >= 200) {
                $("header").css("transform", "translateY(-50vh)")
            } else {
                $("header").css("transform", "translateY(0vh)")
            }
        }


    });



    $("#lang > div").click(function () {
        if ($(this).hasClass("active")) {
            $(this).parent().toggleClass("show");
        }
    })



    $("#lang > div").click(function () {
        if (!$(this).hasClass("active")) {
            $(this).addClass("active").siblings().removeClass("active");
            $(this).parent().removeClass("show");
        }
    })






    /* ------- Smooth scroll ------- */
    $(".pagescroll a:not(.default-link)").on("click", function (event) {
        event.preventDefault();
        let action = $(this.hash).offset().top;
        action -= 95;
        $("html,body").animate({
            scrollTop: action
        }, 150);
    });





    // slider

    $('.owl-carousel').owlCarousel({
        loop: true,
        nav: true,
        items: 4,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: false
            },
            768: {
                items: 3,
                nav: false
            },
            1000: {
                items: 4,
                nav: true,
                loop: false
            }
        }
    })



    $("#nav_opener").click(function () {
        $("#menu").toggleClass("active");
        $(this).toggleClass("active")
        $("body").toggleClass("no_overflow")
    })



})