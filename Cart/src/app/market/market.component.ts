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

  constructor(private cartService: CartService) { }

  ngOnInit() {
    const self = this;
    
    axios.get('https://faker-api-yczfsfkfcd.now.sh/api/products')
    .then(function (response) {
      self.products = response.data.data;
    })
    .catch(function (error) {
        console.log(error);
    });

  }

  addToCart(i: number) {

    var product = this.products[i];

    this.cartService.addItem(product);
  }
}
