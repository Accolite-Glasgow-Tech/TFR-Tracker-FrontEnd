import { Route, Routes } from '@angular/router';

export interface RouteFull extends Route {
    name:String;
    showOnNavigationBar:Boolean;
}

