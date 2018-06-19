import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

class PostItem extends Component {
	static propTypes = {
		post: PropTypes.object.isRequired,
		auth: PropTypes.object.isRequired,
		deletePost: PropTypes.func.isRequired,
		removeLike: PropTypes.func.isRequired,
		addLike: PropTypes.func.isRequired,
		showActions: PropTypes.bool.isRequired,
	};
	static defaultProps = {
		showActions: true,
	};
	deletePostHandler = id => {
		this.props.deletePost(id);
	};

	likeHandler = id => {
		this.props.addLike(id);
	};

	unlikeHandler = id => {
		this.props.removeLike(id);
	};

	findUserLike = likes => {
		const { auth } = this.props;
		if (likes.filter(like => like.user === auth.user._id).length > 0) {
			return true;
		} else {
			return false;
		}
	};

	render() {
		const { auth, post, showActions } = this.props;
		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<Link to={`/profile/user/${post.user}`}>
							<img
								className="rounded-circle d-none d-md-block"
								src={post.avatar}
								alt=""
							/>
						</Link>
						<br />
						<p className="text-center">{post.name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{post.text}</p>
						{showActions && (
							<div>
								<button
									onClick={() => this.likeHandler(post._id)}
									type="button"
									className="btn btn-light mr-1"
								>
									<i
										className={classnames('fa fa-thumbs-up', {
											'text-info': this.findUserLike(post.likes),
										})}
									/>
									<span className="badge badge-light">{post.likes.length}</span>
								</button>
								<button
									onClick={() => this.unlikeHandler(post._id)}
									type="button"
									className="btn btn-light mr-1"
								>
									<i className="text-secondary fa fa-thumbs-down" />
								</button>
								<Link to={`/post/${post._id}`} className="btn btn-info mr-1">
									Comments
								</Link>

								{post.user === auth.user.id ? (
									<button
										type="button"
										onClick={() => this.deletePostHandler(post._id)}
										className="btn btn-danger mr-1"
									>
										<i className="fa fa-times" />
									</button>
								) : null}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	({ auth }) => ({ auth }),
	{ deletePost, addLike, removeLike }
)(PostItem);
