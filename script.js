$(document).ready(function() {
    var city = "";
    var citiesArray = [];
    getData();


    $("#city-search").keyup(function(event) {
        var code = event.which;
        if (code == 13) {
            event.preventDefault();
            setData();
            getData();
            getWeather(city);
            
        }
    });

    $(".btn-search").on("click", function() {
        setData();
        getData();
        getWeather(city);
        
    });

    function setData() {
        city = $("#city-search").val().trim();
        citiesArray.push(city);
        for (var i = 0; i < citiesArray.length; i++) {
            localStorage.setItem(citiesArray[i], citiesArray[i]);
        }
        console.log(citiesArray);
        console.log("city: " + city);

        
    }

    function getData() {
        $(".list-group").empty();
        for (var i = 0; i < citiesArray.length; i++) {
            //create li
            var li = $("<li>");
            //set li attributes
            li.addClass("list-group-item");

            //create button
            var darkBtn = $("<button>");
            //set button attributes
            darkBtn.addClass("btn btn-dark");
            darkBtn.attr("type", "button");
            //set button text()
            darkBtn.text(localStorage.getItem(citiesArray[i]));


            
            //add button functionality
            var buttonVal = darkBtn.text();
            darkBtn.on("click", function() {
                getWeather(buttonVal);
            });

            //set button as html of li
            li.html(darkBtn);
            
            //prepend li to ul
            $(".list-group").prepend(li);
        }
    }

    var getWeather = function(place) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&units=imperial" + "&apikey=4d721e459b51eed9d4d8047d079984e6";
        $.ajax({
          url:queryURL,
          method:"GET"
        }).then(function(response) {
          console.log(response);
          //
          $("#city-name").text(response.name + ", " + response.sys.country + " " + moment().format('l'));
          $("#temp").text("Temperature: " + response.main.temp + " F");
          $("#humidity").text("Humidity: " + response.main.humidity + "%");
          $("#wind-speed").text("Wind-Speed: " + response.wind.speed + " mph");
          $("#UV-index").text("UV Index: ");
        })
    };
    
    
});