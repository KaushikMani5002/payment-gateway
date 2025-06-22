import {Routes} from '@angular/router';
import { canActivateRoute } from './app/guards/canActivate.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
    },
    {
        path: 'landing',
        loadComponent: () => import('./app/components/landing/landing').then(c => c.Landing)
    },
    {
        path: 'home',
        loadComponent: () => import('./app/components/home/home').then(c => c.Home),
        canActivate: [canActivateRoute]
    },
    {
        path: 'transactions',
        loadComponent: () => import('./app/components/transactions/transactions').then(c => c.Transactions),
        canActivate: [canActivateRoute]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
]