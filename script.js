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
          
          var code = response.weather[0].icon;
          console.log(code);
          
          var imgSrc = "https://openweathermap.org/img/wn/" + code + ".png";
          console.log(imgSrc);
          var iconImg = $("<img>").attr("src", imgSrc);
          iconImg.attr("alt", response.weather[0].main);
          
          $(".forecast").addClass("show");
          //
          $("#city-name").text(response.name + ", " + response.sys.country + " " + moment().format('l'));
          
          $("#icon").html(iconImg);
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
                        $("#UV-index").css({"color": "white", "background-color": "rgb(131, 131, 55)"});
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

                    //-----------------------plus-one icon-----------------------------------------
                    var code6 = response.list[6].weather[0].icon;
                    console.log(code6);
                    var imgSrc6 = "https://openweathermap.org/img/wn/" + code6 + ".png";
                    console.log(imgSrc6);
                    var iconImg6 = $("<img>").attr("src", imgSrc6);

                    //-----------------------plus-two icon-----------------------------------------
                    var code14 = response.list[14].weather[0].icon;
                    console.log(code14);
                    var imgSrc14 = "https://openweathermap.org/img/wn/" + code14 + ".png";
                    console.log(imgSrc14);
                    var iconImg14 = $("<img>").attr("src", imgSrc14);
                    //-----------------------plus-three icon-----------------------------------------
                    var code22 = response.list[22].weather[0].icon;
                    console.log(code22);
                    var imgSrc22 = "https://openweathermap.org/img/wn/" + code22 + ".png";
                    console.log(imgSrc22);
                    var iconImg22 = $("<img>").attr("src", imgSrc22);
                    //-----------------------plus-four icon-----------------------------------------
                    var code30 = response.list[30].weather[0].icon;
                    console.log(code30);
                    var imgSrc30 = "https://openweathermap.org/img/wn/" + code30 + ".png";
                    console.log(imgSrc30);
                    var iconImg30 = $("<img>").attr("src", imgSrc30);
                    //-----------------------plus-five icon-----------------------------------------
                    var code38 = response.list[38].weather[0].icon;
                    console.log(code38);
                    var imgSrc38 = "https://openweathermap.org/img/wn/" + code38 + ".png";
                    console.log(imgSrc38);
                    var iconImg38 = $("<img>").attr("src", imgSrc38);
                
                    //------------------------------------------dynamically add content to html here------------------------------------------------------
                    //set dates dynamically using moment().js 
                    $("#plus-one h5").text(moment().add(1, "days").format("l"));
                    $("#plus-two h5").text(moment().add(2, "days").format("l"));
                    $("#plus-three h5").text(moment().add(3, "days").format("l"));
                    $("#plus-four h5").text(moment().add(4, "days").format("l"));
                    $("#plus-five h5").text(moment().add(5, "days").format("l"));

                    //#plus-one here-------------------------
                    $("#plus-one .icon-5").html(iconImg6);
                    $("#plus-one .temp-5").text("Temp: " + response.list[6].main.temp + " °F");
                    $("#plus-one .humidity-5").text("Humidity: " + response.list[6].main.humidity + "%");

                    //#plus-two here-------------------------
                    $("#plus-two .icon-5").html(iconImg14);
                    $("#plus-two .temp-5").text("Temp: " + response.list[14].main.temp + " °F");
                    $("#plus-two .humidity-5").text("Humidity: " + response.list[14].main.humidity + "%");

                    //#plus-three here-------------------------
                    $("#plus-three .icon-5").html(iconImg22);
                    $("#plus-three .temp-5").text("Temp: " + response.list[22].main.temp + " °F");
                    $("#plus-three .humidity-5").text("Humidity: " + response.list[22].main.humidity + "%");

                    //#plus-four here-------------------------
                    $("#plus-four .icon-5").html(iconImg30);
                    $("#plus-four .temp-5").text("Temp: " + response.list[30].main.temp + " °F");
                    $("#plus-four .humidity-5").text("Humidity: " + response.list[30].main.humidity + "%");

                    //#plus-five here-------------------------
                    $("#plus-five .icon-5").html(iconImg38);
                    $("#plus-five .temp-5").text("Temp: " + response.list[38].main.temp + " °F");
                    $("#plus-five .humidity-5").text("Humidity: " + response.list[38].main.humidity + "%");

                })
            };
            
            getUV();
            fiveDay();
            
        })
        
        
    };
    
    
    
});