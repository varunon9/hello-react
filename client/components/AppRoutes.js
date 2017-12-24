import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import Home from '../pages/home';
import Login from '../pages/login';
import Signup from '../pages/signup';
import Dashboard from '../pages/dashboard';

import { config } from '../utils/Config';

export default class AppRoutes extends React.Component {

	constructor(props) {
		super(props);

        // initially assuming that user is logged out
		let user = {
			isLoggedIn: false
		}

        // if user is logged in, his details can be found from local storage
		try {
			let userJsonString = localStorage.getItem(config.localStorageKey);
			if (userJsonString) {
				user = JSON.parse(userJsonString);
			}
		} catch (exception) {
		}

        // updating the state
		this.state = {
			user: user
		};

		this.authenticate = this.authenticate.bind(this);
	}

    // this function is called on login/logout
	authenticate(user) {
		this.setState({
			user: user
		});

		// updating user's details
		localStorage.setItem(config.localStorageKey, JSON.stringify(user));
	}

	render() {
		return (
			<Switch>
			    <Route exact path='/' component={Home} />
			    <Route exact path='/login' render={() => <Login authenticate={this.authenticate} />} />
			    <Route exact path='/signup' render={() => <Signup authenticate={this.authenticate} />} />
			    <Route path='/dashboard' render={() => (
			    	this.state.user.isLoggedIn ? 
			    	        (<Dashboard authenticate={this.authenticate} user={this.state.user} />) : 
			    	        (<Redirect to="/login" />)
			    )} />
			</Switch>
		);
	}
} 