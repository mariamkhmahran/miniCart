import { Injectable } from '@angular/core';
import * as localForage from 'localforage';

@Injectable()
export class CartService {

    items: [any];

    constructor() { }

    addItem(product) {

        const self = this;

        localForage.getItem('items').then(function (value) {

            if(value){
                self.items = value as [any];
            } else {
                self.items = [] as [any];
            }

            var index = self.getItemIndex(product);
            if (index > -1) {
                self.items[index].count++;
                self.items[index].price = self.items[index].count * (self.items[index].product.price as number);
            } else {
                let item = {
                    product: product,
                    count: 1,
                    price: (product.price as number) * 1
                }
                self.items.push(item);
            }
            localForage.setItem('items', self.items);            
        }).catch(function (err) {
            console.log(err);
        });
    }

    getItemIndex(product) {
        for ( let i = 0 ; i < this.items.length ; i++) {
            if (this.items[i].product.id === product.id) {
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

    removeItem(product) {

        const self = this;

        localForage.getItem('items').then(function (value) {
            
            if(value){
                self.items = value as [any];
            } else {
                self.items = [] as [any];
            }
            
            var index = self.getItemIndex(product);
            if (index > -1) {
                self.items[index].count--;
                self.items[index].price = self.items[index].count * (self.items[index].product.price as number);
                if (self.items[index].count == 0){
                    self.items.splice(index,1);
                }
            }
            localForage.setItem('items', self.items);            
        }).catch(function (err) {
            console.log(err);
        });
    }
}
