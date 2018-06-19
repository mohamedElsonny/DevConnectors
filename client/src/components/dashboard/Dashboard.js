import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAcount } from '../../actions/profileAction';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
	static propTypes = {
		getCurrentProfile: PropTypes.func.isRequired,
		deleteAcount: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired,
		profile: PropTypes.object.isRequired,
	};

	componentDidMount() {
		this.props.getCurrentProfile();
	}

	deleteClickHanlder = e => {
		this.props.deleteAcount();
	};

	render() {
		const {
			auth: { user },
			profile: { profile, loading },
		} = this.props;

		let dashboardContent;

		if (profile === null || loading) {
			dashboardContent = <Spinner />;
		} else {
			// check if logged in user has profile data
			if (Object.keys(profile).length > 0) {
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
						</p>
						<ProfileActions />
						<Experience experience={profile.experience} />
						<Education education={profile.education} />
						<div style={{ marginBottom: '60px' }}>
							<button
								onClick={this.deleteClickHanlder}
								className="btn btn-danger"
							>
								Delete My Account
							</button>
						</div>
					</div>
				);
			} else {
				// user is logged in but has no profile
				dashboardContent = (
					<div>
						<p className="lead text-muted">Welcome {user.name}</p>
						<p>You have not yet setup profile, please add some info</p>
						<Link to="/create-profile" className="btn btn-lg btn-info">
							Create Profile
						</Link>
					</div>
				);
			}
		}

		return (
			<div className="dashboard">
				<div className="container">
					<div className="col-md-12">
						<h1 className="display-4">Dashboard</h1>
						{dashboardContent}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	({ profile, auth }) => ({ profile, auth }),
	{ getCurrentProfile, deleteAcount }
)(Dashboard);
