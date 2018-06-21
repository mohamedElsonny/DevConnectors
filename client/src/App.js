import React, { Component } from 'react';

// react router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// some redux utils
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileAction';

import './App.css';

// components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

// check for token
if (localStorage.getItem('jwtToken')) {
	// set auth token header auth
	setAuthToken(localStorage.getItem('jwtToken'));

	// decode token and get user info
	const decoded = jwt_decode(localStorage.getItem('jwtToken'));

	// set user and isAuthintication
	store.dispatch(setCurrentUser(decoded));

	// check for expired token
	const currentTime = Date.now() / 1000;
	if (currentTime > decoded.exp) {
		// logout user
		store.dispatch(logoutUser());

		// clear current profile
		store.dispatch(clearCurrentProfile());

		// redirect to login
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar />
						<Route path="/" exact component={Landing} />
						<div className="container">
							<Switch>
								<Route path="/login" exact component={Login} />
								<Route path="/register" exact component={Register} />
								<PrivateRoute path="/dashboard" exact component={Dashboard} />
								<PrivateRoute
									path="/create-profile"
									exact
									component={CreateProfile}
								/>
								<PrivateRoute
									path="/edit-profile"
									exact
									component={EditProfile}
								/>
								<PrivateRoute
									path="/add-experience"
									exact
									component={AddExperience}
								/>
								<PrivateRoute
									path="/add-education"
									exact
									component={AddEducation}
								/>
								<PrivateRoute path="/feed" exact component={Posts} />
								<PrivateRoute path="/post/:id" exact component={Post} />
								<Route path="/profiles" exact component={Profiles} />
								<Route
									path="/profile/user/:user_id"
									exact
									component={Profile}
								/>
								<Route path="/not-found" exact component={NotFound} />
							</Switch>
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
