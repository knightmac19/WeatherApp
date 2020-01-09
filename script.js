$(document).ready(function() {
        
    var city = "";
    var citiesArray = [];
    getData();

    //Not working
    $(".btn-dark").on("click", function() {
        var searchTerm = $(this).val();
        console.log(searchTerm);
        getWeather(searchTerm);
    });


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
            li.css({"padding-left":"0px", "padding-right":"0px", "margin-top":"5px"});

            //create button
            var darkBtn = $("<button>");
            //set button attributes
            darkBtn.addClass("btn btn-dark");
            darkBtn.attr("type", "button");
            darkBtn.css({"width": "100%", "text-align": "center", "font-size": "1.1rem"});

            //set button text()
            darkBtn.text(localStorage.getItem(citiesArray[i]));

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
          $(".forecast").addClass("show");
          //
          $("#city-name").text(response.name + ", " + response.sys.country + " " + moment().format('l'));
          $("#temp").text("Temperature: " + response.main.temp + " °F");
          $("#humidity").text("Humidity: " + response.main.humidity + "%");
          $("#wind-speed").text("Wind-Speed: " + response.wind.speed + " MPH");
          
            var getUV = function() {
                var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?&apikey=4d721e459b51eed9d4d8047d079984e6" + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
                $.ajax({
                    url:queryURL2,
                    method: "GET"
                }).then(function(response) {
                    console.log("UV Index below------------------------");
                    console.log(response);
                    var displayNum = parseFloat(response.value).toFixed(2);
                    var indexNum = parseInt(response.value);
                    console.log("uv index: " + response.value + 100);
                    console.log(indexNum + 100);
                    
                    if (indexNum >= 0 && indexNum < 3) {
                        $("#UV-index").text("UV Index: " + displayNum);
                        $("#UV-index").css({"color": "white", "background-color": "green"});
                    } else if (indexNum >= 3 && indexNum < 6) {
                        $("#UV-index").text("UV Index: " + displayNum);
                        $("#UV-index").css({"color": "white", "background-color": "yellow"});
                    } else if (indexNum >= 6 && indexNum < 8) {
                        $("#UV-index").text("UV Index: " + displayNum);
                        $("#UV-index").css({"color": "white", "background-color": "orange"});
                    } else if (indexNum >= 8 && indexNum < 10) {
                        $("#UV-index").text("UV Index: " + displayNum);
                        $("#UV-index").css({"color": "white", "background-color": "red"});
                    } else {
                        $("#UV-index").text("UV Index: " + displayNum);
                        $("#UV-index").css({"color": "white", "background-color": "purple"});
                    }
                })
            };
            var fiveDay = function() {
                var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + response.name + "," + response.sys.country + "&units=imperial" + "&apikey=4d721e459b51eed9d4d8047d079984e6";
                $.ajax({
                    url:queryURL3,
                    method: "GET"
                }).then(function(response) {
                    console.log("5 day below:--------------------------------------");
                    console.log(response);
                    //------------------------------------------dynamically add content to html here------------------------------------------------------
                    //set dates dynamically using moment().js 
                    $("#plus-one h5").text(moment().add(1, "days").format("l"));
                    $("#plus-two h5").text(moment().add(2, "days").format("l"));
                    $("#plus-three h5").text(moment().add(3, "days").format("l"));
                    $("#plus-four h5").text(moment().add(4, "days").format("l"));
                    $("#plus-five h5").text(moment().add(5, "days").format("l"));

                    //#plus-one here-------------------------
                    $("#plus-one .icon-5").text(response.list[6].weather[0].main);
                    $("#plus-one .temp-5").text("Temp: " + response.list[6].main.temp + " °F");
                    $("#plus-one .humidity-5").text("Humidity: " + response.list[6].main.humidity + "%");

                    //#plus-two here-------------------------
                    $("#plus-two .icon-5").text(response.list[14].weather[0].main);
                    $("#plus-two .temp-5").text("Temp: " + response.list[14].main.temp + " °F");
                    $("#plus-two .humidity-5").text("Humidity: " + response.list[14].main.humidity + "%");

                    //#plus-three here-------------------------
                    $("#plus-three .icon-5").text(response.list[22].weather[0].main);
                    $("#plus-three .temp-5").text("Temp: " + response.list[22].main.temp + " °F");
                    $("#plus-three .humidity-5").text("Humidity: " + response.list[22].main.humidity + "%");

                    //#plus-four here-------------------------
                    $("#plus-four .icon-5").text(response.list[30].weather[0].main);
                    $("#plus-four .temp-5").text("Temp: " + response.list[30].main.temp + " °F");
                    $("#plus-four .humidity-5").text("Humidity: " + response.list[30].main.humidity + "%");

                    //#plus-five here-------------------------
                    $("#plus-five .icon-5").text(response.list[38].weather[0].main);
                    $("#plus-five .temp-5").text("Temp: " + response.list[38].main.temp + " °F");
                    $("#plus-five .humidity-5").text("Humidity: " + response.list[38].main.humidity + "%");

                })
            };
            
            getUV();
            fiveDay();
            
        })
        
        
    };
    
    
    
});