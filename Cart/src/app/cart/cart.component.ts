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
    }

    getItems() {
        this.cartService.newItems.subscribe((value: [any]) => { this.items = value; });
        this.cartService.newTotal.subscribe((value: number) => { this.total = value; });
    }

    addItem(index) {
        
        var product = this.items[index].product;

        this.cartService.addItem(product);
        
    }

    removeItem(index) {
        
        var product = this.items[index].product;

        this.cartService.removeItem(product);
        
    }

    removeProduct(product) {
        this.cartService.removeProduct(product);
    }

    clearCart(type) {
        console.log(type);
        this.cartService.clearCart();

        if(type === "buy") {
            var x = document.getElementById("thanks");

            x.className = "show";

            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
    }

}