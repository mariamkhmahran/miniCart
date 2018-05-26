import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Product } from '../Product'
import * as localForage from 'localforage';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})

export class MarketComponent implements OnInit {

  products: [Product];
  cart: [any];

  constructor(private cartService: CartService) {
    this.cartService.newItems.subscribe((value: [any]) => { this.cart = value; });
  }

  ngOnInit() {
    const self = this;
    
    axios.get('https://faker-api-yczfsfkfcd.now.sh/api/products')
    .then(function (response) {
      self.products = response.data.data;
      for(let i = 0 ; i < self.products.length ; i++){
        self.products[i].price = self.products[i].price as number * 1;
      }
    })
    .catch(function (error) {
        console.log(error);
    });

  }

  addToCart(i: number) {

    var product = this.products[i];

    this.cartService.addItem(product);

    var x = document.getElementById("snackbar");

    x.className = "show";

    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  inCart(index): boolean {
    for(let i = 0; i < this.cart.length ; i++){
      if(this.cart[i].product.id == this.products[index].id){
        return true;
      }
      console.log("false");
    }
  }
}
