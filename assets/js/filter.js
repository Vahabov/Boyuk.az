$(function () {
  var menuLinks = $(".bar-top-menu ul>li>.btn_link");
  var mainValue = $("#mainValue").text();
  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener("click", function () {
      $("#mainValue").html($(this).html());
      $(".btn_remove").fadeIn("fast");
      $(".btn_remove").on("click", function () {
        $("#mainValue").html(mainValue);
        $(this).fadeOut("fast");
      });
    });
  }

  ////////////////////////////////////////////

  function formatState(state) {
    console.log("aaaaaaaaalllllaaaaaaaa \n lsllalalla  ", state);
    if (!state.id) {
      return state.text;
    }
    var $state = $(
      `<div class="check_box">
                <input type="checkbox" id="${state.text}" 
                ${state.selected ? "checked" : null} name="home" />
                <label for="${state.text}">${state.text}</label>
            </div>`
    );
    return $state;
  }

  $(".singleSelectSearch").select2({
    placeholder: "...",
    allowClear: true,
  });

  $(".singleSelect").select2({
    placeholder: "...",
    allowClear: true,
    minimumResultsForSearch: Infinity,
  });

  $(".multipleSelect").select2({
    closeOnSelect: false,
    allowClear: true,
    templateResult: formatState,
    placeholder: "...",
    tags: true,
  });

  for (let i = 0; i < $(".select2-search__field").length; i++) {
    const element = $(".select2-search__field")[i];
    setTimeout(() => {
      $(element).attr(
        "placeholder",
        $(element)
          .parents(".select2")
          .siblings(".select2-hidden-accessible")
          .attr("data-placeholder")
      );
    }, 500);
  }

  for (let i = 0; i < $(".select2-selection__placeholder").length; i++) {
    const element = $(".select2-selection__placeholder")[i];
    setTimeout(() => {
      $(element).html(
        $(element)
          .parents(".select2")
          .siblings(".select2-hidden-accessible")
          .attr("data-placeholder")
      );
    }, 500);
  }

});
