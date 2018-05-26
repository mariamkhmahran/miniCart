import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as localForage from 'localforage';

@Injectable()
export class CartService {

    items: [any];
    newItems: Subject<[any]> = new Subject<[any]>();
    newTotal: Subject<number> = new Subject<number>();
    newCount: Subject<number> = new Subject<number>();

    constructor() {

        this.newItems.subscribe((value) => {this.items = value});

        this.getItems();
    }

    async getItems(): Promise<Observable<[any]>> {
        const self = this;

        return (localForage.getItem('items').then(async function (value) {
            self.newItems.next(await value as [any]);
            self.newTotal.next(self.getTotal());
            self.newCount.next(self.items.length);
            console.log(self.items.length);
            return Observable.interval(2200).map(i => value as [any]);
        }).catch(function (err) {
            console.log(err);
        })) as Promise<Observable<any>>;
    }

    addItem(product) {

        const self = this;
        
        // this.getItems().then(value => this.items = value as [any]);

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

        localForage.setItem('items', self.items).then(function(){
            self.getItems();
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

        var index = self.getItemIndex(product);
        if (index > -1) {
            self.items[index].count--;
            self.items[index].price = self.items[index].count * (self.items[index].product.price as number);
            if (self.items[index].count == 0){
                self.items.splice(index,1);
            }
        }

        localForage.setItem('items', self.items).then(function(){
            self.getItems();
        });
    }

    removeProduct(product) {
        const self = this;

        var index = self.getItemIndex(product);
        this.items.splice(index, 1);

        localForage.setItem('items', self.items).then(function(){
            self.getItems();
        });
    }

    getTotal() {
        let total = 0;
        for(let i = 0 ; i < this.items.length ; i++) {
            let price = this.items[i].price as number;
            total += price;
        }
        return total;
    }

    clearCart() {
        const self = this;
        localForage.setItem('items', []).then(function(){
            self.getItems();
        });
    }

}
