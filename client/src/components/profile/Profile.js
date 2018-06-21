import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileCreds from './ProfileCreds';
import ProfileAbout from './ProfileAbout';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { getProfileById } from '../../actions/profileAction';
import { getPostsById } from '../../actions/postActions';
import isEmpty from '../../validation/is-empty';
import PostFeed from '../posts/PostFeed';

class Profile extends Component {
	static propTypes = {
		profile: PropTypes.object.isRequired,
		getProfileById: PropTypes.func.isRequired,
		getPostsById: PropTypes.func.isRequired,
	};

	// componentWillReceiveProps(nextProps) {
	// 	if (isEmpty(nextProps.profile.profile) && this.props.profile.loading) {
	// 		this.props.history.push('/not-found');
	// 	}
	// }
	componentDidMount() {
		if (this.props.match.params.user_id) {
			this.props.getProfileById(
				this.props.match.params.user_id,
				this.props.history
			);
			this.props.getPostsById(this.props.match.params.user_id);
		}
	}

	render() {
		const { profile, loading } = this.props.profile;
		const { posts, loading: loadingPosts } = this.props.post;
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

		let postContent;
		if (isEmpty(posts) || loadingPosts) {
			postContent = <Spinner />;
		} else {
			postContent = <PostFeed posts={posts} />;
		}

		return (
			<div className="profile">
				<div className="container">
					<div className="row">
						<div className="col-md-12">{profileContent}</div>
						<div className="col-md-12">{postContent}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	({ profile, post }) => ({ profile, post }),
	{ getProfileById, getPostsById }
)(withRouter(Profile));
