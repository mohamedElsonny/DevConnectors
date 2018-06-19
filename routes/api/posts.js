const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// post model
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// validation
const { validatePostInput } = require('../../validation');

// @route  GET api/posts
// @desc   get posts
// @acess  public
router.get('/', (req, res) => {
	Post.find({})
		.sort({ date: -1 })
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({ nopostsfound: 'posts not found' }));
});

// @route  GET api/posts/:id
// @desc   get post
// @acess  public
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err =>
			res.status(404).json({ nopostfound: 'post not found for that id' })
		);
});

// @route  POST api/posts
// @desc   create post
// @acess  private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		// check validation
		if (!isValid) {
			// if any errors, send 400 with errors object
			return res.status(400).json(errors);
		}

		// create new post
		const newPost = new Post({
			text: req.body.text,
			name: req.body.name,
			avatar: req.body.avatar,
			user: req.user.id
		});
		newPost.save().then(post => res.json(post));
	}
);

// @route  POST api/posts/like/:id
// @desc	 like a post
// @acess  private
router.post(
	'/like/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Post.findById(req.params.id)
			.then(post => {
				if (
					post.likes.filter(like => like.user.toString() === req.user.id)
						.length > 0
				) {
					return res
						.status(400)
						.json({ alreadyliked: 'User already liked this post' });
				}

				post.likes.unshift({ user: req.user.id });
				post.save().then(post => res.json(post));
			})
			.catch(err =>
				res.status(404).json({ nopostfound: 'post not found for that id' })
			);
	}
);

// @route  POST api/posts/unlike/:id
// @desc	 unlike a post
// @acess  private
router.post(
	'/unlike/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Post.findById(req.params.id)
			.then(post => {
				if (
					post.likes.filter(like => like.user.toString() === req.user.id)
						.length === 0
				) {
					return res
						.status(400)
						.json({ notliked: 'You have not yet liked this post' });
				}

				const removeIndex = post.likes
					.map(item => item.user.toString())
					.indexOf(req.user.id);

				post.likes.splice(removeIndex, 1);
				post.save().then(post => res.json(post));
			})
			.catch(err =>
				res.status(404).json({ nopostfound: 'post not found for that id' })
			);
	}
);

// @route  DELETE api/posts/:id
// @desc   delete post
// @acess  private
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					// Check for post owner
					if (post.user.toString() !== req.user.id) {
						return res
							.status(401)
							.json({ notauthorized: 'User not authorized' });
					}

					// Delete
					post.remove().then(() => res.json({ success: true }));
				})
				.catch(err =>
					res.status(404).json({ nopostfound: 'post not found for that id' })
				);
		});
	}
);

// @route  POST api/posts/comment/:id
// @desc   add comment to post
// @acess  private
router.post(
	'/comment/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		// check validation
		if (!isValid) {
			// if any errors, send 400 with errors object
			return res.status(400).json(errors);
		}
		Post.findById(req.params.id)
			.then(post => {
				const newComment = {
					text: req.body.text,
					name: req.body.name,
					avatar: req.body.avatar,
					user: req.user.id
				};

				console.log(post);
				// add to comment array
				post.comments.unshift(newComment);
				return post.save().then(newpost => res.json(newpost));
			})
			.catch(err => res.status(404).json({ postnotfound: 'No post found' }));
	}
);

// @route  DELETE api/posts/comment/:id/:comment_id
// @desc   remove comment from post
// @acess  private
router.delete(
	'/comment/:post_id/:comment_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Post.findById(req.params.post_id)
			.then(post => {
				// check if the comment exists
				if (
					(post.comments.filter(
						comment => comment._id.toString() === req.params.comment_id
					).length = 0)
				) {
					return res
						.status(404)
						.json({ commentnotexists: 'comment not exists' });
				}

				// get remove index
				const removeIndex = post.comments
					.map(item => item.id.toString())
					.indexOf(req.params.comment_id);
				post.comments.splice(removeIndex, 1);
				return post.save().then(newPost => res.json(newPost));
			})
			.catch(err => res.status(404).json({ postnotfound: 'No post found' }));
	}
);

module.exports = router;
