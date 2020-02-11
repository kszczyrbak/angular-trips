import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { TripsComponent } from './trips/trips.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { AuthGuard } from './services/auth-guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './services/admin-guard';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HistoryComponent } from './history/history.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminTripsComponent } from './admin/admin-trips/admin-trips.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'app', component: HomeComponent, canActivate: [AuthGuard], children: [
            { path: '', redirectTo: '/app/trips', pathMatch: 'full' },
            { path: 'trips', component: TripsComponent },
            { path: 'cart', component: CartComponent },
            { path: 'history', component: HistoryComponent },
            { path: 'trip/:id', component: TripDetailsComponent },
            { path: 'user/:id', component: UserDetailsComponent },
            {
                path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
                    { path: '', redirectTo: '/app/admin/trips', pathMatch: 'full' },
                    { path: 'trips', component: AdminTripsComponent },
                    { path: 'users', component: AdminUsersComponent },
                    { path: 'orders', component: AdminOrdersComponent },
                ]
            }
        ]
    },


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }