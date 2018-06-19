import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated }, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			isAuthenticated === true ? (
				<Component {...props} />
			) : (
				<Redirect to="/login" />
			)}
	/>
);

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired
};

export default connect(({ auth }) => ({ auth }))(PrivateRoute);
