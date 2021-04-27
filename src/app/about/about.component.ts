import { Component, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animations';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
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
export class AboutComponent implements OnInit {
leaders:Leader[]
  constructor(private leaderService:LeaderService) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
    .subscribe((leaders)=>{this.leaders=leaders})
  }

}
