const fetch = require('node-fetch'); 

const API_KEY = 'niIy8OuOoObcAiI63HHC13ssoy56b8wycKXC7gaA'; 

async function fetchAsteroidData() {
    const today = new Date().toISOString().split('T')[0]; 
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
    const endDate = sevenDaysLater.toISOString().split('T')[0]; 

    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${endDate}&api_key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const asteroidDiameters = [];

        for (const date in data.near_earth_objects) {
            const asteroids = data.near_earth_objects[date];
            asteroids.forEach(asteroid => {
                asteroidDiameters.push(asteroid.estimated_diameter.kilometers.estimated_diameter_max);
            });
        }

        console.log('Asteroid Diameters:', asteroidDiameters);
        return asteroidDiameters; 
    } catch (error) {
        console.error('Error fetching asteroid data:', error);
    }
}

module.exports = { fetchAsteroidData };