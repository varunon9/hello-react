import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';

import { config } from '../../utils/Config';

export default class Signup extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			error: '',
			fireRedirect: false
		};

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const params = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password
		};
		axios.post(config.baseUrl + 'signup', params)
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

	handleNameChange(e) {
		this.setState({
			name: e.target.value
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
			        <h1>Please Signup</h1>
			        <form onSubmit={this.handleSubmit}>
			            <div class="form-group">
				            <label>Name:</label>
				            <input type="text" class="form-control" onChange={this.handleNameChange} />
				        </div>
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
			            Already have an account? 
			            <Link to={'/login'}>Login</Link>
			        </p>
			    </div>

			    {this.state.fireRedirect && <Redirect to='/dashboard' push={true} />}
			</div>
		);
	}
}