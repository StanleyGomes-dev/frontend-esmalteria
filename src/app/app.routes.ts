import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Agendamento } from './pages/agendamento/agendamento';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'agendar', component: Agendamento },
  { path: 'admin', component: Admin },
  { path: 'login', component: Login }
];