const express 	= require('express');
const fs			= require('fs');
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{
	var data=fs.readFileSync('./controllers/userlist.json', 'utf8');
	var userlist=JSON.parse(data);
	req.session.uid = '3';
	var loggedin = false;

	userlist.forEach(function(user){
		if(req.body.username == user.username && req.body.password == user.password){
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



