import { Inject, Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
//import { PROMOTIONS } from '../shared/promotions';
import {Observable, of} from 'rxjs'
import {delay, map} from 'rxjs/operators'
import { baseURL } from '../shared/baseurl';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,@Inject(baseURL) private baseURL: string) { }
  getPromotions(): Observable<Promotion[]> {
    //return PROMOTIONS;
    //return  of(PROMOTIONS).pipe(delay(2000)).toPromise()
    return this.http.get<Promotion[]>(this.baseURL+'promotions');
    //return  of(PROMOTIONS).pipe(delay(2000))
  }

  getPromotion(id: string): Observable<Promotion> {
    //return PROMOTIONS.filter((promo) => (promo.id === id))[0];
    //return  of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000)).toPromise()
    //return  of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000))
    return this.http.get<Promotion>(this.baseURL+'promotions/'+id)
  }

  getFeaturedPromotion(): Observable<Promotion> {
    //return PROMOTIONS.filter((promotion) => promotion.featured)[0];
    //return  of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000)).toPromise()
    //return  of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000))
    return this.http.get<Promotion[]>(this.baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]));
  }
  
}
