import { Inject, Injectable } from '@angular/core';
import { Leader } from "../shared/leader";
//import {LEADERS} from '../shared/leaders'
import {Observable, of} from 'rxjs'
import {delay, map} from 'rxjs/operators'
import {HttpClient} from '@angular/common/http'
import {baseURL} from '../shared/baseurl'
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    @Inject(baseURL) private baseURL: string
    ) { }

  getLeaders(): Observable<Leader[]> {
    //return LEADERS;
    //return  of(LEADERS).pipe(delay(2000)).toPromise()
    //return  of(LEADERS).pipe(delay(2000))
    return this.http.get<Leader[]>(this.baseURL+'leaders');
  }
  getLeader(id: any): Observable<Leader> {
    //return LEADERS.filter((dish) => (dish.id === id))[0];
    //return  of(LEADERS.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise()
    //return  of(LEADERS.filter((dish) => (dish.id === id))[0]).pipe(delay(2000))
    return this.http.get<Leader>(this.baseURL+'leaders/'+id)
  }

  getFeaturedLeader(): Observable<Leader> {
    //return LEADERS.filter((dish) => dish.featured)[0];
    //return  of(LEADERS.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise()
    //return  of(LEADERS.filter((dish) => dish.featured)[0]).pipe(delay(2000))
    return this.http.get<Leader[]>(this.baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0]));
  }  
}