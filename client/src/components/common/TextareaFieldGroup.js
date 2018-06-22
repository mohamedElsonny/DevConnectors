import React from 'react';
import classnames from 'classnames';

const TextareaFieldGroup = ({
	name,
	placeholder,
	value,
	error,
	info,
	onChange,
}) => {
	return (
		<div className="form-group">
			<textarea
				value={value}
				onChange={onChange}
				className={classnames('form-control form-control-lg', {
					'is-invalid': error,
				})}
				placeholder={placeholder}
				name={name}
			/>
			{info && <small className="text-muted form-text">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

export default TextareaFieldGroup;
