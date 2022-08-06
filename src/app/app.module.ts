import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// MDB Modules
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SubHeaderComponent } from './component/sub-header/sub-header.component';
import { ChildClothesSecComponent } from './component/child-clothes-sec/child-clothes-sec.component';
import { GlassesWatchesComponent } from './component/glasses-watches/glasses-watches.component';
import { FavBrandsComponent } from './component/fav-brands/fav-brands.component';
import { ProductSliderComponent } from './component/product-slider/product-slider.component';
import { FooterComponent } from './component/footer/footer.component';
import { CategoriesPageComponent } from './component/categories-page/categories-page.component';
import { ProductsPageComponent } from './component/products-page/products-page.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorMessageComponent } from './component/error-message/error-message.component';
import { ErrorPageComponent } from './component/error-page/error-page.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { TestComponent } from './component/test/test.component';
import { StaticHeaderComponent } from './component/static-header/static-header.component';
import { MainLayoutComponent } from './component/main-layout/main-layout.component';
import { UserComponent } from './component/user/user.component';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { CartComponent } from './component/cart/cart.component';



//zoom module
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { InterceptorService } from './loadder/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavbarComponent,
    SubHeaderComponent,
    ChildClothesSecComponent,
    GlassesWatchesComponent,
    FavBrandsComponent,
    ProductSliderComponent,
    FooterComponent,
    CategoriesPageComponent,
    ProductsPageComponent,
    ErrorMessageComponent,
    ErrorPageComponent,
    ProductDetailsComponent,
    TestComponent,
    StaticHeaderComponent,
    MainLayoutComponent,
    UserComponent,
    UserProfileComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxImageZoomModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorService , multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
