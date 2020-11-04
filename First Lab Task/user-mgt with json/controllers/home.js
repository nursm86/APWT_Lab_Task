const express 	= require('express');
const fs			= require('fs');
const router 	= express.Router();

router.get('/', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		res.render('home/index', {name: 'alamin', id:'123'});		
	}else{
		res.redirect('/login');
	}
});


router.get('/userlist', (req, res)=>{
	var data=fs.readFileSync('./controllers/userlist.json', 'utf8');
	var userlist=JSON.parse(data);
	var list = [];

	userlist.forEach(function(user){
		list.push([user.id,user.username,user.email,user.password]);
	});
	if(req.cookies['uname'] != null){
		res.render('home/userlist', {users: list});		
	}else{
		res.redirect('/login');
	}
});

module.exports = router;

//url design eg. /logout -> get or post request
//adding middleware to app.js
//creating controller/router  eg. router.get(), router.post()
//creating VIEWS
//sending response -> json, ejs
