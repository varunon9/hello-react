import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
	render() {
		const buttonStyle = {
			marginRight: '1em'
		};
		return (
			<div class="container-fluid">
			    <div class="jumbotron">
			        <h1>Hello React - A simple MERN Stack web app</h1>
			        <Link to={`/login`}>
			            <button type="button" class="btn btn-primary btn-lg" style={buttonStyle}>
			                Login
			            </button>
			        </Link>
			        <Link to={`/signup`}>
			            <button type="button" class="btn btn-primary btn-lg" style={buttonStyle}>
			                Signup
			            </button>
			        </Link>
			    </div>
			</div>
		);
	}
}