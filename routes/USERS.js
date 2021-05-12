var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var Order = require('../models/order');
var Cart = require('../models/cart');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile',isLoggedIn, function(req,res,next){
  var successMsg = req.flash('success')[0];
    Order.find({USERS: req.USERS},function(err, orders){
        if(err){
          return res.write('Error!');
        }
        var cart;
          orders.forEach(function(order){
          cart = new Cart(order.cart);
          order.items = cart.generateArray();
        });
        res.render('USERS/profile',{orders: orders , successMsg: successMsg, noMessage: !successMsg});
    });
});

router.get('/logout',isLoggedIn, function(req,res,next){
    req.logout();
    res.redirect('/');
});

router.use('/',notLoggedIn,function(req,res,next){
  next();
});

router.get('/signup',function(req,res,next){
  var messages = req.flash('error');
	res.render('USERs/signup',{csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length>0});
});

router.post('/signup', passport.authenticate('local.signup',{
    failureRedirect: '/USERS/signup',
    failureFlash: true
}),
function(req,res,next){
    if(req.session.oldUrl){
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    }else {
      res.redirect('/USERS/profile');
    }
}
);


router.get('/signin', function(req,res,next){
  var messages = req.flash('error');
  res.render('USERS/signin',{csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length>0});
});

router.post('/signin',passport.authenticate('local.signin',{
    failureRedirect: '/USERS/signin',
    failureFlash: true
}),
function(req,res,next){
    if(req.session.oldUrl){
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    }else {
      res.redirect('/USERS/profile');
    }
}
);

module.exports = router;

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req,res,next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
