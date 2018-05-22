import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Product } from '../Product'

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})

export class MarketComponent implements OnInit {

  products: [Product];

  constructor() { }

  ngOnInit() {
    const self = this;
    
    axios.get('https://faker-api-yczfsfkfcd.now.sh/api/products')
    .then(function (response) {
      console.log(response.data.data);
      self.products = response.data.data;
      console.log(self.products[0]);
    })
    .catch(function (error) {
        console.log(error);
    });
  }

}
