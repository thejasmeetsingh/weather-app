const axios = require('axios');
const apiKeys = require('../api-keys.js')


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