import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextareaFieldGroup from '../common/TextareaFieldGroup';
import { addEducation } from '../../actions/profileAction';

class AddEducation extends Component {
	static propTypes = {
		addEducation: PropTypes.func.isRequired,
		profile: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired,
	};
	state = {
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
		errors: {},
		disabled: false,
	};

	changeHandler = e => {
		const { name, value } = e.target;
		this.setState(prevState => ({
			[name]: value,
		}));
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	submitHandler = e => {
		e.preventDefault();
		const eduData = {
			school: this.state.school,
			fieldofstudy: this.state.fieldofstudy,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description,
			degree: this.state.degree,
		};
		this.props.addEducation(eduData, this.props.history);
	};

	checkHandler = e => {
		this.setState(({ disabled, current }) => ({
			disabled: !disabled,
			current: !current,
		}));
	};
	render() {
		const { errors } = this.state;
		return (
			<div className="add-education">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go back
							</Link>
							<h1 className="display-4 text-center">Add Education</h1>
							<p className="lead text-center">
								Add any school, bootcamp, etc that you have attended
							</p>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.submitHandler}>
								<TextFieldGroup
									placeholder="* School"
									name="school"
									value={this.state.school}
									onChange={this.changeHandler}
									error={errors.school}
								/>
								<TextFieldGroup
									placeholder="* Degree or Certification"
									name="degree"
									value={this.state.degree}
									onChange={this.changeHandler}
									error={errors.degree}
								/>
								<TextFieldGroup
									placeholder="* Field of study"
									name="fieldofstudy"
									value={this.state.fieldofstudy}
									onChange={this.changeHandler}
									error={errors.fieldofstudy}
								/>
								<h6>From Date</h6>
								<TextFieldGroup
									placeholder="* From"
									type="date"
									name="from"
									value={this.state.from}
									onChange={this.changeHandler}
									error={errors.from}
								/>
								<h6>To Date</h6>
								<TextFieldGroup
									placeholder="* To"
									type="date"
									name="to"
									value={this.state.to}
									onChange={this.changeHandler}
									error={errors.to}
									disabled={this.state.disabled ? 'disabled' : ''}
								/>
								<div className="form-check mb-4">
									<input
										type="checkbox"
										className="form-check-input"
										name="current"
										value={this.state.current}
										checked={this.state.current}
										onChange={this.checkHandler}
										id="current"
									/>
									<label htmlFor="current" className="form-check-label">
										Current Job
									</label>
								</div>
								<TextareaFieldGroup
									placeholder="Program Descriptions"
									name="description"
									value={this.state.description}
									onChange={this.changeHandler}
									error={errors.description}
									info="Tell Us About the program that you are in"
								/>
								<input
									type="submit"
									className="btn btn-info btn-block mt-4"
									value="Submit"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	({ profile, errors }) => ({ profile, errors }),
	{ addEducation }
)(withRouter(AddEducation));
