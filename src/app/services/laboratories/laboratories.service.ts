import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ApiCall} from '@models/api-call';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LaboratoriesService {
  private dataSubject: Subject<ApiCall>;

  constructor(private httpClient: HttpClient) {
    this.dataSubject = new Subject<ApiCall>();
  }

  getData(url: string): Observable<ApiCall> {
    return this.httpClient.get<ApiCall>(url)
      .pipe(
        tap(response => this.dataSubject.next(response))
      );
  }

  getDataSubject(): Observable<ApiCall> {
    return this.dataSubject.asObservable();
  }
}
