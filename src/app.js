const path = require('path');

const express = require('express');
const hbs = require('hbs');
const yargs = require('yargs');
const chalk = require('chalk');

const geoCode = require('./utils/geocode.js');
const weather = require('./utils/weather.js');

const app = express();


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
    res.render('index', {
        title: 'Hello Express'
    })
});


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.'
    })
});


// Running Server on specific port
app.listen(3000, () => {
    console.log(chalk.inverse('Server is up!'));
});

yargs.command({
    command: 'location',
    describe: 'Input Location',
    builder: {
        address: {
            describe: 'Address',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        if (argv.address.length === 0) {
            console.log(chalk.red.inverse('Address was not provided'))
        } else {
            geoCode.getGeoCode(argv.address, (error, geoLocationData) => {
                if (error) {
                    console.log(chalk.red.inverse(error.message))
                } else {
                    weather.getForcast(geoLocationData, (error, forcastData) => {
                        if (error) {
                            console.log(chalk.red.inverse(error.message))
                        } else {
                            console.log(chalk.inverse(`Forcast for: ${geoLocationData.location}`))
                            console.log(chalk.green(forcastData))
                        }
                    }) 
                }
            })
        }
    }
})

yargs.parse();