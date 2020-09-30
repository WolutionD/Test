$(document).ready(function () {
  $("#address")
    .on("focusin", function () {
      $("#hint").fadeIn(300);
    })
    .on("focusout", function () {
      $("#hint").fadeOut(300);
    });

  var pullAddresses = new Array();

  function give_array_address(result) {
    let value;
    for (index = 0; index < result["suggestions"].length; ++index) {
      value = result["suggestions"][index];
      pullAddresses.push(value["value"]);
    }
    post_list(pullAddresses);
  }

  function post_list(addresses) {
    $("#addressesList").html("");
    for (index = 0; index < addresses.length; ++index) {
      $("#addressesList").append(
        "<li id='li" + index + "'>" + addresses[index] + "</li>"
      );
    }
  }

  $("#address").on("keyup", function () {
    if ($("this").text() != " ") {
      pullAddresses.length = 0;
      var url =
        "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
      var token = "dc90e98752f0d5d9250222e82042d6394defa78a";
      var query = $(this).val();

      var options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + token,
        },
        body: JSON.stringify({ query: query }),
      };

      fetch(url, options)
        .then((response) => response.text())
        .then((result) => give_array_address(JSON.parse(result)))
        .catch((error) => console.log("error", error));
    }
  });
});
