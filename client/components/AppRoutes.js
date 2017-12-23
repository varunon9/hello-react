import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/home';
import Login from '../pages/login';
import Signup from '../pages/signup';
import Dashboard from '../pages/dashboard';

export default class AppRoutes extends React.Component {
	render() {
		return (
			<Switch>
			    <Route exact path='/' component={Home}/>
			    <Route exact path='/login' component={Login}/>
			    <Route exact path='/signup' component={Signup}/>
			    <Route path='/dashboard' component={Dashboard}/>
			</Switch>
		);
	}
} 