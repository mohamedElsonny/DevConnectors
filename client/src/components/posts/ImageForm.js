import React, { Component } from 'react';
import { saveImage } from './saveImage';
import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';

class ImageForm extends Component {
	handleChangeInput = file => {
		this.props.changeLoading(true);
		saveImage(file).then(res => {
			const imageUrl = res.data.secure_url;
			this.props.uploadPhoto(imageUrl);
			this.props.changeLoading(false);
		});
	};

	render() {
		const { loading, imageUrl } = this.props;
		console.log(imageUrl);
		return (
			<div>
				<button
					className="btn btn-block btn-info"
					type="button"
					onClick={() => this.fileInput.click()}
				>
					Upload Image
				</button>
				<input
					type="file"
					ref={ref => (this.fileInput = ref)}
					className="d-none"
					onChange={e => this.handleChangeInput(e.target.files[0])}
				/>
				{loading && <Spinner />}
				{!isEmpty(imageUrl) && <img src={imageUrl} alt="postImage" />}
			</div>
		);
	}
}

export default ImageForm;
