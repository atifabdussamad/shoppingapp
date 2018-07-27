var Product = require('../models/product');

var mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost:27017/shoping')
const url ="mongodb://atifabdussamad:gate123456@ds257551.mlab.com:57551/shoping-app";
mongoose.connect(url);

var products = [
                new Product({
        imagePath:'https://i.ebayimg.com/images/g/59oAAOSwVqlaIXRH/s-l300.jpg',
        title:'Being Human',
        description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        price:500
    }),
    new Product({
        imagePath:'https://ae01.alicdn.com/kf/HTB1HI7MJFXXXXbIXXXXq6xXFXXXo/Dexter-Shirt-Top-New-Cute-Style-New-Round-Collar-Short-Sleeve-T-shirt-Design-Male-Model.jpg_640x640.jpg',
        title:'Dexter',
        description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        price:300
    }),
    new Product({
        imagePath:'https://ae01.alicdn.com/kf/HTB14.cDIVXXXXbKXXXXq6xXFXXXB/Free-Shipping-Legend-OF-Aesthetics-T-Shirt-Men-Cotton-Man-tshirt-O-Neck-Short-Sleeve-Men.jpg',
        title:'Legends of Ar.',
        description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        price:700
    }),
    new Product({
        imagePath:'https://sc01.alicdn.com/kf/HT1lwKbFRVaXXagOFbXz/220128135/HT1lwKbFRVaXXagOFbXz.jpg',
        title:'DSGN',
        description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        price:100
    }),
    new Product({
        imagePath:'https://cdnb.lystit.com/200/250/tr/photos/5991-2015/08/12/esprit-blue-short-sleeve-t-shirt-995ee2k904-product-4-301757714-normal.jpeg',
        title:'FP Club',
        description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        price:200
    }),
    new Product({
        imagePath:'https://sc01.alicdn.com/kf/HT19X7aFKtaXXagOFbXi/220128135/HT19X7aFKtaXXagOFbXi.jpg',
        title:'ESPRIT',
        description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        price:500
    })
]

var done=0;
for (let i=0; i<products.length; i++){
    products[i].save(function (err,result) {
        done++
        if(done===products.length){
            exit();
        }

    });

}

function exit(){
             mongoose.disconnect();
}
