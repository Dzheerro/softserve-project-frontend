import { Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: MainComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
];
