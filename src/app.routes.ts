import {Routes} from '@angular/router';

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
        loadComponent: () => import('./app/components/home/home').then(c => c.Home)
    },
    {
        path: 'transactions',
        loadComponent: () => import('./app/components/transactions/transactions').then(c => c.Transactions)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
]