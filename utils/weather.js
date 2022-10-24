const axios = require('axios');
const apiKeys = require('../api-keys.js')

const forcast = (lat, lng, callback) => {
    axios.get('http://api.weatherstack.com/current', {
        params: {
            access_key: apiKeys.weatherStackAccessKey,
            query: `${lat},${lng}`
        }   
    })
    .then((response) => {
        if (response.status === 200) {
            callback(
                undefined, 
                `Summery: ${response.data.current.weather_descriptions[0]}. Current Temprature is ${response.data.current.temperature} degree celsius. There is ${response.data.current.precip}% chance of rain.`
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
            message: 'Something went wrong',
            error: error,
        }, undefined)
    })
}

module.exports = {
    getForcast: forcast,
};