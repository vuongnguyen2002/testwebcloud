var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
// var Product = require('../models/product');
var AddProduct = require('../models/addProduct');

// var AddProduct2 = require('../models/addProduct2');
// var Mobile  = require('../models/mobile');
var Phone = require('../models/phone');
// var Tera = require('../models/tera');
var Order = require('../models/order');


//GET home page.
router.get('/', function(req, res, _next) {  
  	res.render('shop/index');
  });

  router.get('/admin', function(req, res, _next) {  
  	res.render('shop/admin');
  });
// router.get('/categories/game',function(req,res,next){
//    Product.find(function(err,docs){
//     var productChunks = [];
//     var chunkSize = 3;
//     for(var i=0;i<docs.length;i+=chunkSize){
//       productChunks.push(docs.slice(i,i+chunkSize));
//     }
//       res.render('categories/game',{products: productChunks});
//    });
// });

router.get('/categories/viewproduct',function(req,res,_next){
  Phone.find(function(err,docs){
   var productChunks = [];
   var chunkSize = 10;
   for(var i=0;i<docs.length;i+=chunkSize){
     productChunks.push(docs.slice(i,i+chunkSize));
   }
     res.render('categories/viewproduct',{phones: productChunks});
  });
});
// router.get('/categories/viewproduct2',function(req,res,next){
//   Tera.find(function(err,docs){
//    var productChunks = [];
//    var chunkSize = 10;
//    for(var i=0;i<docs.length;i+=chunkSize){
//      productChunks.push(docs.slice(i,i+chunkSize));
//    }
//      res.render('categories/viewproduct2',{teras: productChunks});
//   });
// });




router.get('/categories/phone',function(req,res,_next){
   Phone.find(function(err,docs){
    var productChunks = [];
    var chunkSize = 3;
    for(var i=0;i<docs.length;i+=chunkSize){
      productChunks.push(docs.slice(i,i+chunkSize));
    }
      res.render('categories/phone',{phones: productChunks});
   });
});

// router.get('/categories/tera',function(req,res,next){
//    Tera.find(function(err,docs){
//     var productChunks = [];
//     var chunkSize = 3;
//     for(var i=0;i<docs.length;i+=chunkSize){
//       productChunks.push(docs.slice(i,i+chunkSize));
//     }
//       res.render('categories/tera',{teras: productChunks});
//    });
// });


router.get('/categories/updatepro',async (req,res,_next)=>{
  var id = req.query.id;
  var pho = await Phone.find({_id:id})
    res.render('categories/updatepro', {pho:pho[0]});
});

router.get('/delete/:id', function(req, res){
  var phoId = req.params.id;
  Phone.findByIdAndRemove(phoId, function(err, phone){
      return res.redirect('../categories/viewproduct')
  });
});

router.get('/details/mob-detail/:id', function(req, res){
  var phoId = req.params.id;

  Phone.findById(phoId, function(err, phone){
    if(err) {
      return res.redirect('categories/phone')
    }
      res.render('details/mob-detail');
  });
});

router.get('/categories/recently-added',function(req,res,_next){
   AddProduct.find(function(err,docs){
    var productChunks = [];
    var chunkSize = 3;
    for(var i=0;i<docs.length;i+=chunkSize){
      productChunks.push(docs.slice(i,i+chunkSize));
    }
      res.render('categories/recently-added',{addproducts: productChunks});
   });
});


router.get('/add-to-cart/:id', function(req,res,_next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart: {});
   Phone.findById(productId, function(err, phone){
      if (err){
         return res.redirect('/');
      }
      cart.add(phone, phone.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect('/categories/phone');
    });
});

// router.get('/add-to-cart2/:id', function(req,res,next){
//     var productsId = req.params.id;
//     var cart = new Cart(req.session.cart ? req.session.cart: {});
//     //var cartnew = new Cart(req.session.cart ? req.session.cart: {});
//    Product.findById(productsId, function(err, product){
//       if (err){
//          return res.redirect('/');
//       }
//       cart.add(product, product.id);
//       req.session.cart = cart;
//       console.log(req.session.cart);
//       res.redirect('/categories/game');
//     });
//  });
// router.get('/add-to-cart3/:id', function(req,res,next){
//     var productsId = req.params.id;
//     var cart = new Cart(req.session.cart ? req.session.cart: {});
//     //var cartnew = new Cart(req.session.cart ? req.session.cart: {});
//    Tera.findById(productsId, function(err, electronic){
//       if (err){
//          return res.redirect('/');
//       }
//       cart.add(Tera, tera.id);
//       req.session.cart = cart;
//       console.log(req.session.cart);
//       res.redirect('/categories/tera');
//     });
//  });

