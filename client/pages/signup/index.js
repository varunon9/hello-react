import React from 'react';
import { Link } from 'react-router-dom';

export default class Signup extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};

		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log(this.state);
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
				            <label>Email address:</label>
				            <input type="email" class="form-control" onChange={this.handleEmailChange} />
				        </div>
				        <div class="form-group">
				            <label>Password:</label>
				            <input type="password" class="form-control" onChange={this.handlePasswordChange} />
				        </div>
				        <button type="submit" class="btn btn-default">Submit</button>
			        </form>
			        <br />
			        <p>
			            Already have an account? 
			            <Link to={'/login'}>Login</Link>
			        </p>
			    </div>
			</div>
		);
	}
}