import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CardComponent } from './menu/card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderManagementModule } from './order-management/order-management.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CheckoutComponent,
    CartComponent,
    ConfirmationComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OrderManagementModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
