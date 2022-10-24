const yargs = require('yargs');
const chalk = require('chalk');

const geoCode = require('./utils/geocode.js');
const weather = require('./utils/weather.js');

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