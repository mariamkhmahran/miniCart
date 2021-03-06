import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MarketComponent } from './market/market.component';
import { CartComponent } from './cart/cart.component';

const routes = [
  {
    path: '',
    redirectTo: '/market',
    pathMatch: 'full'
  },
  {
    path: 'market',
    component: MarketComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
