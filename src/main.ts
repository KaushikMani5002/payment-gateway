import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app.config';
import { AppComponent } from './app/app';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(AppComponent, config);
