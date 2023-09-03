# MyAImage

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

Github repository has been created under the link "https://github.com/HerokuByBlockchain/Annotations".
The behaviour from the task description has been implemented, however there was a need to apply workaround mentioned in TODO comment lines 27-36, 53-55 and 71-73 in the "src > app > annotations > my-annotations.component.ts" component.

Furthermore in order to be able to draw the ellipse, annotation data need to contain 3 additional parameters, namely rotation, startAngle, endAngle. Those have been defined as constants in the "src > app > annotations > my-annotations.component.ts" and applied in line 77 to call the ellipse() function properly.

Also the annotation link "https://dummyjson.com/http/200/[{"id":"a1","radiusX":20,"radiusY":25,"x":50,"y":60" shouldn't contain the "http/200/[{" part and correct the "http/200/{" substring.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
