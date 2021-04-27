import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { Feedback } from '../shared/feedback';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    @Inject(baseURL) private baseURL: string,
    private processHTTPMsgService: ProcessHTTPMsgService
    ) { }
    submitFeedback(feedback: Feedback): Observable<Feedback> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      //console.log(feedback)
      /*setTimeout(() => {
        this.displayForm=true
      }, 5000);*/

      return this.http.post<Feedback>(this.baseURL+'feedback', feedback, httpOptions)
      .pipe(delay(2000),catchError(this.processHTTPMsgService.handleError));
    }
}
