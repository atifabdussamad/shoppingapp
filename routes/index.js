var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart')


/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function (err , docs) {

    var ProductChunks=[];
    var size =3;
    
    for (var i=0;i<docs.length;i+=size)
    {
      ProductChunks.push(docs.slice(i,i+size))
    }

      res.render('index', { title: 'Express' , products:ProductChunks});
  })

});

router.get('/add-to-cart/:id',function (req, res, next) {
    var productId= req.params.id;
    console.log("id is "+productId)
    console.log("Session is"+req.session.cart)

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

router.get('/shoping-cart', function (req, res, next) {
    if(!req.session.cart){
      res.render('./shoping-cart',{products:null})
    }
    var cart = new Cart(req.session.cart)
    res.render('./shoping-cart',{products:cart.generateArray(),totalPrice:cart.totalPrice})
})

router.get('/checkout', function (req, res, next) {
    if(!req.session.cart) {
        res.redirect('./shoping-cart');
    }
    var cart = new Cart(req.session.cart)
    res.render('./checkout',{total:cart.totalPrice})

})

module.exports = router;
