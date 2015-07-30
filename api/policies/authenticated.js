/**
 * Allow any authenticated user.
 */
module.exports = function(req, res, ok) {
  // res.locals.flash = {};
  // res.session.flash = {};
  // User is allowed, proceed to controller
  if (req.session.User) {
    return ok();
  }

  // User is not allowed
  else {
    var requireLoginError = [{name: 'requireLogin', message: 'You must be signed in.'}]
    req.session.flash = {
    err: requireLoginError
    }
    res.redirect('/session/new');
    return;
  }
};
