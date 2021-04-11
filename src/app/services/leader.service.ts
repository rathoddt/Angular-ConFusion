import { Injectable } from '@angular/core';
import { Leader } from "../shared/leader";
import {LEADERS} from '../shared/leaders'
import {Observable, of} from 'rxjs'
import {delay} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders(): Observable<Leader[]> {
    //return LEADERS;
    //return  of(LEADERS).pipe(delay(2000)).toPromise()
    return  of(LEADERS).pipe(delay(2000))
  }
  getLeader(id: any): Observable<Leader> {
    //return LEADERS.filter((dish) => (dish.id === id))[0];
    //return  of(LEADERS.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise()
    return  of(LEADERS.filter((dish) => (dish.id === id))[0]).pipe(delay(2000))
  }

  getFeaturedLeader(): Observable<Leader> {
    //return LEADERS.filter((dish) => dish.featured)[0];
    //return  of(LEADERS.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise()
    return  of(LEADERS.filter((dish) => dish.featured)[0]).pipe(delay(2000))
  }  
}