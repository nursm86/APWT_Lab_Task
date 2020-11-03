const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{
	var userlist = [
		["nur","123"],
		["emon","456"],
		["nayeem","789"]
	]
	var loggedin = false;

	userlist.forEach(function(user){
		if(req.body.username == user[0] && req.body.password == user[1]){
			loggedin = true;
		}
	})

	if(loggedin){
		res.cookie('uname', req.body.username);
		res.redirect('/home');

	}else{
		res.redirect('/login');
	}
}); 


module.exports = router;



