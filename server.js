const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB CONFIG
const db = require('./config/keys').mongoUrl;

// connect to mongodb
mongoose
	.connect(db)
	.then(() => console.log('mongo db connected'))
	.catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport.js')(passport);

app.get('/', (req, res) => res.send('Welcome'));
// use routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

// Server static assets if in production

// ... other app.use middleware setups
app.use(express.static(path.join(__dirname, 'client', 'build')));

// ...
// Right before your app.listen(), add this:
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`the app up on port ${port}`));
