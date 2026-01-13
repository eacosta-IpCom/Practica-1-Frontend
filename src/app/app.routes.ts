import { Routes } from '@angular/router';
import { MainView } from './views/main-view/main-view';

export const routes: Routes = [
    {path:'',component:MainView,pathMatch:'full'}
];
