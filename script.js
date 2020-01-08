$(document).ready(function() {
    
    var citiesArray = [];
    getData();


    $("#city-search").keyup(function(event) {
        var code = event.which;
        if (code == 13) {
            event.preventDefault();
            setData();
            getData();
        }
    });

    $(".btn-search").on("click", function() {
        setData();
        getData();
    });

    function setData() {
        var city = $("#city-search").val().trim();
        citiesArray.push(city);
        for (var i = 0; i < citiesArray.length; i++) {
            localStorage.setItem(citiesArray[i], citiesArray[i]);
        }
        console.log(citiesArray);
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

            //set button as html of li
            li.html(darkBtn);
            
            //append li to ul
            $(".list-group").prepend(li);
        }
    }



});