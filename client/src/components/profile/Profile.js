import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileCreds from './ProfileCreds';
import ProfileAbout from './ProfileAbout';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import {
	getProfileByHandle,
	getProfileById,
} from '../../actions/profileAction';
import isEmpty from '../../validation/is-empty';

class Profile extends Component {
	static propTypes = {
		profile: PropTypes.object.isRequired,
		getProfileByHandle: PropTypes.func.isRequired,
	};

	componentWillReceiveProps(nextProps) {
		if (isEmpty(nextProps.profile.profile) && this.props.profile.loading) {
			this.props.history.push('/not-found');
		}
	}
	componentDidMount() {
		if (this.props.match.params.handle) {
			this.props.getProfileByHandle(this.props.match.params.handle);
		}
		if (this.props.match.params.user_id) {
			this.props.getProfileById(this.props.match.params.user_id);
		}
	}

	render() {
		const { profile, loading } = this.props.profile;
		let profileContent;
		if (isEmpty(profile) || loading) {
			profileContent = <Spinner />;
		} else {
			console.log(profile);
			profileContent = (
				<div>
					<div className="row">
						<div className="col-md-6">
							<Link to="/profiles" className="btn btn-light mb-3 float-left">
								Back To Profiles
							</Link>
						</div>
						<div className="col-md-6" />
					</div>
					<ProfileHeader profile={profile} />
					<ProfileAbout profile={profile} />
					<ProfileCreds
						education={profile.education}
						experience={profile.experience}
					/>
					{profile.githubusername ? (
						<ProfileGithub username={profile.githubusername} />
					) : null}
				</div>
			);
		}
		return (
			<div className="profile">
				<div className="container">
					<div className="row">
						<div className="col-md-12">{profileContent}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	({ profile }) => ({ profile }),
	{ getProfileByHandle, getProfileById }
)(withRouter(Profile));
