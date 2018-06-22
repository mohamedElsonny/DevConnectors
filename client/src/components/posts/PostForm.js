import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import TextareaFieldGroup from '../common/TextareaFieldGroup';
import { addPost } from '../../actions/postActions';
import ImageForm from './ImageForm';
import VideoForm from './VideoForm';

const Form = props => {
	const {
		error,
		value,
		onSubmit,
		onChange,
		loading,
		changeLoading,
		postType,
		uploadPhoto,
		uploadVideo,
		changePostType,
		imageUrl,
		videoUrl,
	} = props;
	return (
		<form onSubmit={onSubmit}>
			<TextareaFieldGroup
				error={error}
				placeholder="Create a Post"
				name="text"
				value={value}
				onChange={onChange}
			/>
			{postType === 'image' && (
				<ImageForm
					imageUrl={imageUrl}
					loading={loading}
					changeLoading={changeLoading}
					uploadPhoto={uploadPhoto}
				/>
			)}
			{postType === 'video' && (
				<VideoForm
					videoUrl={videoUrl}
					changeLoading={changeLoading}
					uploadVideo={uploadVideo}
				/>
			)}
			<div className="d-flex">
				<button
					type="submit"
					className={classnames('btn btn-dark', {
						disabled: loading,
					})}
				>
					Submit
				</button>
				<div className="btn-group ml-auto">
					<button
						type="button"
						onClick={() => changePostType('text')}
						className={classnames('btn btn-secondary', {
							active: postType === 'text',
						})}
					>
						Text
					</button>
					<button
						type="button"
						onClick={() => changePostType('image')}
						className={classnames('btn btn-secondary', {
							active: postType === 'image',
						})}
					>
						Image
					</button>
					<button
						type="button"
						onClick={() => changePostType('video')}
						className={classnames('btn btn-secondary', {
							active: postType === 'video',
						})}
					>
						Video
					</button>
				</div>
			</div>
		</form>
	);
};

class PostForm extends Component {
	static propTypes = {
		addPost: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired,
	};

	state = {
		text: '',
		postType: 'text',
		imageUrl: '',
		videoUrl: '',
		errors: {},
		loading: false,
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	submitHandler = e => {
		e.preventDefault();
		const { user } = this.props.auth;
		let newPost;
		switch (this.state.postType) {
			case 'text':
				newPost = {
					text: this.state.text,
					postType: this.state.postType,
					name: user.name,
					avatar: user.avatar,
				};
				break;
			case 'video':
				newPost = {
					text: this.state.text,
					postType: this.state.postType,
					videoUrl: this.state.videoUrl,
					name: user.name,
					avatar: user.avatar,
				};
				break;
			case 'image':
				newPost = {
					text: this.state.text,
					postType: this.state.postType,
					imageUrl: this.state.imageUrl,
					name: user.name,
					avatar: user.avatar,
				};
				break;
			default:
				newPost = {
					text: this.state.text,
					postType: this.state.postType,
					name: user.name,
					avatar: user.avatar,
				};
		}
		this.props.addPost(newPost);
		this.setState({ text: '', videoUrl: '', imageUrl: '' });
	};

	changePostType = postType => {
		this.setState({
			postType,
		});
	};

	changeHandler = e => {
		const { name, value } = e.target;
		this.setState(() => ({
			[name]: value,
		}));
	};

	uploadPhoto = imageUrl => {
		this.setState({
			imageUrl,
		});
	};
	uploadVideo = videoUrl => {
		this.setState({
			videoUrl,
		});
	};

	changeLoading = condition => this.setState({ loading: condition });

	render() {
		const { errors } = this.state;
		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">Say Somthing...</div>
					<div className="card-body">
						<Form
							changePostType={this.changePostType}
							uploadPhoto={this.uploadPhoto}
							postType={this.state.postType}
							imageUrl={this.state.imageUrl}
							videoUrl={this.state.videoUrl}
							uploadVideo={this.uploadVideo}
							onSubmit={this.submitHandler}
							loading={this.state.loading}
							changeLoading={this.changeLoading}
							error={errors.text}
							value={this.state.text}
							onChange={this.changeHandler}
						/>
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
