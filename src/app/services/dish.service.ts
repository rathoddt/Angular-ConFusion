import { Inject, Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes';
import {Observable, of} from 'rxjs'
import {delay, map, catchError} from 'rxjs/operators'
import {HttpClient, HttpHeaders} from '@angular/common/http'
//import { Observable } from 'rxjs';
//import { map, catchError } from 'rxjs/operators';
//import {HttpClientModule} from '@angular/common/http'
import {baseURL} from '../shared/baseurl'
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class DishService {
  //baseURL = 'http://localhost:3000/';
  constructor(private http: HttpClient,
    @Inject(baseURL) private baseURL: string,
    private processHTTPMsgService: ProcessHTTPMsgService
    ) { }

  getDishes(): Observable<Dish[]> {
    /*return new Promise( resolve=>{
      setTimeout(()=>{resolve(DISHES), 200})
    })*/
    //return  of(DISHES).pipe(delay(2000)).toPromise()
    //return  of(DISHES).pipe(delay(2000))
    return this.http.get<Dish[]>(this.baseURL+'dishes').pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getDish(id: any): Observable<Dish> {
   // return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
   /*return new Promise( resolve=>{
    setTimeout(()=>{resolve(DISHES.filter((dish) => (dish.id === id))[0]), 200})
  })*/
  //return  of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise()
  //console.log("Recived id: ",id)
  //console.log(DISHES.filter((dish) => (dish.id == id))[0])
  //console.log(DISHES.filter((dish) => (dish.id === id))[0])
  //return  of(DISHES.filter((dish) => (dish.id == id))[0]).pipe(delay(2000))  
  return this.http.get<Dish>(this.baseURL+'dishes/'+id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
}

  getFeaturedDish(): Observable<Dish> {
    //return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
    /*return new Promise( resolve=>{
      setTimeout(()=>{resolve(DISHES.filter((dish) => dish.featured)[0]), 200})
    })*/
    //return  of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise()
    //return  of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000))
    return this.http.get<Dish[]>(this.baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
          .pipe(catchError(this.processHTTPMsgService.handleError));

  }
  getDishIds():Observable<string[] | any>{
    //return of(DISHES.map(dish=>dish.id))
    console.log("DishIds called")
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
          .pipe(catchError(error => error));
  }
  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Dish>(this.baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}



  