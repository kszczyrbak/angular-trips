import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { RegisterComponent } from '../register/register.component';
import { AuthServiceMock } from './auth-service.mock';
import { UserServiceMock } from './user-service.mock';
import { SpinnerOverlayService } from '../spinner/spinner-overlay.service';
import { SpinnerMock } from './spinner.mock';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { correctRegisterFormData, incorrectRegisterFormData, testUser } from './test-data';
import { SecurityRole } from '../models/user.model';
import { environment } from 'src/environments/environment.test';

describe('RegisterIntegration', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let authService: AuthServiceMock
    let userService: UserServiceMock
    let spyAddUser: jasmine.Spy
    let spyAuthRegister: jasmine.Spy

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterComponent],
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
                {
                    provide: UserService, useClass: UserServiceMock
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        userService = TestBed.get(UserService)
        authService = TestBed.get(AuthService)
        spyAddUser = spyOn(userService, 'addUser').and.callThrough()
        spyAuthRegister = spyOn(authService, 'register').and.callThrough()
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(userService).toBeTruthy()
        expect(authService).toBeTruthy()
    });

    it('should register properly', () => {
        userService.users = []

        component.registerForm.setValue(correctRegisterFormData)

        component.onSubmit()

        expect(spyAuthRegister).toHaveBeenCalled()
        expect(spyAddUser).toHaveBeenCalled()

        let { password, confirmPassword, ...userData } = correctRegisterFormData

        let userDataFromForm = {
            ...userData,
            role: SecurityRole.USER
        }

        let { _id, ...addedUserData } = userService.users[0]

        expect(addedUserData).toEqual(userDataFromForm)
    })

    it("should fail when register data isn't correct", () => {
        userService.users = []

        component.registerForm.setValue(incorrectRegisterFormData)

        component.onSubmit()

        expect(spyAuthRegister).not.toHaveBeenCalled() // should fail at form level
        expect(spyAuthRegister).toThrowError()
        expect(spyAddUser).not.toHaveBeenCalled()

        expect(userService.users).toEqual([])
    })

    it("should fail when user is already registered", () => {
        userService.users = []

        let { confirmPassword, name, ...registerCredentials } = correctRegisterFormData

        authService.credentials = [registerCredentials]

        component.registerForm.setValue(correctRegisterFormData)

        component.onSubmit()

        expect(spyAuthRegister).toHaveBeenCalled() // called the service
        expect(spyAuthRegister).toThrowError()
        expect(spyAddUser).not.toHaveBeenCalled()

        expect(userService.users).toEqual([])
    })
});
