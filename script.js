$(document).ready(function() {
    //in style.css --> html content with .forecast is set to invisible
    //@ line 89 it is set to visible


    //initializing variables, generating buttons from local storage
    var city = "";
    var citiesArray = JSON.parse(localStorage.getItem("citiesArray")) || [];
    getData();
    
    //click listener for the buttons once they are created
    $(document).on("click",".btn-dark", function() {
        var searchTerm = $(this).text();
        console.log(searchTerm);
        //passing each button's text into the main getWeather() function that runs all the API calls
        getWeather(searchTerm);
    });

    //grabs user input and runs getWeather() with 'enter' key
    $("#city-search").keyup(function(event) {
        var code = event.which;
        if (code == 13) {
            event.preventDefault();
            setData();
            getData();
            getWeather(city);
        }
    });
    
    //grabs user input and runs getWeather() upon search icon click
    $(".btn-search").on("click", function() {
        setData();
        getData();
        getWeather(city);
    });

    //sets user data in an array in local storage
    function setData() {
        city = $("#city-search").val().trim();
        citiesArray.push(city);
        localStorage.setItem("citiesArray", JSON.stringify(citiesArray));

    }

    //gets the array from user storage, creates a button, and prepends that button to a list
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
            darkBtn.text(citiesArray[i]);

            //set button as html of li
            li.html(darkBtn);
            
            //prepend li to ul
            $(".list-group").prepend(li);
        }
    }

    //makes three API calls 
        //1: first call provides content for the main-forecast area
        //2: second call gets the UV index data
        //3: third call gets data for the 5-day forecast content
    var getWeather = function(place) {
        //main forecast content API call----------------------------------------
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&units=imperial" + "&apikey=4d721e459b51eed9d4d8047d079984e6";
        $.ajax({
            url:queryURL,
            method:"GET"
        }).then(function(response) {
          console.log(response);
          
          var code = response.weather[0].icon;
          var imgSrc = "https://openweathermap.org/img/wn/" + code + ".png";
          var iconImg = $("<img>").attr("src", imgSrc);
          iconImg.attr("alt", response.weather[0].main);
          
        //make .forecast content appear
          $(".forecast").addClass("show");
          $("#city-name").text(response.name + ", " + response.sys.country + " " + moment().format('l'));
          
          $("#icon").html(iconImg);
          $("#temp").text(response.main.temp + " °F");
          $("#temp").wrap("<strong></strong>");
          $("#humidity").text(response.main.humidity + "%");
          $("#humidity").wrap("<strong></strong>");
          $("#wind-speed").text(response.wind.speed + " MPH");
          $("#wind-speed").wrap("<strong></strong>");
          
            //UV index API call----------------------------------------
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
                    
                    if (indexNum >= 0 && indexNum < 3) {
                        $("#UV-index").text(displayNum);
                        $("#UV-index").css({"color": "white", "background-color": "green"});
                    } else if (indexNum >= 3 && indexNum < 6) {
                        $("#UV-index").text(displayNum);
                        $("#UV-index").css({"color": "white", "background-color": "rgb(131, 131, 55)"});
                    } else if (indexNum >= 6 && indexNum < 8) {
                        $("#UV-index").text(displayNum);
                        $("#UV-index").css({"color": "white", "background-color": "orange"});
                    } else if (indexNum >= 8 && indexNum < 10) {
                        $("#UV-index").text(displayNum);
                        $("#UV-index").css({"color": "white", "background-color": "red"});
                    } else {
                        $("#UV-index").text(displayNum);
                        $("#UV-index").css({"color": "white", "background-color": "purple"});
                    }
                });
            };
            //five-day forecast API call----------------------------------------
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
                    // console.log(code6);
                    var imgSrc6 = "https://openweathermap.org/img/wn/" + code6 + ".png";
                    // console.log(imgSrc6);
                    var iconImg6 = $("<img>").attr("src", imgSrc6);

                    //-----------------------plus-two icon-----------------------------------------
                    var code14 = response.list[14].weather[0].icon;
                    // console.log(code14);
                    var imgSrc14 = "https://openweathermap.org/img/wn/" + code14 + ".png";
                    // console.log(imgSrc14);
                    var iconImg14 = $("<img>").attr("src", imgSrc14);
                    //-----------------------plus-three icon-----------------------------------------
                    var code22 = response.list[22].weather[0].icon;
                    // console.log(code22);
                    var imgSrc22 = "https://openweathermap.org/img/wn/" + code22 + ".png";
                    // console.log(imgSrc22);
                    var iconImg22 = $("<img>").attr("src", imgSrc22);
                    //-----------------------plus-four icon-----------------------------------------
                    var code30 = response.list[30].weather[0].icon;
                    // console.log(code30);
                    var imgSrc30 = "https://openweathermap.org/img/wn/" + code30 + ".png";
                    // console.log(imgSrc30);
                    var iconImg30 = $("<img>").attr("src", imgSrc30);
                    //-----------------------plus-five icon-----------------------------------------
                    var code38 = response.list[38].weather[0].icon;
                    // console.log(code38);
                    var imgSrc38 = "https://openweathermap.org/img/wn/" + code38 + ".png";
                    // console.log(imgSrc38);
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
            //call UV index API & fiveDay API within the main getWeather() function so they all run at the same time
            getUV();
            fiveDay();
        });
    };
});