const apiKey = '1f8bacb3d85040c7946131359250402';

document.getElementById('city').addEventListener('change', () => {
  const city = document.getElementById('city').value;
  const lowerSection = document.querySelector('.lower');

  if (city) {
    lowerSection.innerHTML = '<p class="loading" style = "color:white">Loading weather data...</p>';

    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
      .then(response => response.json())
      .then(data => {
        lowerSection.innerHTML = `
          <div class="weather-card">
            <h2 class="city-name">${data.location.name}, ${data.location.country}</h2>
            <div class="weather-details">
              <div class="temperature">${data.current.temp_c}°C</div>
              <div class="condition-icon">
                <img src="${data.current.condition.icon}" alt="Weather icon">
                <p>${data.current.condition.text}</p>
              </div>
            </div>
            <div class="extra-info">
              <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
              <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
            </div>
          </div>
        `;
      })
      .catch(error => {
        console.error('Error:', error);
        lowerSection.innerHTML = `<p class="error">Failed to fetch weather data. Please try again later.</p>`;
      });
  } else {
    lowerSection.innerHTML = '';
  }
});