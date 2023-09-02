import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyAnnotationsComponent } from './annotation/my-annotations.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AnnotationReducer, selectFetchedAnnotations } from './annotation.reducer';
import { AnnotationsEffects } from './annotation.effects';

@NgModule({
  declarations: [AppComponent, MyAnnotationsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ selectAnnotations: selectFetchedAnnotations }),
    StoreModule.forRoot({ reducerAnnotations: AnnotationReducer }),
    EffectsModule.forRoot([AnnotationsEffects])
  ],
  providers: [MyAnnotationsComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}