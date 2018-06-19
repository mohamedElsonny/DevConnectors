import React from 'react';
import classnames from 'classnames';

const InputGroup = ({ name, placeholder, icon, value, error, type, onChange }) => {
	return (
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">
					<i className={icon} />
				</span>
			</div>
			<input
				value={value}
				onChange={onChange}
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				placeholder={placeholder}
				name={name}
			/>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

InputGroup.defaultProps = {
	type: 'text'
};
export default InputGroup;
