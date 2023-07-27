
let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let result = document.querySelector(".result");

searchBtn.addEventListener("click", () => {
  let countryName = countryInp.value.trim();

  if (countryName === "") {
    result.innerHTML = "<p>Please enter a country name.</p>";
    return;
  }
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  console.log(finalURL);
  fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 404) {
        result.innerHTML = `<p>Country not found.</p>`;
      } else {
        // Accessing specific data from the response
        if (data[0].maps && data[0].maps.googleMaps) {
          let googleMapsUrl = data[0].maps.googleMaps;
        result.innerHTML = `
          <h2>${data[0].name.common}</h2>
          <img src="${data[0].flags.svg}" class="flag-img">
          <p>Capital: ${data[0].capital[0]}</p>
          <p>Currency:   ${data[0].currencies[Object.keys(data[0].currencies)].name}</p>
          <p>Languages: ${Object.keys(data[0].languages)}</p>
          <p>Area: ${data[0].area }</p>
          <p>Population:${data[0].population}</p>
          <p>Continent: ${data[0].continents[0] }</p> 
          <a href="${googleMapsUrl}" target="_blank">View on Google Maps</a>
        `;
      }}
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      result.innerHTML = "<p>Error fetching data. Please try again later.</p>";
    });
});