// router.get('/add-to-cart4/:id', function(req,res,next){
//     var productsId = req.params.id;
//     var cart = new Cart(req.session.cart ? req.session.cart: {});
//     //var cartnew = new Cart(req.session.cart ? req.session.cart: {});
//    Gaming.findById(productsId, function(err, gaming){
//       if (err){
//          return res.redirect('/');
//       }
//       cart.add(gaming, gaming.id);
//       req.session.cart = cart;
//       console.log(req.session.cart);
//       res.redirect('/categories/gaming');
//     });
//  });

// router.get('/add-to-cart5/:id', function(req,res,next){
//     var productsId = req.params.id;
//     var cart = new Cart(req.session.cart ? req.session.cart: {});
//     //var cartnew = new Cart(req.session.cart ? req.session.cart: {});
//    Mobile.findById(productsId, function(err, mobile){
//       if (err){
//          return res.redirect('/');
//       }
//       cart.add(mobile, mobile.id);
//       req.session.cart = cart;
//       console.log(req.session.cart);
//       res.redirect('/categories/mobile');
//     });
//  });

// router.get('/add-to-cart6/:id', function(req,res,next){
//     var productsId = req.params.id;
//     var cart = new Cart(req.session.cart ? req.session.cart: {});
//     //var cartnew = new Cart(req.session.cart ? req.session.cart: {});
//    AddProduct.findById(productsId, function(err, addproduct){
//       if (err){
//          return res.redirect('/');
//       }
//       cart.add(addproduct, addproduct.id);
//       req.session.cart = cart;
//       console.log(req.session.cart);
//       res.redirect('/categories/recently-added');
//     });
//  });

router.get('/remove/:id',function(req,res,_next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart: {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function(req,res,_next){
    if(!req.session.cart) {
        return res.render('shop/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/add-a-product',function(req,res,_next){
    res.render('shop/add-a-product');
});


router.post('/add-a-product',function(req,res,_next){
    var addproduct = new AddProduct({
        Type: req.body.Type,
        title: req.body.title,
        imagePath: req.body.imagePath,
        price: req.body.price,
        description: req.body.description
    });
    addproduct.save(function(err,result){
        res.redirect('/user/profile');
    });
});

// router.get('/add-a-product2',function(req,res,next){
//   res.render('shop/add-a-product2');
// });


// router.post('/add-a-product2',function(req,res,next){
//   var addproduct2 = new AddProduct2({
//       Type: req.body.Type,
//       title: req.body.title,
//       imagePath: req.body.imagePath,
//       price: req.body.price,
//       description: req.body.description
//   });
//   addproduct2.save(function(err,result){
//       res.redirect('/user/profile');
//   });
// });

router.get('/checkout',isLoggedIn, function(req,res,_next){
    if(!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout',{total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout',isLoggedIn,function(req,res,_next){
    if(!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);

    var stripe = require("stripe")(
    "sk_test_wBl869tG5uKEqyGzu7xvJi8O"
   );

  stripe.charges.create({
  amount: cart.totalPrice * 100,
  currency: "inr",
  source: req.body.stripeToken, // obtained with Stripe.js
  description: "Test Charge"
}, function(err, charge) {
  if(err){
    req.flash('error', err.message);
    return res.redirect('/checkout');
  }
    var order = new Order({
    user: req.user,
    cart: cart,
    address: req.body.address,
    name: req.body.name,
    paymentId: charge.id
  });
  order.save(function(err,result){
  req.flash('success', 'Successfully bought the product!');
  req.session.cart = null;
  res.redirect('/user/profile');
  });
});
});
//update 

router.post('/categories/updatepro', (req,res)=>{
  var phoId=req.body. phoId
  var Type =req.body.Type
    var title= req.body.title
   var imagePath =req.body.imagePath
   var  price = parseInt(req.body.price)
    var description=req.body.description
  var phoId = Phone.findOne({_id:phoId}, (err, pho)=>{
    if(err){
      res.status(500).send()
      return
    }
    if(! pho){
      res.status(404).send()
      return
    }
    
    pho.Type=req.body.Type
    pho.title= req.body.title
    pho.imagePath =req.body.imagePath
    pho.price = parseInt(req.body.price)
    pho.description=req.body.description
    pho.save((err,pho)=>{
      if(err){
        res.status(500).send()
        return
      }
      if(!pho){
        res.status(404).send()
        return
      }
      console.log( pho.title+" was updated in database")
      res.redirect("/categories/updatepro?id="+ pho.id)
    })
  })
});

module.exports = router;

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/USERS/signin');
}

