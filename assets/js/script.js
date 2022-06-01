$(document).ready(function () {
  // logo animation
  let winWidth = $("body").width();
  console.log(winWidth);
  let logo_diff = 8;
  if (winWidth <= 1024) {
    logo_diff = 7.5;
  }

  //
  let diff = 35;
  logo_diff += diff;
  $(document).scroll(function () {
    let scrollTop = $(document).scrollTop();
    if (scrollTop >= 10 && scrollTop < logo_diff) {
      let opacity = 5 / scrollTop;
      $(".logo_delete").css("opacity", opacity);
      if (scrollTop >= diff && scrollTop <= logo_diff) {
        $(".logo_move").css(
          "transform",
          "translateX(-" + (scrollTop - diff) + "em)"
        );
      } else {
        $(".logo_move").css("transform", "translateX(0px)");
      }
    } else if (scrollTop >= logo_diff) {
      $(".logo_move").css(
        "transform",
        "translateX(-" + (logo_diff - diff) + "em)"
      );
      $(".logo_delete").css("opacity", "0");
    } else {
      $(".logo_move").css("transform", "translateX(0px)");
      $(".logo_delete").css("opacity", "1");
    }

    if ($(window).width() <= 1080) {
      if (scrollTop >= 200) {
        $("header").css("transform", "translateY(-50vh)");
      } else {
        $("header").css("transform", "translateY(0vh)");
      }
    }
  });

  // detect language

  let init_lang = localStorage.getItem("lang");
  let default_lang = "en";

  if (init_lang != null) {
    $("#lang ." + init_lang)
      .addClass("active")
      .siblings()
      .removeClass("active");
    changeLang(init_lang);
  } else {
    $("#lang ." + default_lang)
      .addClass("active")
      .siblings()
      .removeClass("active");
    changeLang(default_lang);
  }

  // click event on language

  $("#lang > div").click(function () {
    if ($(this).hasClass("active")) {
      $(this).parent().toggleClass("show");
    } else {
      $(this).addClass("active").siblings().removeClass("active");
      $(this).parent().removeClass("show");
      let lang = $(this).data("lang");
      localStorage.setItem("lang", lang);
      changeLang(lang);
    }
  });

  // custom function
  function changeLang(lang) {
    $(".lang").each(function () {
      $(this).text($(this).data(lang));
    });

    $(".lang-show").each(function () {
      $(this).hide();
      if ($(this).hasClass(lang)) {
        $(this).show();
      }
    });

    $(".lang-hide").each(function () {
      $(this).removeClass("visible");
      if ($(this).hasClass(lang)) {
        $(this).addClass("visible");
      }
    });

    $(".lang-mail").each(function () {
      $(this).attr("href", $(this).data(lang));
    });

    $(".lang-link").each(function () {
      $(this).attr("href", $(this).data(lang));
    });

    $(".lang-post-id").each(function () {
      $(this).attr("id", $(this).data(lang));
    });
  }

  /*Wow Animations*/
  if ($(".wow").length && $(window).outerWidth() >= 567) {
    let wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: false,
      live: true,
    });
    wow.init();
  }

  /* ------- Smooth scroll ------- */
  $("a.pagescroll").on("click", function (event) {
    event.preventDefault();
    let action = $(this.hash).offset().top;
    $("html,body").animate(
      {
        scrollTop: action,
      },
      1200
    );
  });

  // slider
  $(".home_slider").owlCarousel({
    loop: true,
    nav: true,
    items: 4,
    margin: 15,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 2,
        nav: false,
      },
      768: {
        items: 3,
        nav: false,
      },
      1000: {
        items: 4,
        nav: true,
        loop: false,
      },
    },
  });

  $("#services_slider").owlCarousel({
    loop: true,
    nav: true,
    items: 2,
    margin: 10,
    touchDrag: false,
    mouseDrag: false,
    responsiveClass: true,
    smartSpeed: 700,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 2,
        nav: false,
      },
      768: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 2,
        nav: true,
        loop: false,
      },
    },
  });

  $("#footer_logo img")
    .on("mouseover", function () {
      $(this).attr("src", "assets/images/logo-red.png");
    })
    .on("mouseout", function () {
      $(this).attr("src", "assets/images/logo-white.png");
    });

  // add class on page load - in the first item
  $("#services_slider").find(".owl-item.active").first().addClass("full-op");

  // next button
  $("#services_slider .owl-next").click(function () {
    console.log($("#services_slider").find(".owl-item.full-op").next());
    if (
      $("#services_slider").find(".owl-item.full-op").next().length &&
      !$("#services_slider")
        .find(".owl-item.full-op")
        .next()
        .find(".item")
        .hasClass("hide")
    )
      $("#services_slider")
        .find(".owl-item.full-op")
        .removeClass("full-op")
        .next()
        .addClass("full-op");
  });

  // prev button
  $("#services_slider .owl-prev").click(function () {
    console.log($("#services_slider").find(".owl-item.full-op").prev());
    if ($("#services_slider").find(".owl-item.full-op").prev().length)
      $("#services_slider")
        .find(".owl-item.full-op")
        .removeClass("full-op")
        .prev()
        .addClass("full-op");
  });

  // side nav open/close
  $("#nav_opener").click(function (e) {
    e.preventDefault();
    $("#menu").toggleClass("active");
    $(this).toggleClass("active");
    $("body").toggleClass("no_overflow");
  });

  // accordion toggle
  $(".accordion .toggle").click(function (e) {
    e.preventDefault();
    $(this).parent().toggleClass("show");
    var inner = $(this).next();
    inner.slideToggle(450, function () {
      inner.toggleClass("fadingIn");
    });
  });

  $.ajax({
    url: "http://ip-api.com/json",
    type: "GET",
    success: function (json) {
      let curCountry = json.country;
      console.log(curCountry);

      if (curCountry == "Germany") {
        $("#lang .de:not(.active)").click();
      } else if (curCountry == "Poland") {
        $("#lang .pl:not(.active)").click();
      } else {
        $("#lang .en:not(.active)").click();
      }
    },
    error: function (err) {
      console.log("Request failed, error= " + err);
    },
  });

  // customise cookies button

  $("#cookieCustomizeBarConfirm").click(function () {
    $("#tab_2_btn").click();
  });

  $("#cookieDeclineBarConfirm").on("click", function () {
    $.cookie("declineCookie", "active", { expires: 1 }); // cookie will expire in 1 day
    $("#cookieAcceptPopup").fadeOut(500);
  });

  // Check cookie
  if ($.cookie("necessaryCookie") != "active") $("#cookieAcceptPopup").show();
  // if ($.cookie("declineCookie") != "active") $("#cookieAcceptPopup").show();

  //Assign cookie on click
  $("#cookieAcceptBarConfirm").on("click", function () {
    $.cookie("necessaryCookie", "active", { expires: 365 }); // cookie will expire in 360 days
    $("#cookieAcceptPopup").fadeOut(500);
  });

  

});
