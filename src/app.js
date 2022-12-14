const path = require('path');

const express = require('express');
const hbs = require('hbs');
const chalk = require('chalk');

const geoCode = require('./utils/geocode.js');
const weather = require('./utils/weather.js');

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    return res.render('index', {
        title: 'Weather'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ 
            error: 'You must provide an address'
         })
    }

    geoCode.getGeoCode(req.query.address, (error, geoLocationData) => {
        if (error) {
            return res.send({ error })
        } else {
            weather.getForcast(geoLocationData, (error, forcastData) => {
                if (error) {
                    return res.send({ error })
                } else {
                    return res.send({
                        forcast: forcastData,
                        location: geoLocationData.location,
                        address: req.query.address,
                    })
                }
            }) 
        }
    })
});


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.'
    })
});


// Running Server on specific port
app.listen(port, () => {
    console.log(chalk.inverse('Server is up!'));
});