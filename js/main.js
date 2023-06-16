//https://api.weatherapi.com/v1/forecast.json?key=3189464576c74734b03132737210909&q=lond&days=3

var weather = [];
var searchBar = document.getElementById("searchBar");
var exclamtionMark = document.querySelector(".exclamtionMark");
var weatherDivs  = document.querySelector(".weatherDivs");
//$(".backgroundVideo").fadeOut();
$("#onLoad").delay(1000).fadeOut(1000);

searchBar.onkeyup = function ()
{
    var country = searchBar.value;
    if(country.length >= 3)
    {
        getWeather(country);
    }
    /* else
    {
        var popover = new bootstrap.Popover(document.querySelector('.exclamtionMark'), {
            container: 'body',
            content: "country should be at least 3 character",
            placement: "bottom"

        })
        exclamtionMark.classList.remove("d-none");
    } */
}
async function getWeather(key="cairo")
{
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3189464576c74734b03132737210909&q=${key}&days=3`);
    if(response.status != 200)
    {
        var popover = new bootstrap.Popover(document.querySelector('.exclamtionMark'), {
            container: 'body',
            content: "no matches",
        })
        exclamtionMark.classList.remove("d-none");
    }
    else
    {
        exclamtionMark.classList.add("d-none");
        weather = await response.json();
        display();
    }
}
getWeather();


function display()
{
    var date = new Date(weather.forecast.forecastday[0].date); 
    var dateFormate = date.toDateString();
    var divs = 
        `<div class="info">
            <h2 class="location d-inline me-2"> ${weather.location.name}, ${weather.location.country} </h2>
            <p class="dayNdDate"> ${dateFormate} </p>
        </div>

        <div class="weatherDiv col-lg-6 py-3">
            <div class="row">
                <p class="temperature col-5 text-center pt-4"> ${weather.current.temp_c}<sup>o</sup>C </p>
                <div class="col-7 text-center">
                    <img class="weatherImg" src="http:${weather.current.condition.icon}" alt="">
                    <h6 class="weatherCondition"> ${weather.current.condition.text}</h6>  
                    
                    <div">
                        <p class="wDetails"><img src="images/icon-umberella.png"> <span>${weather.current.cloud} %</span> </p>
                        <p class="wDetails"><img src="images/icon-wind.png"> <span>${weather.current.wind_kph} km/h</span> </p>
                        <p class="wDetails"><img src="images/icon-compass.png"> <span>${weather.current.wind_dir}</span> </p>
                    </div>
                </div>
            </div>
        </div>`;

    for(var i=1; i<=2; i++)
    {
        day = getDayName(weather.forecast.forecastday[i].date);
        divs += 
        `<div class="weatherDiv col-lg-3 col-6 text-center pt-2 ">
            <div class="date">
            <h4> ${day} </h4>
            </div>
            <img class="weatherImg mb-3" src="http:${weather.forecast.forecastday[i].day.condition.icon}" alt="">
            <h6> ${weather.forecast.forecastday[i].day.condition.text} </h6>
            <h5> ${weather.forecast.forecastday[i].day.maxtemp_c} / ${weather.forecast.forecastday[i].day.mintemp_c} <sup>o</sup>C </h5>
        </div>`;
    } 
    weatherDivs.innerHTML = divs;
    changeBackground();
}
function changeBackground()
{  
    if(weather.current.cloud > 70)
    {
        //$("#clouds").attr({src: "https://cdn.pixabay.com/vimeo/510850921/clouds-64767.mp4?width=3840&hash=205b2814ebd43ce6a49d98b6f6ec3e55615a5849"})
        $("#clouds").fadeIn();
        $("#clouds").siblings().fadeOut();
    }
    else if(weather.current.precip_mm != 0.0)
    {
        //$("#rain").attr({src: "https://cdn.pixabay.com/vimeo/437964382/rain-44143.mp4?width=1920&hash=f865eb818e978a54138867244358c415b4bd255e"})
        $("#rain").fadeIn();
        $("#rain").siblings().fadeOut();
    }
    else if(weather.current.wind_kph >= 20)
    {
        //$("#wind").attr({src: "https://cdn.pixabay.com/vimeo/228530158/feather-11168.mp4?width=1920&hash=1aca10561f61bea628f691da657f0285d6c6c592"})
        $("#wind").fadeIn();
        $("#wind").siblings().fadeOut();
    }
    else if (weather.current.temp_c >= 30)
    {
        //$("#hot").attr({src: "https://cdn.pixabay.com/vimeo/143368880/leaves-1124.mp4?width=1280&hash=dc5a1e39c34c509f41b757d13e9fb901dcaed96e"})
        $("#hot").fadeIn();
        $("#hot").siblings().fadeOut();
    }
    else if (weather.current.temp_c >= 18 && weather.current.temp_c < 30)
    {
        //$("#sunny").attr({src: "https://vod-progressive.akamaized.net/exp=1686880349~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F279%2F19%2F476396201%2F2126680881.mp4~hmac=2ee9560f97cab40815fb6170187b3455cbb3280e0ffbffa7639d714c5ed6fd1c/vimeo-prod-skyfire-std-us/01/279/19/476396201/2126680881.mp4?filename=file.mp4"}) 
        $("#sunny").fadeIn();
        $("#sunny").siblings().fadeOut();
    }
    else if(weather.current.temp_c >= 8 && weather.current.temp_c < 18)
    {
        //$("#winter").attr({src: "https://download-video.akamaized.net/2/playback/fe9d28d8-6cda-47b3-b58c-f253f7109139/4ac1f095-2d7223d2?__token__=st=1686867275~exp=1686881675~acl=%2F2%2Fplayback%2Ffe9d28d8-6cda-47b3-b58c-f253f7109139%2F4ac1f095-2d7223d2%2A~hmac=9e1dc174ab9e258dc92c380abf361718b3acede1bb83244521978ea162afbbed&r=dXMtY2VudHJhbDE%3D"})
        $("#winter").fadeIn();
        $("#winter").siblings().fadeOut();
    }
    else if(weather.current.temp_c < 8)
    {
        //$("#snow").attr({src: "https://cdn.pixabay.com/vimeo/524689242/snow-68021.mp4?width=1920&hash=4e4e3023094bc44488a869d54132b6385f4301eb"})
        $("#snow").fadeIn();
        $("#snow").siblings().fadeOut();
        /* 
        - https://cdn.pixabay.com/vimeo/641767481/trees-93834.mp4?width=3840&hash=c5ee3687eae4cbd10a62d61ea8d646742b212557
        - https://cdn.pixabay.com/vimeo/524689242/snow-68021.mp4?width=1920&hash=4e4e3023094bc44488a869d54132b6385f4301eb
        */
    }
}

function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}
var popover = new bootstrap.Popover(document.querySelector('.exclamtionMark'), {
    container: 'body',
    placement: "bottom"
})
