import { LoginComponent } from "../login/login.component";

import { ComponentFixture, TestBed, async } from "@angular/core/testing";

import { AuthServiceMock } from "./auth-service.mock";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RouterTestingModule } from "@angular/router/testing";

import { AngularFireModule } from "@angular/fire";

import { environment } from "src/environments/environment";

import { AngularFireAuthModule } from "@angular/fire/auth";

import { HttpClientModule } from "@angular/common/http";

import { OverlayModule } from "@angular/cdk/overlay";

import { SpinnerOverlayService } from "../spinner/spinner-overlay.service";

import { SpinnerMock } from "./spinner.mock";

import { AuthService } from "../services/auth.service";
import { correctLoginFormData, incorrectLoginFormData } from './test-data';

describe('LoginIntegration', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: AuthServiceMock
    let spyAuthLogin: jasmine.Spy

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule,
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFireAuthModule,
                HttpClientModule,
                OverlayModule
            ],
            providers: [
                {
                    provide: SpinnerOverlayService, useClass: SpinnerMock
                },
                {
                    provide: AuthService, useClass: AuthServiceMock
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        authService = TestBed.get(AuthService)
        spyAuthLogin = spyOn(authService, 'login').and.callThrough()
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(authService).toBeTruthy()
    });

    it('should login properly', () => {
        authService.credentials.push(correctLoginFormData)

        component.loginForm.setValue(correctLoginFormData)

        component.onSubmit()

        expect(spyAuthLogin).toHaveBeenCalled()
        expect(spyAuthLogin).toBeTruthy() // logged in properly
    })

    it('should fail when login data is incorrect', () => {
        component.loginForm.setValue(incorrectLoginFormData)

        component.onSubmit()

        expect(spyAuthLogin).not.toHaveBeenCalled() // failed at form
    })

    it("should fail when data is correct but user doesn't exist", () => {
        component.loginForm.setValue(correctLoginFormData)

        component.onSubmit()

        expect(spyAuthLogin).toHaveBeenCalled() // called the service
        expect(spyAuthLogin).toThrowError() // failed the login
    });
})

