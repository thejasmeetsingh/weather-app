const axios = require('axios');
const apiKeys = require('../api-keys.js')


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
                const {latitude, longitude, label: location} = response.data.data[0] 
                
                callback(undefined, {
                    latitude,
                    longitude,
                    location,
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
            message: 'Unable to fetch the location',
            error: error
        }, undefined)
    })
}

module.exports = {
    getGeoCode: geoCode
};