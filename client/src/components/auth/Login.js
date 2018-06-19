import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
	static propTypes = {
		loginUser: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired
	};

	state = {
		email: '',
		password: '',
		errors: {}
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	changeHandler = (e) => {
		const { name, value } = e.target;
		this.setState((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	submitHandler = (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		this.props.loginUser({ email, password });
	};

	render() {
		const { errors } = this.state;
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">
								Sign in to your DevConnector account
							</p>
							<form noValidate onSubmit={this.submitHandler}>
								<TextFieldGroup
									type="email"
									value={this.state.email}
									onChange={this.changeHandler}
									error={errors.email}
									placeholder="Email Address"
									name="email"
								/>
								<TextFieldGroup
									type="password"
									value={this.state.password}
									onChange={this.changeHandler}
									error={errors.password}
									placeholder="Password"
									name="password"
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

export default connect(({ auth, errors }) => ({ auth, errors }), { loginUser })(Login);
