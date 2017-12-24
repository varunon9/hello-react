const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const request = require('request');

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config.json')[env];

module.exports = {

    getToken: function(user) {
        
        // create a token
        const token = jwt.sign({
            email: user.email,
            name: user.name
        }, config.superSecret, {
            expiresIn: 2 * 60 * 60 // expires in 2 hours
        });
        return token;
    },

    suggestPlaces: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.input) {
                reject('Input Required');
            } else {
                const url = config.placeApiUrl + 'input=' + params.input + '&key=' + config.placeApiKey;
                
                request.get({
                    url: url
                }, function(err, response, body) {
                    if (err) {
                        console.log(err);
                        reject('Server side error');
                    } else {
                        if (response && response.body) {
                            resolve(JSON.parse(response.body).predictions);
                        } else {
                            reject('No data found');
                        }
                    }
                })
            }
        });
    }

};