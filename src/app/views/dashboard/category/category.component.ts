import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RentalService } from 'src/app/core/services/rental.service';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  routerData
  allData
  category
  public breadcumData = [
    { name: 'Home', url: 'dashboard', active: false, location: null, branch: null }
  ];
  subscriptionList: Subscription[] = []

  constructor(private route: ActivatedRoute, private Router: Router, private server: RentalService) { }

  ngOnInit() {

    let sub1 = this.route.queryParams.subscribe((res: Params) => {
      this.routerData = res
      this.breadcumData[1] = { name: this.routerData.branch, url: 'category', active: true, location: this.routerData.location, branch: this.routerData.branch }
      let sub2 = this.server.getRentalData().
        subscribe((res) => {
          this.allData = res
          this.allData.forEach(element => {
            if (element.name == this.routerData.location) {
              element.branches.forEach(item => {
                if (item.name == this.routerData.branch) {
                  this.category = item.categories
                }
              });
            }
          });
        })
      this.subscriptionList.push(sub2)
    })

    this.subscriptionList.push(sub1)
  }

  ad(category) {
    this.Router.navigate(['dashboard', 'category', 'subCategory'], { queryParams: { 'location': this.routerData.location, 'branch': this.routerData.branch, 'category': category } });
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
