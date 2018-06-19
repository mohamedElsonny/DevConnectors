import React from 'react';
import classnames from 'classnames';

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
	const selectOptions = options.map((option) => (
		<option key={option.label} value={option.value}>
			{option.label}
		</option>
	));

	return (
		<div className="form-group">
			<select
				value={value}
				onChange={onChange}
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				name={name}
			>
				{selectOptions}
			</select>
			{info && <small className="text-muted form-text">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

export default SelectListGroup;
