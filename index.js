const { parse } = require('csv-parse');
const fs = require('fs');

const habitable_planets = [];


function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' 
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6
}

fs.createReadStream('kepler-data.csv')
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', (data) => {
        if(isHabitablePlanet(data)) {
            habitable_planets.push(data);
        }
    })
    .on('error', (error) => {
        console.log(error);
    })
    .on('end', () => {
        console.log(habitable_planets.map((planet) => {
            return planet['kepler_name'];
        }))
        console.log(`${habitable_planets.length} habitable planet(s) found!`);
    })
    