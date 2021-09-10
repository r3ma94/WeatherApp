// Getting location info on page load
window.addEventListener("load", () => {
  let longitude;
  let latitude;
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let degreeSection = document.querySelector(".degree-section");
  let degreeSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      // openweathermap free API fetch
      let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c1f069882cec8f578fd9ac7f70946440&units=metric`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          let description = data.weather[0].description; // Weather description
          let temperature = data.main.temp; // Current temperature from data
          let icon = data.weather[0].icon;

          let temperatureFahrenheit = temperature * 1.8 + 32;

          // Configure DOM elements from API
          temperatureDegree.innerHTML = temperature;
          temperatureDescription.innerHTML = description;
          locationTimezone.innerHTML = data.name; // Name contains current geographical location name

          // Calling the setIcons function
          setIcons(icon, document.querySelector(".icon"));
          //console.log(icon);

          // Change temperature to Fahrenheit on click
          degreeSection.addEventListener("click", () => {
            if (degreeSpan.innerHTML === "°C") {
              degreeSpan.innerHTML = "°F";
              temperatureDegree.innerHTML = Math.floor(temperatureFahrenheit);
            } else {
              degreeSpan.innerHTML = "°C";
              temperatureDegree.innerHTML = temperature;
            }
          });
        });
    });
  }
  // Importing weather icons from skycons
  function setIcons(icon, iconID) {
    let skycons = new Skycons({ color: "white" });
    let currentIcon;
    // These are openweathermap icon IDs so we have to check them acording to the weather condition and transform them to skycons to show
    if (icon == "13d") {
      currentIcon = "SNOW";
    }
    if (icon == "01d") {
      currentIcon = "CLEAR_DAY";
    }
    if (icon == "01n") {
      currentIcon = "CLEAR_NIGHT";
    }
    if (icon == "02d") {
      currentIcon = "PARTLY_CLOUDY_DAY";
    }
    if (icon == "02n") {
      currentIcon = "PARTLY_CLOUDY_NIGHT";
    }
    if (icon == "03d" || icon == "03n" || icon == "04d" || icon == "o4n") {
      currentIcon = "CLOUDY";
    }
    if (icon == "09d" || icon == "10d" || icon == "11d") {
      currentIcon = "RAIN";
    }
    if (icon == "50d") {
      currentIcon == "FOG";
    }
    //console.log(currentIcon);
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
