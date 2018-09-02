var passport					=	require('passport');
var LocalStrategy 				=	require('passport-local').Strategy;
var sql           				=   require('mssql');
var r 							= 	new sql.Request();

/*passport.serializeUser(function (user, done) {
	done(null, user.username);
});
*/
/*passport.deserializeUser(function(username, done){
    r.query(`SELECT * FROM users WHERE username='${username}`, function (error2, user) {
        if (error2) {
            console.log(error2);
            return;
        }
        if(user.recordset.length > 0) {
            done(error2, user);
        }
    });
});*/

passport.use('local.signin', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, username, password, done) {
	req.checkBody('username','The Usrname field can not emapty.').notEmpty();
    req.checkBody('password','The Password field can not emapty.').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		var messages = [];
		errors.forEach(function(error){
			messages.push(error.msg);
		});
		return done(null, false, req.flash('error', messages));
	}
    r.query(`SELECT * FROM users WHERE username='${username}'`, function (error, user) {
        if (error) {
            return done(error);
        }
        if(user.recordset.length > 0) {
        	if(user.recordset[0].password == password){
                return done(null, user);
			} else {
                return done(null, false, {message: ' Password Not Valid'})
			}
        } else {
            return done(null, false, {message: ' User Not founded'})
		}
    });
}));
