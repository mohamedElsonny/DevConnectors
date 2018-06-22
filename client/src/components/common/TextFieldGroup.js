import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({
	name,
	placeholder,
	value,
	label,
	error,
	info,
	type,
	onChange,
	disabled,
}) => {
	return (
		<div className="form-group">
			<input
				type={type}
				value={value}
				onChange={onChange}
				className={classnames('form-control form-control-lg', {
					'is-invalid': error,
				})}
				placeholder={placeholder}
				name={name}
				disabled={disabled}
			/>
			{info && <small className="text-muted form-text">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

TextFieldGroup.defaultProps = {
	type: 'text',
};

export default TextFieldGroup;
