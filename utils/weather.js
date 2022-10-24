const axios = require('axios');
const apiKeys = require('../api-keys.js')

const forcast = ({latitude: lat, longitude: lng}, callback) => {
    axios.get('http://api.weatherstack.com/current', {
        params: {
            access_key: apiKeys.weatherStackAccessKey,
            query: `${lat},${lng}`
        }   
    })
    .then((response) => {
        if (response.status === 200) {
            const data = response.data.current;
            callback(
                undefined, 
                `Current Temprature is ${data.temperature} degree celsius, Appearently it will feel like ${data.weather_descriptions[0]}. There is ${data.precip}% chance of rain.`
            )
        } else {
            callback({
                message: 'Something went wrong',
                error: response,
            }, undefined)
        }
    })
    .catch((error) => {
        callback({
            message: 'Unable to fetch the forcast',
            error: error,
        }, undefined)
    })
}

module.exports = {
    getForcast: forcast,
};