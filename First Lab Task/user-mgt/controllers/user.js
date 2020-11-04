const express 	= require('express');
const router 	= express.Router();

router.get('/create', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		res.render('user/create');
	}else{
		res.redirect('/login');
	}
});

router.post('/create', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		var user = [++req.session.uid,req.body.username, req.body.email,req.body.password];
		console.log(user);
		var newlist = req.session.userlist;
		newlist.push(user);
		console.log(newlist);
		req.session.userlist = newlist;
		res.redirect('/home/userlist');
	}else{
		res.redirect('/login');
	}
});

router.get('/edit/:id', (req, res)=>{

	//res.send(req.params.id + "<br>"+ req.params.name);
	
	if(req.cookies['uname'] != null){
		var userlist = req.session.userlist;
		var editUser;
		userlist.forEach(function(user,index){
			if(req.params.id == user[0]){
				editUser = user;
			}
		});
		res.render('user/edit', editUser);
	}else{
		res.redirect('/login');
	}
});

router.post('/edit/:id', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		var userlist = req.session.userlist;
		userlist.forEach(function(user,index){
			if(req.params.id == user[0]){
				userlist[index][1] = req.body.username;
				userlist[index][2] = req.body.email;
				userlist[index][3] = req.body.password;
			}
		});
		req.session.userlist = userlist;
		res.redirect('/home/userlist');
	}else{
		res.redirect('/login');
	}
});

router.get('/delete/:id', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		var user = {username: 'alamin', password: '123', email: 'email@gmail.com'};
		res.render('user/delete', user);
	}else{
		res.redirect('/login');
	}
});

router.post('/delete/:id', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		//res.send('done!');
		res.redirect('/home/userlist');
	}else{
		res.redirect('/login');
	}
});

module.exports = router;

