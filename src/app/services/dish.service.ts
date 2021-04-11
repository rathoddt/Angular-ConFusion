import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import {Observable, of} from 'rxjs'
import {delay} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }
  getDishes(): Observable<Dish[]> {
    /*return new Promise( resolve=>{
      setTimeout(()=>{resolve(DISHES), 200})
    })*/
    //return  of(DISHES).pipe(delay(2000)).toPromise()
    console.log(DISHES)
    return  of(DISHES).pipe(delay(2000))
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
  return  of(DISHES.filter((dish) => (dish.id == id))[0]).pipe(delay(2000))  }

  getFeaturedDish(): Observable<Dish> {
    //return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
    /*return new Promise( resolve=>{
      setTimeout(()=>{resolve(DISHES.filter((dish) => dish.featured)[0]), 200})
    })*/
    //return  of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise()
    return  of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000))
  }
  getDishIds():Observable<string[] | any>{
    return of(DISHES.map(dish=>dish.id))
  }
}



  