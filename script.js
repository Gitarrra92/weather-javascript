window.addEventListener("load", ()=>{
    let long;
    let lat;

    let mainLocation = document.querySelector(".location");
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let btn = document.querySelector(".btn");
    let tempSpan = document.querySelector(".degree span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c516573938a152f078b142c643727c5f/${lat},${long}`;
                console.log( api);
            fetch(api)
                .then(response =>{
            return response.json()
            })
                .then(data => {
            console.log(data);
            const {temperature, summary, icon} = data.currently;

            temperatureDegree.textContent = temperature;
            mainLocation.textContent = data.timezone;
            temperatureDescription.textContent = summary;

            setIcons(icon, document.querySelector(".icon"));
            btn.addEventListener("click", changeToF);
                })
            })

    } else{
        mainLocation.textContent = "please, allow your location";
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        //skycon animation
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    function changeToF(){
        if(tempSpan.innerHTML == "&#8451;"){
            tempSpan.innerHTML == "&#8457;"
        }
    }
});