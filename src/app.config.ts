import { ApplicationConfig } from "@angular/core";
import {routes} from './app.routes';
import { provideRouter } from "@angular/router";

export const config: ApplicationConfig = {
    providers: [provideRouter(routes)]
}