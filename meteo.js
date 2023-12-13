// Fonction pour effectuer une requête à l'API météo
function fetchWeather(city, apiKey) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json());
}

// Fonction pour afficher les informations météo
function displayWeather(weather) {
  const weatherDiv = document.getElementById("weather");

  const card = document.createElement('div');
  card.className = 'weather-card';

  card.innerHTML = `
    <h2>${weather.city}</h2>
    <img src="http://openweathermap.org/img/wn/${weather.icon}.png" alt="Weather Icon">
    <p>${weather.description}</p>
    <p>Température: ${weather.temperature} °C</p>
    <p>Humidité: ${weather.humidity}%</p>
  `;

  weatherDiv.innerHTML = ''; // Efface le contenu précédent
  weatherDiv.appendChild(card);
  weatherDiv.style.display = 'block';
}

// Pour chargez le fichier de configuration conf.json
fetch('conf.json')
  .then(response => response.json())
  .then(config => {
    // C'est pour obtenir la ville actuelle
    const currentCity = config.cities[0]; //  [0]la première ville par défaut

    // Fonction pour récupérer et afficher les données météo
    function updateWeather() {
      fetchWeather(currentCity.name, currentCity.apiKey)
        .then(data => {
          const weather = {
            city: data.name,
            description: data.weather[0].description,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            icon: data.weather[0].icon,
          };
          displayWeather(weather);
        })
    }

    // Appeler la fonction pour la première fois
    updateWeather();

    // Rafraîchir les données toutes les heures
    setInterval(updateWeather, 3600000); // 3600000 ms équivalent à 1 heure
  })
