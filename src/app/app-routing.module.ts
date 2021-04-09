import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CategoryComponent } from './views/dashboard/category/category.component';
import { SubCategoryComponent } from './views/dashboard/category/sub-category/sub-category.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard/category',
    component: CategoryComponent
  },
  {
    path: 'dashboard/category/subCategory',
    component: SubCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
