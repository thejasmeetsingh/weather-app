const axios = require('axios');
const apiKeys = require('./api-keys.js')

// axios.get('http://api.weatherstack.com/current', {
//     params: {
//         access_key: apiKeys.weatherStackAccessKey,
//         query: 'New Delhi'
//     }   
// }).then((response) => {
//     console.log(response.data.current);
// }).catch((err) => {
//     console.log(err);
// })

const geoCode = (address, callback) => {
    axios.get('http://api.positionstack.com/v1/forward', {
        params: {
            access_key: apiKeys.positionStackAccessKey,
            query: address,
        }
    })
    .then((response) => {
        if (response.status === 200) {
            if (response.data.data.length === 0) {
                callback({
                    message: 'Invalid Address. Please try again',
                    error: response
                }, undefined)
            } else {
                callback(undefined, {
                    latitude: response.data.data[0].latitude,
                    longitude: response.data.data[0].longitude,
                })
            }
        } else {
            callback({
                message: 'Something went wrong',
                error: response
            }, undefined)
        }
    })
    .catch((error) => {
        callback({
            message: 'Something went wrong',
            error: error
        }, undefined)
    })
}

geoCode('New Delhi', (error, result) => {
    if (error) {
        console.log(error.message)
    } else {
        console.log(result);
    }
})