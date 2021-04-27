import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { baseURL } from '../shared/baseurl';
import { expand, flyInOut } from '../animations/app.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {

  

  
  dish: Dish;
  dishErrMess:string
  promotion: Promotion;
  leader:Leader;

  constructor(private dishservice: DishService, @Inject(baseURL) private baseURL: string,
    private promotionservice: PromotionService, private leaderService:LeaderService) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
    .subscribe((dishes)=>{this.dish=dishes},
    errmess => this.dishErrMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion()
    .subscribe((promotion)=>{this.promotion=promotion});
    this.leaderService.getFeaturedLeader()
    .subscribe((leader)=>{this.leader=leader})
  }
}
