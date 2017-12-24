import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';

import { config } from '../../utils/Config';

export default class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			error: '',
			fireRedirect: false
		};

		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const params = {
			email: this.state.email,
			password: this.state.password
		};
		axios.post(config.baseUrl + 'login', params)
		    .then(response => {
		    	if (response.data && response.data.success) {
		    		
		    		this.props.authenticate({
		    			name: response.data.user.name,
		    			email: response.data.user.email,
		    			isLoggedIn: true
		    		});

		    		this.setState({
		    			error: '',
		    			fireRedirect: true
		    		});
		    	} else {
		    		this.setState({
		    			error: response.data.message
		    		});
		    	}
		    }).catch(err => {
		    	console.error(err);
		    });
	}

	handleEmailChange(e) {
		this.setState({
			email: e.target.value
		});
	}

	handlePasswordChange(e) {
		this.setState({
			password: e.target.value
		});
	}

	render() {
		return (
			<div class="container-fluid">
			    <div class="jumbotron">
			        <h1>Please Login</h1>
			        <form onSubmit={this.handleSubmit}>
				        <div class="form-group">
				            <label>Email address:</label>
				            <input type="email" class="form-control" onChange={this.handleEmailChange} />
				        </div>
				        <div class="form-group">
				            <label>Password:</label>
				            <input type="password" class="form-control" onChange={this.handlePasswordChange} />
				        </div>
				        <button type="submit" class="btn btn-primary">Submit</button>
			        </form>
			        <br />
			        <p class="text-danger">{this.state.error}</p>
			        <p>
			            New User? 
			            <Link to={'/signup'}>Signup</Link>
			        </p>
			    </div>

			    {this.state.fireRedirect && <Redirect to='/dashboard' push={true} />}
			</div>
		);
	}
}