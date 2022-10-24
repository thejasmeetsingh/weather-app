const geoCode = require('./utils/geocode.js');

geoCode.getGeoCode('New Delhi', (error, result) => {
    if (error) {
        console.log(error.message)
    } else {
        console.log(result);
    }
})