import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public display: string = 'flex';
  public prevWidth: number = window.innerWidth;

  constructor(private router: Router) { }
  
  ngOnInit(): void {
  }


  public toggle() {
    console.log('toggl;e');
    this.display = this.display === 'flex'?'none':'flex';
    console.log(this.display);
  }
  hide() {
    if(window.innerWidth <= 990) {
    this.display = 'none';
    }
  }

  show() {
    this.display = 'flex';
   }

   @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(window.innerWidth <= 990 && this.prevWidth > 990) {
      this.display = 'none';
    } else if (window.innerWidth > 990 && this.prevWidth <=990) {
      this.display = 'flex';
    }
  this.prevWidth = window.innerWidth;
}
 

}
