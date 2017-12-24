const bcrypt = require('bcrypt');

const User = require('../models/userSchema');

module.exports = {
    login: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.email || !params.password) {
                reject('Missing Params');
            } else {
                User.find({
                    email: params.email
                }, function(err, user) {
                    if (err) {
                        console.log(err);
                        reject('Server Side Error');
                    } else {

                        if (user.length > 0) {
                            // check password
                            const hash = user[0].password;
                            bcrypt.compare(params.password, hash, function(err, result) {
                                if (err) {
                                    console.log(err);
                                    reject('Server Side Error');
                                } else {
                                    if (result) {
                                        resolve(user[0]);
                                    } else {
                                        reject('Wrong email or password');
                                    }
                                }  
                            });
                        } else {
                            reject('Wrong email or password');
                        }
                    }
                });
            }
        });
    },

    signup: function(params, failureCallback, successCallback) {
        return new Promise((resolve, reject) => {
            if (!params.email || !params.name || !params.password) {
                reject('Missing Params');
            } else {
                User.find({
                    email: params.email
                }, function(err, user) {
                    if (err) {
                        console.log(err);
                        reject('Server Side Error');
                    } else {
                        if (user.length > 0) {
                            reject('User already exist. Try login');
                        } else {

                            // generate hash
                            bcrypt.hash(params.password, 10, function(err, hash) {
                                if (err) { 
                                    console.log(err); 
                                    reject('Error in Signup');
                                } else {
                                    const newUser = new User({
                                        email: params.email,
                                        name: params.name,
                                        password: hash,
                                        places: []
                                    });

                                    newUser.save(function(err) {
                                        if (err) {
                                            console.log(err);
                                            reject('Unabe to Save User');
                                        } else {
                                            resolve(newUser);
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        });
    },

    saveSearch: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.place) {
                reject('Missing Params');
            } else {
                const newPlace = {
                    name: params.place.name,
                    timestamp: new Date().getTime()
                };

                User.update(
                    { 
                        email: params.email 
                    },
                    {
                        $push: {
                            places: newPlace
                        }
                    },
                    function(err, user) {
                        if (err) {
                            console.log(err);
                            reject('Update db error');
                        } else {
                            resolve(newPlace);
                        }
                    }
                );
            }
        });
    },

    getSearchedPlaces: function(params) {
        return new Promise((resolve, reject) => {
            User.findOne({
                email: params.email
            }, function(err, user) {
                if (err) {
                    console.log(err);
                    reject('Server Side Error');
                } else {
                    if (user) {
                        resolve(user.places);
                    } else {
                        resolve([]);
                    }
                }
            });
        });
    }
};