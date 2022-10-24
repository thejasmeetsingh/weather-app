const geoCode = require('./utils/geocode.js');
const weather = require('./utils/weather.js');

geoCode.getGeoCode('New Delhi', (error, result) => {
    if (error) {
        console.log(error.message)
    } else {
        console.log(result);
    }
})

weather.getForcast(28.557163, 77.163665, (error, result) => {
    if (error) {
        console.log(error.message)
    } else {
        console.log(result);
    }
}) 