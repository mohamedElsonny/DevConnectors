import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
	static propTypes = {
		registerUser: PropTypes.func.isRequired,
		errors: PropTypes.object.isRequired
	};
	state = {
		name: '',
		email: '',
		password: '',
		password2: '',
		errors: {}
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}
	changeHandler = (event) => {
		const { name, value } = event.target;
		this.setState((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	submitHandler = (e) => {
		e.preventDefault();
		const { name, email, password, password2 } = this.state;
		this.props.registerUser({ name, email, password, password2 }, this.props.history);
	};

	render() {
		const { errors } = this.state;
		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">
								Create your DevConnector account
							</p>
							<form noValidate onSubmit={this.submitHandler}>
								<TextFieldGroup
									placeholder="Name"
									name="name"
									onChange={this.changeHandler}
									value={this.state.name}
									error={errors.name}
								/>
								<TextFieldGroup
									type="email"
									placeholder="Email Address"
									value={this.state.email}
									onChange={this.changeHandler}
									name="email"
									error={errors.email}
									info="This site uses Gravatar so if you want a profile
										image, use a Gravatar email"
								/>
								<TextFieldGroup
									value={this.state.password}
									onChange={this.changeHandler}
									type="password"
									error={errors.password}
									placeholder="Password"
									name="password"
								/>
								<TextFieldGroup
									value={this.state.password2}
									onChange={this.changeHandler}
									type="password"
									error={errors.password2}
									placeholder="Confirm Password"
									name="password2"
								/>

								<input
									type="submit"
									className="btn btn-info btn-block mt-4"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(({ errors, auth }) => ({ errors, auth }), { registerUser })(
	withRouter(Register)
);
