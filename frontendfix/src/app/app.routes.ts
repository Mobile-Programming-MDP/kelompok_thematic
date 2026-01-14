
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Dashboard } from './dashboard/dashboard';
import { Products } from './products/products';
import { Categories } from './categories/categories';
import { Stocks } from './stocks/stocks';
import { StockOut } from './stock-out/stock-out';
import { Suppliers } from './suppliers/suppliers';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'dashboard', component: Dashboard },
	{ path: 'products', component: Products },
	{ path: 'categories', component: Categories },
	{ path: 'stocks', component: Stocks },
	{ path: 'stock-out', component: StockOut },
	{ path: 'suppliers', component: Suppliers },
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
];
