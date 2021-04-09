import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RentalService } from 'src/app/core/services/rental.service';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

  routerData
  allData
  subcategory
  public breadcumData = [
    { name: 'Home', url: 'dashboard', active: false, location: null, branch: null }
  ];
  subscriptionList: Subscription[] = []

  constructor(private route: ActivatedRoute, private Router: Router, private server: RentalService) { }

  ngOnInit() {
    let sub1 = this.route.queryParams.subscribe((res: Params) => {
      this.routerData = res
      this.breadcumData[1] = { name: this.routerData.branch, url: 'category', active: false, location: this.routerData.location, branch: this.routerData.branch }
      this.breadcumData[2] = { name: this.routerData.category, url: 'subCategory', active: true, location: this.routerData.location, branch: this.routerData.branch }

      let sub2 = this.server.getRentalData().
        subscribe((res) => {
          this.allData = res
          this.allData.forEach(element => {
            if (element.name == this.routerData.location) {
              element.branches.forEach(item => {
                if (item.name == this.routerData.branch) {
                  item.categories.forEach(subItem => {
                    if (subItem.name == this.routerData.category) {
                      this.subcategory = subItem.subcategories
                    }
                  });
                }
              });
            }
          });
        })
      this.subscriptionList.push(sub2)
    })
    this.subscriptionList.push(sub1)
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptionList) {
      subscription.unsubscribe()
    }
  }

}
