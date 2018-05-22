var cart = require('./cart').default;
var chai = require('chai');
var expect = chai.expect;

var product = {
    id: '00',
    name: 'milk',
    price: 50
}
var anotherProduct = {
    id: '01',
    name: 'cheese',
    price: 120
}

var myCart = new cart();

describe('Test cart methods', function() {
    it('Adding to the cart a product', function(){
        myCart.addItem(product);

        let items = myCart.getItems();
        
        expect(items).to.be.an('array');
        expect(items).to.have.length(1);
        expect(items[0].count).to.eql(1);
        expect(items[0].price).to.eql(50);
        expect(items[0].product.id).to.eql('00');
        expect(items[0].product.name).to.eql('milk');
        expect(items[0].product.price).to.eql(50);
    })
    it('Checking if the product is in the cart', function(){
        let inCart = myCart.hasProduct(product);

        expect(inCart).to.eql(true);
    })
    it('Adding the same product', function(){
        myCart.addItem(product);

        let items = myCart.getItems();
        
        expect(items).to.be.an('array');
        expect(items).to.have.length(1);
        expect(items[0].count).to.eql(2);
        expect(items[0].price).to.eql(100);
    })
    it('Get item of this product and checking that the count is 2 and the price is 2 times the product ', function(){
        let item = myCart.getItem(product);;
        
        expect(item.count).to.eql(2);
        expect(item.price).to.eql(100);
        expect(item.product.id).to.eql('00');
        expect(item.product.name).to.eql('milk');
        expect(item.product.price).to.eql(50);
    })
    it('Remove the product and checking the count of the item is back to 1 and price is back to 1 times the product\'s price ', function(){
        myCart.removeItem(product);

        let items = myCart.getItems();
        
        expect(items).to.have.length(1);
        expect(items[0].count).to.eql(1);
        expect(items[0].price).to.eql(50);
    })
    it('Add another product with a different id getting all items to check the items length is 2 ', function(){
        myCart.addItem(anotherProduct);

        let items = myCart.getItems();
        
        expect(items).to.have.length(2);
        expect(items[0].count).to.eql(1);
        expect(items[0].price).to.eql(50);
        expect(items[1].count).to.eql(1);
        expect(items[1].price).to.eql(120);
        expect(items[1].product.id).to.eql('01');
    })
    it('Get total', function(){
        let total = myCart.getTotal();
        
        expect(total).to.eql(170);
    })
    it('Delete the last product of an item and checking the item was removed', function(){
        myCart.removeItem(product);

        let items = myCart.getItems();
        
        expect(items).to.have.length(1);
        expect(items[0].count).to.eql(1);
        expect(items[0].price).to.eql(120);
        expect(items[0].product.id).to.eql('01');
        expect(items[0].product.name).to.eql('cheese');
        expect(items[0].product.price).to.eql(120);
    })
    it('Clear the cart', function(){
        myCart.clearCart();

        let items = myCart.getItems();
        
        expect(items).to.have.length(0);
    })
})