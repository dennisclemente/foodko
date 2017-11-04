module.exports = {
    ensureAuthneticated: function(res, res, next) {
        if(req.isAuthenticated()) {
            return next();
    }
        res.redirect('/');
    },
    ensureGuest: function(res, res, next) {
        if(req.isAuthenticated()) {
            res.redirect('/dashboard');
    }   else {
            return next();
        }
    }
}