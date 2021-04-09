import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './views/dashboard/dashboard.component'
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbComponent } from './views/shared/breadcrumb/breadcrumb.component';
import { CategoryComponent } from './views/dashboard/category/category.component';
import { SubCategoryComponent } from './views/dashboard/category/sub-category/sub-category.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BreadcrumbComponent,
    CategoryComponent,
    SubCategoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule
  ],
  exports: [MatMenuModule, MatButtonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
