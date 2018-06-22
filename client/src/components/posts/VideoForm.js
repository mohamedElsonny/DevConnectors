import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import Spinner from '../common/Spinner';

class VideoForm extends Component {
	state = {
		link: '',
		loading: false,
	};

	onChange = e => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	resolveUrl = () => {
		this.setState({ loading: true });
		let videoUrl = this.state.link.split('v=')[1];
		let ampersandPosition = videoUrl.indexOf('&');
		if (ampersandPosition !== -1) {
			videoUrl = videoUrl.substring(0, ampersandPosition);
		}
		this.props.uploadVideo(videoUrl);
		this.setState({ loading: false, link: '' });
	};

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-md-10">
						<TextFieldGroup
							name="link"
							value={this.state.link}
							onChange={this.onChange}
						/>
					</div>
					<div className="col-md-2">
						<button
							className="btn btn-info"
							onClick={this.resolveUrl}
							type="button"
						>
							Get Video
						</button>
					</div>
				</div>
				{this.state.loading && <Spinner />}
				{this.props.videoUrl && (
					<div className="embed-responsive embed-responsive-16by9">
						<iframe
							src={`https://www.youtube-nocookie.com/embed/${
								this.props.videoUrl
							}?rel=0&amp;controls=0&amp;showinfo=0`}
							frameBorder="0"
							className="embed-responsive-item"
							allowFullScreen
							title="post"
						/>
					</div>
				)}
			</div>
		);
	}
}
export default VideoForm;
