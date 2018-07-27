var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart')
var Order= require('../models/orders')


/* GET home page. */
router.get('/', function(req, res, next) {
    var successMsg=req.flash('success')[0];
  Product.find(function (err , docs) {

    var ProductChunks=[];
    var size =3;
    
    for (var i=0;i<docs.length;i+=size)
    {
      ProductChunks.push(docs.slice(i,i+size))
    }

      res.render('index', { title: 'Express' , products:ProductChunks, successMsg:successMsg, noMessage: !successMsg});
  })

});

router.get('/add-to-cart/:id',function (req, res, next) {
    var productId= req.params.id;
    // console.log("id is "+productId)
    // console.log("Session is"+req.session.cart)

    var cart = new Cart(req.session.cart ? req.session.cart : {})

    Product.findById(productId, function (err, product) {
        if(err){
          return res.redirect('/')
        }
        cart.add(product, productId);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/')

    })
})

router.get('/reduce/:id', function (req, res, next) {
    var productId= req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {})

    cart.reduceByone(productId);
    req.session.cart = cart;
    res.redirect('/shoping-cart')

})

router.get('/remove/:id', function (req, res, next) {
    var productId= req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {})

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shoping-cart')

})


router.get('/shoping-cart',isLoggedIn, function (req, res, next) {
    if(!req.session.cart){
      res.render('./shoping-cart',{products:null})
    }
    var cart = new Cart(req.session.cart)
    res.render('./shoping-cart',{products:cart.generateArray(),totalPrice:cart.totalPrice,stripetotal:cart.totalPrice*1.5})
})

router.get('/checkout', isLoggedIn,function (req, res, next) {
    if(!req.session.cart) {
        res.redirect('./shoping-cart');
    }



    var cart = new Cart(req.session.cart)
    var errMsg=req.flash('error')[0];
    console.log("eroorrs"+errMsg)
    //res.render('./checkout',{total:cart.totalPrice, errMsg:errMsg, noError: !errMsg})
    console.log((cart.totalPrice)*1.5)
    res.render('./checkout',{total:((cart.totalPrice)*1.5)})


})

router.post('/checkout',function (req, res, next) {
    if(!req.session.cart) {
        res.redirect('./shoping-cart');
    }
    var cart = new Cart(req.session.cart)

    var stripe = require("stripe")(
        "sk_test_pc5rALKTLNClqOMR32PpkSvl"
    );

    stripe.charges.create({
        amount: cart.totalPrice*1.5,
        currency: "usd",
        //source: req.body.stripeToken, // obtained with Stripe.js
        source: "tok_mastercard",
        description: "Charge for jenny.rosen@example.com"
    }, function(err, charge, ) {

        // asynchronously called
        if(err){
            req.flash('error',err.message);
            return(res.redirect('/checkout'))
        }

        var order = new Order({
            user:req.user,
            cart:cart,
            address:req.body.address,
            name:req.body.customername,
            paymentId:charge.id

        });
        
        order.save(function (err, result) {
            req.flash('success', "Successfully bought");
            req.session.cart=null;
            res.redirect('/')
        })


    });

})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    req.session.oldURL =req.url;
    res.redirect('/user/signin')
}

module.exports = router;
