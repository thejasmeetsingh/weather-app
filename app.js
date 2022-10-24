const geoCode = require('./utils/geocode.js');
const weather = require('./utils/weather.js');

geoCode.getGeoCode('New Delhi', (error, geoLocationData) => {
    if (error) {
        console.log(error.message)
    } else {
        weather.getForcast(geoLocationData.latitude, geoLocationData.longitude, (error, forcastData) => {
            if (error) {
                console.log(error.message)
            } else {
                console.log(`Forcast for: ${geoLocationData.location}`)
                console.log(forcastData);
            }
        }) 
    }
})