$(function () {
  if ($(".loading_overlay")[0]) {
    $(".loading_overlay").fadeOut("fast");
  }
  $("#profile_inputs .item input,#profile_inputs .item textarea").attr(
    "disabled",
    true
  );

  if ($(window).width() < 991) {
    $("#lightgallery").addClass("slider");
  }
  if ($("#lightgallery")[0]) {
    $("#lightgallery").lightGallery();
  }
  if ($("#lightgalleryStore")[0]) {
    $("#lightgalleryStore").lightGallery();
  }
  if ($("#lightgallery_uploads")[0]) {
    $("#lightgallery_uploads").lightGallery({
      selector: ".gallery_img",
    });
  }

  if ($(".slider")[0]) {
    $(".slider").slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: "linear",
    });
  }
  if ($("#buttons_slider")[0]) {
    $("#buttons_slider").slick({
      slidesToShow: 5,
      slidesToScroll: 3,
      infinite: false,
      dots: false,
      arrows: false,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 360,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    });
  }

  $(window).scroll(function () {
    if ($("#scrollTop")[0]) {
      if ($(this).scrollTop() >= 400) {
        $("#scrollTop").fadeIn("fast");
      } else {
        $("#scrollTop").fadeOut("fast");
      }
    }
  });

  $("#scrollTop").click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500
    );
  });

  $(window).on("click", function (e) {
    switch (e.target.className) {
      case "modal_body":
        $(".modal_site").fadeOut("fast");
        $("body").css("overflow-y", "scroll");
        break;
      case "mobile_menu":
        $(".mobile_menu")
          .fadeOut("fast")
          .find(".main")
          .removeClass("active_menu");
        $(".bottom_navigation").removeClass("hideBottomNav");
      default:
        break;
    }
    $(".select_box_in").fadeOut("fast");
  });

  $(document).keydown(function (event) {
    if (event.keyCode == 27) {
      $(".modal_site").fadeOut();
      $("body").css("overflow-y", "scroll");
    }
  });

  $(".btn_select_box").on("click", function (e) {
    e.stopPropagation();
    var thisBtn = $(this);
    $(this)
      .siblings(".select_box_in")
      .find(".select")
      .on("click", function () {
        if ($(this).find(".text")[0]) {
          thisBtn.find(".now_text").text($(this).find(".text").text());
        } else {
          return;
        }
      });
    $(this).siblings(".select_box_in").stop().fadeToggle("fast");
  });

  $(".btn_switch").on("click", function () {
    $(this).parents(".buttons").find(".btn_switch").removeClass("active_btn");
    $(this).addClass("active_btn");
  });

  $(".modal_btn").on("click", function () {
    $("body").css("overflow-y", "hidden");
    let dataId = $(this).attr("data-id");
    $(".modal_site").fadeOut("fast");
    $(".mobile_menu").fadeOut("fast").find(".main").removeClass("active_menu");
    $(`#${dataId}`).fadeIn("fast");
  });

  $("#menu_btn").on("click", function () {
    $(this)
      .siblings(".mobile_menu")
      .fadeIn("fast")
      .find(".main")
      .addClass("active_menu");
    $(".bottom_navigation").addClass("hideBottomNav");
  });
  $(".close_fit").on("click", function () {
    $(".fit_modal").fadeOut("fast");
    $("body").css("overflow-y", "scroll");
  });
  $(".closeModal").on("click", function () {
    $(".modal_site").fadeOut("fast");
    $("body").css("overflow-y", "scroll");
  });

  $(".product_customer_action").on("click", function () {
    let thisId = $(this).attr("data-id");
    $(`#${thisId}`).fadeToggle("fast");
    $(this).toggleClass("reported");
  });

  $(".slick-arrow, .slick-dots").on("click", function (e) {
    e.preventDefault();
  });

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#imagePreview").attr("src", e.target.result);
        $("#imagePreview").hide();
        $("#imagePreview").fadeIn(650);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#imageUpload").change(function () {
    readURL(this);
  });

  $("#btn_edit").on("click", function () {
    // click etdikde button sumbite cevrilir.
    // ikinci clickde sorgunu gonder sehifeni refresh et

    let thisDataAttr = $(this).attr("data-attr");

    $(this).text(thisDataAttr).css("background-color", "#ef3a3a");

    $("#profile_inputs .item")
      .addClass("active_inputs")
      .find("input, textarea")
      .attr("disabled", false);

    setTimeout(() => {
      $(this).attr("type", "submit");
    }, 500);
  });

  $("#around_search_btn").on("click", function () {
    $(this).fadeOut("fast");
    $("#search_around").fadeIn("fast");
  });

  $(".tab_navbar .btn_switch").on("click", function () {
    let dataId = $(this).attr("data-id");
    $(".tab_content .tab").removeClass("active_tab");
    $(`#${dataId}`).addClass("active_tab");
  });
  $(".reset").on("click", function () {
    window.location.reload();
  });

  var allImageCountProduct = $(".gallery .items .item");

  $(".product_image_count .count").text(allImageCountProduct.length);

  var imageDiv = "";
  var imageState = [];
  imageDiv = $("#lightgallery_uploads");

  $("#multi_img_input").on("change", handleFileSelect);

  $(document).on("click", ".upload_images .item .remove", removeImageFile);

  function handleFileSelect(e) {
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    filesArr.forEach(function (f) {
      if (f.type.match("image.*")) {
        imageState.push(f);
        var reader = new FileReader();
        reader.onload = function (e) {
          var innerItemImage = `<div class="item sortable_item">
                    <a class="img gallery_img" data-src="${e.target.result}">
                        <img src="${e.target.result}" alt="#">
                    </a>
                    <div class="actions">
                        <button type="button" class="remove" data-file='${f.name}'>
                            <img onload="SVGInject(this)" src="./assets/images/icons/trash.svg" alt="#">
                        </button>
                        <div class="right">
                            <button type="button" class="reverseLeft">
                                <img src="./assets/images/icons/reverse-left.png" alt="#">
                            </button>
                            <button type="button" class="reverseRight">
                                <img src="./assets/images/icons/reverse-right.png" alt="#">
                            </button>
                        </div>
                    </div>
                </div>`;
          imageDiv.append(innerItemImage);
          $("#lightgallery_uploads").data("lightGallery").destroy(true);
          $("#lightgallery_uploads").lightGallery({
            selector: ".gallery_img",
          });
        };
        reader.readAsDataURL(f);
      }
    });
  }
  function removeImageFile() {
    var file = $(this).data("file");
    for (var i = 0; i < imageState.length; i++) {
      if (imageState[i].name === file) {
        imageState.splice(i, 1);
        break;
      }
    }
    $(this).parents(".item").remove();
  }

  var value = 0;

  function reverseImg(elem, val) {
    value += val;
    $(elem).css("transform", `rotate(${value}deg)`);
  }

  $(document).on("click", ".reverseLeft", function () {
    reverseImg($(this).parents(".item").find(".img").find("img"), 90);
  });
  $(document).on("click", ".reverseRight", function () {
    reverseImg($(this).parents(".item").find(".img").find("img"), -90);
  });

  $("#new_product_btn").on("click", function () {
    console.log("latitude", currentLocation.lat());
    console.log("longitude", currentLocation.lng());
  });

  $(".likeProductIn").on("change", function () {
    $(".likeProductIn").not(this).prop("checked", this.checked);
  });

  $(".btn_category").on("click", function () {
    const thisId = $(this).attr("data-id");
    $(`#${thisId}`).addClass("active_category");
    $("body").css("overflow-y", "hidden");
  });

  $(".back_modal").on("click", function () {
    $(this).parents(".category_modal").removeClass("active_category");
    if (!$(".category_modal").hasClass("active_category")) {
      $("body").css("overflow-y", "scroll");
    }
  });

  $(".close_category_modal").on("click", function () {
    $(".category_modal").removeClass("active_category");
    $("body").css("overflow-y", "scroll");
  });

  var scrollPos = 0;

  $(window).on("scroll", function () {
    if ($(document).scrollTop() < 110) {
      $("#header").removeClass("hideHeader");
      $("#header").removeClass("miniHeader");
      $("header").removeClass("hideHeader");
      $(".bottom_navigation").removeClass("hideBottomNav");
    } else {
      $("#header").addClass("miniHeader");
      if (document.body.getBoundingClientRect().top > scrollPos) {
        $("#header").removeClass("hideHeader");
        $(".bottom_navigation").removeClass("hideBottomNav");
      } else {
        $("#header").addClass("hideHeader");
        $("header").addClass("hideHeader");
        $(".bottom_navigation").addClass("hideBottomNav");
      }
      scrollPos = document.body.getBoundingClientRect().top;
    }
  });

  $(".callBtn").click(function () {
    $("html,body").animate(
      {
        scrollTop: $(".scrollToCall").offset().top - 20,
      },
      "slow"
    );

    setTimeout(() => {
      $("#header").addClass("hideHeader");
    }, 900);
  });

  $(".btn_bottom_sheet").on("click", function () {
    var thisBtnSheet = $(this);
    var oldLabelValue = $(this).siblings("label").text();
    let thisID = $(this).attr("data-id");
    $(`#${thisID}`).addClass("active_sheet");

    $(".checkboxes_sheet .check_box input").on("change", function () {
      var selectedValue = new Array();

      $(`#${thisID} .check_box input:checked`).each(function () {
        selectedValue.push($(this).siblings("label").text());
      });

      if ($(`#${thisID} .check_box input`).is(":checked")) {
        thisBtnSheet.find(".nowValue").html(selectedValue.join(", "));
      } else {
        thisBtnSheet.find(".nowValue").html(oldLabelValue);
        thisBtnSheet.find(".btn_remove").fadeOut("fast");
      }
      if (selectedValue.length > 0) {
        thisBtnSheet.find(".btn_remove").fadeIn("fast");
      }
    });

    $(`#${thisID}`)
      .find(".remove_all_check")
      .on("click", function () {
        $(this)
          .parents(".bottom_sheet")
          .find(".check_box input")
          .prop("checked", false);

        thisBtnSheet.find(".nowValue").html(oldLabelValue);
        thisBtnSheet.find(".btn_remove").fadeOut("fast");
      });

    $(this)
      .find(".btn_remove")
      .on("click", function (e) {
        e.stopPropagation();
        $(this).siblings(".nowValue").html(oldLabelValue);
        $(this).fadeOut("fast");
        $(`#${thisID}`).find(".check_box input").prop("checked", false);
      });

    $(".close_sheet").on("click", function () {
      $(".bottom_sheet").removeClass("active_sheet");
    });
  });

  $(".follow input").on("click", function () {
    $(".follow input").prop("checked", $(this).is(":checked"));
  });
});
