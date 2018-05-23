import { Component } from '@angular/core';
import { CartService } from './cart.service';
import * as localForage from 'localforage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private cartService: CartService){
    this.getCount();
    // TODO: why using setInterval?
    setInterval(() => {
      this.getCount();
    }, 5000);
  }
  title = 'app';
  cartCount: number;

  getCount() {
    var self = this;
    // TODO: use the card service
    localForage.getItem('items').then(function (value) {
      let items: [any];
      if(value){
          items = value as [any];
      } else {
          items = [] as [any];
      }
      self.cartCount = items.length;

      var count = self.cartCount + "";
      document.getElementById("cart_btn").setAttribute("data-badge", count);

    }).catch(function (err) {
        console.log(err);
    });
  }

  openNav() {
    document.getElementById("mySidenav").classList.add("sidenavOpen");
    document.getElementById("main").classList.add("sidenavOpen");
  }

  closeNav() {
    document.getElementById("mySidenav").classList.remove("sidenavOpen");
    document.getElementById("main").classList.remove("sidenavOpen");
  } 
}
