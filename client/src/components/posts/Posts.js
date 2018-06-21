import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';
import isEmpty from '../../validation/is-empty';
import PostFeed from './PostFeed';

class Posts extends Component {
	static propTypes = {
		getPosts: PropTypes.func.isRequired,
		post: PropTypes.object.isRequired,
	};

	componentDidMount() {
		this.props.getPosts();
	}

	render() {
		const { posts, loading } = this.props.post;

		let postContent;
		if (isEmpty(posts) || loading) {
			postContent = <Spinner />;
		} else {
			postContent = <PostFeed posts={posts} />;
		}
		return (
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<PostForm />
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default connect(
	({ post }) => ({ post }),
	{ getPosts }
)(withRouter(Posts));
