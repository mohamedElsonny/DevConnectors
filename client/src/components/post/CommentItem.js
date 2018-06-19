import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postActions';
import { Link } from 'react-router-dom';

class CommentItem extends Component {
	static propTypes = {
		deleteComment: PropTypes.func.isRequired,
		comment: PropTypes.object.isRequired,
		postId: PropTypes.string.isRequired,
		auth: PropTypes.object.isRequired,
	};

	deleteCommentHandler = (postId, commentId) => {
		console.log(postId, commentId);
		this.props.deleteComment(postId, commentId);
	};

	render() {
		const { auth, comment, postId } = this.props;
		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<Link to={`/profile/user/${comment.user}`}>
							<img
								className="rounded-circle d-none d-md-block"
								src={comment.avatar}
								alt=""
							/>
						</Link>
						<br />
						<p className="text-center">{comment.name}</p>
						{comment.user === auth.user.id ? (
							<button
								type="button"
								onClick={() => this.deleteCommentHandler(postId, comment._id)}
								className="btn btn-danger mr-1"
							>
								<i className="fa fa-times" />
							</button>
						) : null}
					</div>
					<div className="col-md-10">
						<p className="lead">{comment.text}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	({ auth }) => ({ auth }),
	{ deleteComment }
)(CommentItem);
