import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextareaFieldGroup from '../common/TextareaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
	static propTypes = {
		addPost: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired,
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
		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar,
		};
		this.props.addPost(newPost);
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
					<div className="card-header bg-info text-white">Say Somthing...</div>
					<div className="card-body">
						<form onSubmit={this.submitHandler}>
							<TextareaFieldGroup
								error={errors.text}
								placeholder="Create a Post"
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
	{ addPost }
)(PostForm);
