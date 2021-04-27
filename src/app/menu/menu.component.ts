import { Component, Inject, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import {baseURL} from '../shared/baseurl'
import { expand, flyInOut } from '../animations/app.animations';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class MenuComponent implements OnInit {
  dishes:Dish[]
  errMess: string;
  //selectedDish : Dish;
  constructor(private dishService: DishService,
    @Inject(baseURL) private baseURL: string
    ) { }
  ngOnInit(): void {
    this.dishService.getDishes()
    .subscribe((dishes)=>{
      this.dishes=dishes,
      errmess => this.errMess = <any>errmess
    })
  }
  /*onSelect(dish:Dish){
    this.selectedDish=dish
  }*/

}
