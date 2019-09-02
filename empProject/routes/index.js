var express = require('express');
var router = express.Router();

var passport = require('passport');
var pl = require('passport-local');
var User = require('./users');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/form',function(req, res, next){
  User.create(new User({
    username:req.body.username,
    age:req.body.age,
    address:req.body.address,
    mobile: req.body.mobile,
    email:req.body.email,
  })).then(function(userCreated){
    res.redirect('/');
  })
});

router.get('/delete/:id', function(req, res){
  User.findOneAndRemove({_id: req.params.id})
    .then(function(){
      res.redirect('/view');
    })
})

router.get('/view',function(req, res, next){
  User.find()
  .then( data => res.render('view', {data}))
  .catch( err => res.send(err));
});

router.post('/update/:id', function(req, res){
  const {username,age, address, mobile, email} = req.body;
  const data = { username, age, address, mobile, email   };
	User.findOneAndUpdate({_id:req.params.id},{$set: data}, {new: true})
        .then( () => res.redirect('/view'))
        .catch( err => res.send(err))
});

router.get('/update/:id', function(req, res, next) {
  User.findOne({_id: req.params.id})
  .then( data => res.render('update', {data}))
  .catch( err => res.send(err));  
});

router.get('/form', function(req, res, next) {
  res.render('form');
});

router.get('/view', function(req, res, next) {
  res.render('view');
});

router.get('/viewemp',function(req, res, next){
  let data= '';
  User.find({},function(err, doc){
    res.render('viewemp',{data:doc })
  })
});

router.get('/viewemp', function(req, res, next) {
  res.render('viewemp');
});

module.exports = router;
