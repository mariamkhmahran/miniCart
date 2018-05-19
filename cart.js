export default class Cart {
    constructor() {
        this.items = [];
    }

    getItems() {
        return this.items;
    }

    getItemIndex(product) {
        for( let i = 0 ; i < this.items.length ; i++) {
            if (this.items[i].product.id === product.id){
                return i;
            }
        }
        return -1;
    }

    hasProduct(product) {
        if(this.getItemIndex(product) === -1) {
            return false;
        }
        return true;
    }

    addItem(product) {
        var index = this.getItemIndex(product);
        if (index > -1) {
            this.items[index].count++;
            this.items[index].price = this.items[index].count * this.items[index].product.price;
        } else {
            let item = {
                product: product,
                count: 1,
                price: product.price
            }
            this.items.push(item);
        }
    }

    removeItem(product) {
        var index = this.getItemIndex(product);
        if(index > -1) {
            this.items[index].count--;
            this.items[index].price = this.items[index].count * this.items[index].product.price;
            if (this.items[index].count === 0) {
                this.items.splice(index, 1);
            }
        }
    }

    removeProduct(product) {
        var index = this.getItemIndex(product);
        if(index > -1) {
            this.items.splice(index, 1);
        }
    }

    getItem(product) {
        let index = this.getItemIndex(product);
        if (index > -1 ){
            return this.items[index];
        }
        return null;
    }

    getTotal() {
        let total = 0;
        for(let i = 0 ; i < this.items.length ; i++) {
            total += this.items[i].price;
        }
        return total;
    }

    clearCart() {
        this.items = [];
    }

}