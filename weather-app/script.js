const apiKey="d63976b6dda187968cbe784c81dc8ab4";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?q";
const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon")



async function checkweather (city){
    const response=await fetch(apiUrl+`=${city}&appid=${apiKey}&units=metric`);
    if (response.status == 404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display = "none";

    }else{
        var data=await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity+ "%";
        document.querySelector(".wind").innerHTML = data.wind.speed+ "km/hr";
    
        if(data.weather[0].main=="Clouds"){
            weatherIcon.src="./weather-app-img/images/clouds.png"
    
        }
        else if(data.weather[0].main=="Clear"){
            weatherIcon.src="./weather-app-img/images/clear.png"
    
        }
        else if(data.weather[0].main=="Rain"){
            weatherIcon.src="./weather-app-img/images/rain.png"
    
        }
        else if(data.weather[0].main=="Drizzle"){
            weatherIcon.src="./weather-app-img/images/drizzle.png"
    
        }
        else if(data.weather[0].main=="Mist"){
            weatherIcon.src="./weather-app-img/images/mist.png"
    
        }
        document.querySelector(".error").style.display="none";

        document.querySelector(".weather").style.display = "block";
    }
   

}
searchBtn.addEventListener("click",()=>{
    checkweather(searchBox.value)
})
function keyPress(event){
    if (event.key === 'Enter' || event.keyCode === 13) {
        event.preventDefault();
        checkweather(searchBox.value);

      }
}
