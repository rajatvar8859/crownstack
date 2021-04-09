import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, pluck } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  noDataFound$ = new BehaviorSubject(true)
  constructor(private http: HttpClient) { }

  public getRentalData() {
    return this.http.get('../../../assets/data/rental.json').pipe(
      pluck('locations')
    )
  }
}
