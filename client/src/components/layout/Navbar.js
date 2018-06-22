import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileAction';

class Navbar extends Component {
	static propTypes = {
		logoutUser: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired,
	};

	logoutHandler = e => {
		e.preventDefault();
		this.props.clearCurrentProfile();
		this.props.logoutUser();
	};

	render() {
		const {
			auth: { isAuthenticated, user },
		} = this.props;

		const authLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/feed">
						Post Feed
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/dashboard">
						Dashboard
					</Link>
				</li>
				<li className="nav-item">
					<a
						onClick={this.logoutHandler}
						style={{ cursor: 'pointer' }}
						className="nav-link"
					>
						<img
							src={user.avatar}
							alt={user.name}
							title="You must have gravatar connected to your email to display an image"
							style={{ width: '25px', marginRight: '5px' }}
							className="rounded-circle"
						/>
						Log out
					</a>
				</li>
			</ul>
		);
		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/register">
						Sign Up
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/login">
						Login
					</Link>
				</li>
			</ul>
		);
		return (
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
				<div className="container">
					<Link className="navbar-brand" to="/">
						<span className="text-info">Dev</span>Connector
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#mobile-nav"
					>
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="mobile-nav">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<Link className="nav-link" to="/profiles">
									{' '}
									Developers
								</Link>
							</li>
						</ul>
						{isAuthenticated ? authLinks : guestLinks}
					</div>
				</div>
			</nav>
		);
	}
}

export default connect(
	({ auth }) => ({ auth }),
	{ logoutUser, clearCurrentProfile }
)(withRouter(Navbar));
