import { Component, OnInit, OnDestroy } from '@angular/core';
import { RentalService } from '../../core/services/rental.service'
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public breadcumData = [
    { name: 'Home', url: '/', active: true, location: null, branch: null }];

  location
  categoryData
  noDataFound = true
  subscriptionList: Subscription[] = []

  constructor(private server: RentalService, private Router: Router) { }

  ngOnInit() {
    let sub1 = this.server.getRentalData().
      subscribe((res) => {
        this.location = res
      })

    let sub2 = this.server.noDataFound$.subscribe(res => {
      this.noDataFound = res
    })

    this.subscriptionList.push(sub1, sub2)

  }

  clickOnItem(location, branch) {
    this.Router.navigate(['dashboard', 'category'], { queryParams: { 'location': location, 'branch': branch } });
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptionList) {
      subscription.unsubscribe()
    }
  }

}
