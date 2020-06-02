## Online-Bookshelf (front-end Angular application)

This is a ecommerce application build on [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Out-Line of the Project
Application is designed for a normal user and the Admin user.  

Admin user can modify the shopping list products and can manage all the orders(`this route is in development stage currently`).  

A normal user can place order and can view his past and current orders in his order list.  

-> New user can register under sign-up route with membership details(`prime or non-prime`).  

-> Every user should have a unique ID used to login, here we are checking for the duplicates in data-base before user sign-up, this helps to avoids duplicates user login ID's in database.  

->LoggedIn user can add products to his cart and place order and can also delete the order if required.  

## Route Protection and Lazy Loading 
 
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
