import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileAction';

class Profiles extends Component {
	static propTypes = {
		profile: PropTypes.object.isRequired,
		getProfiles: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.props.getProfiles();
	}

	render() {
		const { profiles, loading } = this.props.profile;
		let profileItems;

		if (profiles === null || loading) {
			profileItems = <Spinner />;
		} else {
			if (profiles.length > 0) {
				profileItems = profiles.map(profile => (
					<ProfileItem profile={profile} key={profile._id} />
				));
			} else {
				profileItems = <h4>No profiles found</h4>;
			}
		}

		return (
			<div className="profiles">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4 text-center">Developer Profiles</h1>
							<p className="lead text-center">
								Browse and connect with Developers
							</p>
							{profileItems}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	({ profile }) => ({ profile }),
	{ getProfiles }
)(Profiles);
