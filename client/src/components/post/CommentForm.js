import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextareaFieldGroup from '../common/TextareaFieldGroup';
import { addComment } from '../../actions/postActions';

class CommentForm extends Component {
	static propTypes = {
		addComment: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired,
		postId: PropTypes.string.isRequired,
	};

	state = {
		text: '',
		errors: {},
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	submitHandler = e => {
		e.preventDefault();
		const { user } = this.props.auth;
		const { postId } = this.props;
		const newComment = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar,
		};
		this.props.addComment(postId, newComment);
		this.setState({ text: '' });
	};
	changeHandler = e => {
		const { name, value } = e.target;
		this.setState(() => ({
			[name]: value,
		}));
	};

	render() {
		const { errors } = this.state;
		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">
						Make a Comment...
					</div>
					<div className="card-body">
						<form onSubmit={this.submitHandler}>
							<TextareaFieldGroup
								error={errors.text}
								placeholder="Reply to Post"
								name="text"
								value={this.state.text}
								onChange={this.changeHandler}
							/>
							<button type="submit" className="btn btn-dark">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	({ errors, auth }) => ({ errors, auth }),
	{ addComment }
)(CommentForm);
