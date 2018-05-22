import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  /* Set the width of the side navigation to 250px */
  openNav() {
    document.getElementById("mySidenav").classList.add("sidenavOpen");
    document.getElementById("main").classList.add("sidenavOpen");
  }

  /* Set the width of the side navigation to 0 */
  closeNav() {
    document.getElementById("mySidenav").classList.remove("sidenavOpen");
    document.getElementById("main").classList.remove("sidenavOpen");
  } 
}
