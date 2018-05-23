import { Component, OnInit } from '@angular/core';
import * as localForage from 'localforage';
import { CartService } from "../cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})



export class CartComponent implements OnInit {

    items: [any];
    total: number;

    constructor(private cartService: CartService) {
    }


    ngOnInit() {
        this.getItems();
        setInterval(() => {
            this.getItems();
        }, 2000);
    }

    getItems() {
        const self = this;
        
        localForage.getItem('items').then(function (value) {
            self.items = value as [any];
            self.total = self.getTotal();
        }).catch(function (err) {
            console.log(err);
        });
    }

    addItem(index) {
        
        var product = this.items[index].product;

        this.cartService.addItem(product);
        setTimeout(() => 
        {
            this.getItems();
        },
        300);
        
    }

    removeItem(index) {
        
        var product = this.items[index].product;

        this.cartService.removeItem(product);
        setTimeout(() => 
        {
            this.getItems();
        },
        300);
        
    }

    removeProduct(index) {

        const self = this;
        this.items.splice(index, 1);

        localForage.setItem('items', self.items).then(function(){
            self.getItems();
            self.getTotal();
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
        this.items = null;
        this.total = 0;
        localForage.setItem('items', []);
    }

}