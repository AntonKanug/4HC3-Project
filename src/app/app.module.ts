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
import { CartItemLargeComponent } from './cart-item-large/cart-item-large.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CheckoutComponent,
    CartComponent,
    ConfirmationComponent,
    CardComponent,
    CartItemLargeComponent,
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
