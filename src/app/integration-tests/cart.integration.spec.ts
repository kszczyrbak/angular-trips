import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { RouterTestingModule } from '@angular/router/testing';
import { CartComponent } from '../cart/cart.component';
import { AppUser, SecurityRole } from '../models/user.model';
import { OrderServiceMock } from './order-service.mock';
import { OrderService } from '../services/order.service';
import { Trip } from '../models/trip.model';
import { testUser, correctCartProducts, incorrectCartProducts } from 'src/assets/test-data';

function productsToOrders(products: Trip[]) {
    return products.map(function (prod) {
        return {
            trip_id: prod._id,
            user_id: testUser._id,
            count: prod.cartCount,
            totalPrice: prod.price * prod.cartCount,
            date: Date()
        }
    })
}

describe('IntegrationCart', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let orderService: OrderServiceMock
    let spyOrderCheckout: jasmine.Spy

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CartComponent],
            imports: [
                HttpClientModule,
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFireAuthModule,
                OverlayModule,
                RouterTestingModule
            ],
            providers: [
                {
                    provide: OrderService, useClass: OrderServiceMock,
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        orderService = TestBed.get(OrderService)
        spyOrderCheckout = spyOn(orderService, 'order').and.callThrough()
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(orderService).toBeTruthy()
    });

    it('should checkout correctly', () => {

        component.products = correctCartProducts // set cart products
        component.user = testUser

        let correctOrders = productsToOrders(correctCartProducts)

        component.checkout()

        expect(spyOrderCheckout).toHaveBeenCalled() // ensure service was called
        expect(orderService.orders).toEqual(correctOrders) // ensure order objects were created correctly
        expect(component.products).toEqual([]) // cart was cleared out
    })

    it("should fail when order data isn't correct", () => {
        component.products = incorrectCartProducts
        component.user = testUser

        let orders = productsToOrders(incorrectCartProducts)

        component.checkout()

        expect(spyOrderCheckout).toHaveBeenCalled() // ensure service was called
        expect(orderService.orders).toEqual([]) // ensure no orders were made
        expect(component.products).toEqual(incorrectCartProducts) // cart state didn't change
    })
});
