/**
* UserController
*
* @description :: Server-side logic for managing users
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {
	'new': function(req, res) {
		res.view();
	},

	'create': function(req, res, next) {
		// Create a User with the params sent from
		// the sign-up form --> new.ejs
		User.create(req.params.all(), function userCreated(err,user) {
			// If there's an error
			// if (err) return next(err);
			if (err) {
				console.log(err);
				req.session.flash = {
					err: err
				}

				// If error redirect back to sign-up page
				return res.redirect('user/new');
			}
			// Log user in
			req.session.authenticated = true;
			req.session.User = user;
			// After successfully creating the user
			// redirect to the show action
			// res.json(user);
			res.redirect('/user/show/'+user.id);
		});
	},
	// render the profile view (ex /views/show.ejs)
	'show': function(req, res, next) {
		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return next(err);
			if (!user) return next();
			res.view({
				user: user
			});
		});
		/*
		var id = req.param('id');
		User.findOne()
		.where({id: id})
		.then(function(err, user){
			if (err) return next(err);
			if (!user) {
				return next();
			}
			else {
				res.view({
					user: user
				});
			}
		})
		.catch(function(err){
			res.badRequest('Something went wrong!');
		});
		*/
	},
	'index': function(req, res, next) {
		// console.log(new Date());
		// console.log(req.session.authenticated);
		// Get an array of all the users in the User collection
		User.find(function foundUsers(err, users) {
			if (err) return next(err);
			//pass the array down to the /views/index.ejs page
			res.view({
				users:users
			});
		});
	},
	// render the edit view (ex /views/edit.ejs)
	'edit': function(req, res, next) {
		// Find the user from the id passed in via params
		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return next(err);
			if (!user) return next();
			res.view({
				user: user
			});
		});
	},
	'update': function (req,res) {

	var params = _.extend(req.query || {}, req.params || {}, req.body || {});
	var id = params.id;

	if (!id) return res.send("No id specified.",500);

	User.update(id, params, function userUpdated(err, updatedUser) {
		if (err) {
			res.redirect('/user/edit');
		}
		if(!updatedUser) {
			res.redirect('/user/edit');
		}
		res.redirect('/user/show/'+id);
	});
},
	// process the info from edit view
	/*
	'update': function(req, res, next) {
		console.log(req.params());

		console.log('update was called');
		User.update(req.param('id'), req.params.all(), function userUpdated(err) {
			if (err) {
				// return res.redirect('/user/edit/' + req.param('id'));
			}
			// res.redirect('/user/show/' + req.param('id'));
		});
	}
	*/
	destroy: function(req, res, next) {
		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return next(err);
			if (!user) return next('User doesn\'t exist');
			User.destroy(req.param('id'), function userDestroyed(err) {
				if (err) return next(err);
			});
		res.redirect('/user');
		});
	}
};
