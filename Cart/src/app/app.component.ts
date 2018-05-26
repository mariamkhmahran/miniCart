import { Component } from '@angular/core';
import { CartService } from './cart.service';
import * as localForage from 'localforage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  cartCount: number;

  constructor(private cartService: CartService){
    this.cartService.newCount.subscribe((value: number) => {
      this.cartCount = value;
      var count = this.cartCount + "";
      document.getElementById("cart_btn").setAttribute("data-badge", count);
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
