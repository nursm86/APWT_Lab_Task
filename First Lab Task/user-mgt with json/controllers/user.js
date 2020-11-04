const express 	= require('express');
const fs			= require('fs');
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
		var data=fs.readFileSync('./controllers/userlist.json', 'utf8');
		var userlist=JSON.parse(data);
		var newlist = [];

		userlist.forEach(function(user){
			newlist.push([user.id,user.username,user.email,user.password]);
		});
		newlist.push(user);
		var userobj = [];
		newlist.forEach(function(user){
			userobj.push({
				id : user[0],
				username : user[1],
				email : user[2],
				password : user[3]
			});

		});
		fs.writeFile("./controllers/userlist.json", JSON.stringify(userobj, null, 4), (err) => {
			if (err) {
				console.error(err);
				return;
			}
		});
		res.redirect('/home/userlist');
	}else{
		res.redirect('/login');
	}
});

router.get('/edit/:id', (req, res)=>{

	//res.send(req.params.id + "<br>"+ req.params.name);
	
	if(req.cookies['uname'] != null){
		var data=fs.readFileSync('./controllers/userlist.json', 'utf8');
		var list=JSON.parse(data);
		var userlist = [];
		list.forEach(function(user){
			userlist.push([user.id,user.username,user.email,user.password]);
		});

		var editUser;
		userlist.forEach(function(user,index){
			if(req.params.id == user[0]){
				editUser = {
					username : user[1],
					email : user[2],
					password : user[3]
				};
			}
		});
		res.render('user/edit', editUser);
	}else{
		res.redirect('/login');
	}
});

router.post('/edit/:id', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		var data=fs.readFileSync('./controllers/userlist.json', 'utf8');
		var list=JSON.parse(data);
		var userlist = [];
		list.forEach(function(user){
			userlist.push([user.id,user.username,user.email,user.password]);
		});
		userlist.forEach(function(user,index){
			if(req.params.id == user[0]){
				userlist[index][1] = req.body.username;
				userlist[index][2] = req.body.email;
				userlist[index][3] = req.body.password;
			}
		});
		var userobj = [];
		userlist.forEach(function(user){
			userobj.push({
				id : user[0],
				username : user[1],
				email : user[2],
				password : user[3]
			});

		});
		fs.writeFile("./controllers/userlist.json", JSON.stringify(userobj, null, 4), (err) => {
			if (err) {
				console.error(err);
				return;
			}
		});
		res.redirect('/home/userlist');
	}else{
		res.redirect('/login');
	}
});

router.get('/delete/:id', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		var data=fs.readFileSync('./controllers/userlist.json', 'utf8');
		var list=JSON.parse(data);
		var userlist = [];
		list.forEach(function(user){
			userlist.push([user.id,user.username,user.email,user.password]);
		});

		var deleteUser;
		userlist.forEach(function(user,index){
			if(req.params.id == user[0]){
				deleteUser = {
					username : user[1],
					email : user[2],
					password : user[3]
				};
			}
		});
		res.render('user/delete', deleteUser);
	}else{
		res.redirect('/login');
	}
});

router.post('/delete/:id', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		var data=fs.readFileSync('./controllers/userlist.json', 'utf8');
		var list=JSON.parse(data);
		var userlist = [];
		list.forEach(function(user){
			userlist.push([user.id,user.username,user.email,user.password]);
		});
		var userobj = [];
		userlist.forEach(function(user){
			if(req.params.id != user[0]){
				userobj.push({
					id : user[0],
					username : user[1],
					email : user[2],
					password : user[3]
				});
			}
		});
		fs.writeFile("./controllers/userlist.json", JSON.stringify(userobj, null, 4), (err) => {
			if (err) {
				console.error(err);
				return;
			}
		});
		res.redirect('/home/userlist');
	}else{
		res.redirect('/login');
	}
});

module.exports = router;

