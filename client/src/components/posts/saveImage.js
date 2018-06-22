import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

const config = {
	CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/dppyvgdpp/upload',
	CLOUDINARY_UPLOAD_PRESET: 'bjz7ldp6',
};
export const saveImage = file => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('upload_preset', config.CLOUDINARY_UPLOAD_PRESET);
	setAuthToken();
	return axios({
		url: config.CLOUDINARY_URL,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		},
		data: formData,
	}).then(res => {
		setAuthToken(localStorage.getItem('jwtToken'));
		return res;
	});
};

// const imgUrl = res.data.secure_url;
