module.exports= function Cart(OldCart) {
    this.items =OldCart.items || {} ;
    this.totalQty =OldCart.totalQty || 0;
    this.totalPrice=OldCart.totalPrice || 0;

    this.add = function (item, id) {
        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id]={item:item, quantity:0, price:0}
        }
        storedItem.quantity++;
        storedItem.price = storedItem.item.price * storedItem.quantity;
        this.totalQty++;
        this.totalPrice +=storedItem.item.price;
    }
    
    this.generateArray = function () {
        var arr=[];
        for (var id in this.items){
            arr.push(this.items[id])
        }
        return arr ;
    }
}