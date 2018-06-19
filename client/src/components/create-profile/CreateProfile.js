import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextareaFieldGroup from '../common/TextareaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile } from '../../actions/profileAction';

class CreateProfile extends Component {
	static propTypes = {
		profile: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired,
	};

	state = {
		displaySocialInput: false,
		handle: '',
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		githubusername: '',
		bio: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		instagram: '',
		youtube: '',
		errors: {},
	};

	componentWillReceiveProps(nexProps) {
		if (nexProps.errors) {
			this.setState({ errors: nexProps.errors });
		}
	}

	changeHandler = e => {
		const { name, value } = e.target;
		console.log(`name: ${name}, value: ${value}`);
		this.setState(prevState => ({
			[name]: value,
		}));
	};

	submitHandler = e => {
		e.preventDefault();
		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			instagram: this.state.instagram,
			youtube: this.state.youtube,
		};
		this.props.createProfile(profileData, this.props.history);
		console.log('submit');
	};

	render() {
		const { errors, displaySocialInput } = this.state;

		let socialInputs;
		if (displaySocialInput) {
			socialInputs = (
				<div>
					<InputGroup
						placeholder="Twitter Profile URL"
						name="twitter"
						icon="fa fa-twitter"
						value={this.state.twitter}
						onChange={this.changeHandler}
						error={errors.twitter}
					/>
					<InputGroup
						placeholder="Facebook Page URL"
						name="facebook"
						icon="fa fa-facebook"
						value={this.state.facebook}
						onChange={this.changeHandler}
						error={errors.facebook}
					/>
					<InputGroup
						placeholder="Linkedin Profile URL"
						name="linkedin"
						icon="fa fa-linkedin"
						value={this.state.linkedin}
						onChange={this.changeHandler}
						error={errors.linkedin}
					/>
					<InputGroup
						placeholder="Youtube Channel URL"
						name="youtube"
						icon="fa fa-youtube"
						value={this.state.youtube}
						onChange={this.changeHandler}
						error={errors.youtube}
					/>
					<InputGroup
						placeholder="Instagram Page URL"
						name="instagram"
						icon="fa fa-instagram"
						value={this.state.instagram}
						onChange={this.changeHandler}
						error={errors.instagram}
					/>
				</div>
			);
		}

		// select options for status
		const options = [
			{ label: '* Select professional status', value: 0 },
			{ label: ' Developer', value: 'Developer' },
			{ label: ' Junior Developer', value: 'Junior Developer' },
			{ label: ' Senior Developer', value: 'Senior Developer' },
			{ label: ' Manager', value: 'Manager' },
			{ label: ' Student or Learning', value: 'Student or Learning' },
			{ label: ' Instructor or Teacher', value: 'Instructor or Teacher' },
			{ label: ' Intern', value: 'Intern' },
			{ label: ' Other', value: 'Other' },
		];

		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create Your Profile</h1>
							<p className="text-center lead">
								Let's get some information to make your profile stand out
							</p>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.submitHandler}>
								<TextFieldGroup
									placeholder="* Profile Handle"
									value={this.state.handle}
									name="handle"
									onChange={this.changeHandler}
									error={errors.handle}
									info="A unique handle for your Profile URL. your full name, company name, nickname, etc"
								/>
								<SelectListGroup
									placeholder="status"
									name="status"
									value={this.state.status}
									onChange={this.changeHandler}
									error={errors.status}
									options={options}
									info="Give us an idea of where you are at in your career"
								/>
								<TextFieldGroup
									placeholder="Company"
									value={this.state.company}
									name="company"
									onChange={this.changeHandler}
									error={errors.company}
									info="Could be your own company or one you work for"
								/>
								<TextFieldGroup
									placeholder="Website"
									value={this.state.website}
									name="website"
									onChange={this.changeHandler}
									error={errors.website}
									info="Could be your own website or a company one"
								/>
								<TextFieldGroup
									placeholder="Location"
									value={this.state.location}
									name="location"
									onChange={this.changeHandler}
									error={errors.location}
									info="City or city &amp; state suggested (eg. Boston, MA)"
								/>
								<TextFieldGroup
									placeholder="* Skills"
									value={this.state.skills}
									name="skills"
									onChange={this.changeHandler}
									error={errors.skills}
									info="Please use a comma separated values (eg. HTML,CSS,Javascript,PHP)"
								/>
								<TextFieldGroup
									placeholder="Github Username"
									value={this.state.githubusername}
									name="githubusername"
									onChange={this.changeHandler}
									error={errors.githubusername}
									info="If you want your latest repos and a Github link, include your username"
								/>
								<TextareaFieldGroup
									placeholder="Short Bio"
									value={this.state.bio}
									name="bio"
									onChange={this.changeHandler}
									error={errors.bio}
									info="Tell us a little about yourself"
								/>

								<div className="mb-3">
									<button
										type="button"
										onClick={() => {
											this.setState(({ displaySocialInput }) => ({
												displaySocialInput: !displaySocialInput,
											}));
										}}
										className="btn btn-light"
									>
										Add Social Network Links
									</button>
									<span className="text-muted">Optional</span>
									{socialInputs}
									<input
										type="submit"
										value="Submit"
										className="btn btn-info btn-block mt-4"
									/>
								</div>
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
	{ createProfile }
)(withRouter(CreateProfile));
