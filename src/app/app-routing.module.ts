import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { TripsComponent } from './trips/trips.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { AuthGuard } from './services/auth-guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'app', component: HomeComponent, canActivate: [AuthGuard], children: [
            { path: '', component: TripsComponent, },
            { path: 'cart', component: CartComponent },
            { path: 'trip/:id', component: TripDetailsComponent },
        ]
    }


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }