
const apiKey = '09799fd4b0694d9fb48c385e393bd7d9';

function searchCountry() {
    const countryInput = document.getElementById('countryInput');
    const countryDataContainer = document.getElementById('countryData');
    const countryName = countryInput.value;

    
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            
            const country = data[0];
            const countryHTML = `
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${country.name.common}</h5>
                            <p class="card-text">Capital: ${country.capital}</p>
                            <p class="card-text">Population: ${country.population}</p>
                            <button class="btn btn-info" onclick="showMoreDetails('${countryName}')">More Details</button>
                        </div>
                    </div>
                </div>
            `;
            countryDataContainer.innerHTML = countryHTML;
        })
        .catch(error => console.error('Error:', error));
}

async function showMoreDetails(countryName) {
    try {
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apiKey}`);
        const weatherData = await response.json();

        
        const modalContent = `
            <h5>${countryName} Weather Details</h5>
            <p>Temperature: ${weatherData.main.temp} °C</p>
            <p>Weather: ${weatherData.weather[0].description}</p>
        `;

        
        $('#weatherModalContent').html(modalContent);
        $('#weatherModal').modal('show');
    } catch (error) {
        console.error('Error:', error);
    }
}
