window.addEventListener("load", ()=>{
    let long;
    let lat;

    let mainLocation = document.querySelector(".location");
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");

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
            const {temperature, summary} = data.currently;

            temperatureDegree.textContent = temperature;
            mainLocation.textContent = data.timezone;
            temperatureDescription.textContent = summary;
                })
            })

    } else{
        mainLocation.textContent = "please, allow your location";
    }

    
});