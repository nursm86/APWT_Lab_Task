const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{
	if(!req.session.first){
		var users = [
			['1', 'alamin', 'abc@gmail.com', '123'],
			['2', 'pqr', 'pqr@gmail.com', '123'],
			['3', 'xyz', 'xyz@gmail.com', '123'],
			['4','nur','nur@gmail.com','1']
		];
		req.session.userlist = users;
		req.session.uid = '4';
		req.session.first = true;
	}
	var userlist = req.session.userlist;
	var loggedin = false;

	userlist.forEach(function(user){
		if(req.body.username == user[1] && req.body.password == user[3]){
			loggedin = true;
		}
	});

	if(loggedin){
		res.cookie('uname', req.body.username);
		res.redirect('/home');

	}else{
		res.redirect('/login');
	}	
}); 


module.exports = router;



