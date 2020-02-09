import { HistoryComponent } from "../history/history.component";
import { OrderService } from '../services/order.service';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { SpinnerOverlayService } from '../spinner/spinner-overlay.service';
import { SpinnerMock } from './spinner.mock';
import { TimeAgoPipe } from 'time-ago-pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { OrderServiceMock } from './order-service.mock';
import { testUser, correctOrder } from './test-data';

describe('OrderHistoryIntegration', () => {
    let component: HistoryComponent;
    let orderService: OrderServiceMock;
    let fixture: ComponentFixture<HistoryComponent>;
    let spyRefreshView: jasmine.Spy

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HistoryComponent,
                TimeAgoPipe
            ],
            imports: [
                RouterTestingModule,
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFireAuthModule,
                HttpClientModule
            ],
            providers: [
                {
                    provide: SpinnerOverlayService, useClass: SpinnerMock
                },
                {
                    provide: OrderService, useClass: OrderServiceMock
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        orderService = TestBed.get(OrderService);
        spyRefreshView = spyOn(orderService, 'getUserOrders').and.callThrough()
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(orderService).toBeTruthy();
    });

    it("should cancel the order properly", () => {
        component.currentUser = testUser

        component.orders = [correctOrder] 
        orderService.orders = [correctOrder] // put order in db and component

        component.cancel(component.orders[0])
        
        expect(spyRefreshView).toHaveBeenCalled() // ensure the view was refreshed
        expect(component.orders).toEqual([])
    })

    it("should fail when order doesn't exist", () => {
        component.currentUser = testUser

        component.orders = [correctOrder] // put order in component; doesnt exist in db

        component.cancel(correctOrder)
        
        expect(spyRefreshView).not.toHaveBeenCalled() // ensure the view wasn't refreshed
        expect(component.orders).toEqual([correctOrder]) // view hasn't changed; TODO: should delete the order instead
    })
});
